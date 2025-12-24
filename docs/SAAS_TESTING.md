# SaaS Mode Testing Guide

Complete handleiding voor het testen van de LeadFlow SaaS functionaliteit.

## Voorbereidingen

### 1. Stripe Test Account Setup

1. Ga naar [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Zorg dat je in **Test Mode** bent (toggle rechtsboven)
3. Kopieer je API keys

### 2. Maak LeadFlow Pricing Products aan

In Stripe Dashboard → Products, maak 3 producten:

| Product | Prijs | Interval | Notities |
|---------|-------|----------|----------|
| LeadFlow Starter | €97 | Maandelijks | 3 sub-accounts |
| LeadFlow Unlimited | €297 | Maandelijks | Unlimited sub-accounts |
| LeadFlow SaaS Pro | €497 | Maandelijks | Full SaaS features |

Kopieer de Price IDs (beginnen met `price_`).

### 3. Environment Variables

Update `.env.local`:

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# LeadFlow Tier Prices (van stap 2)
STRIPE_PRICE_STARTER=price_xxxxx
STRIPE_PRICE_UNLIMITED=price_xxxxx
STRIPE_PRICE_SAAS_PRO=price_xxxxx

# Webhook Secrets (krijg je van Stripe CLI)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_CONNECT_WEBHOOK_SECRET=whsec_xxxxx
```

### 4. Stripe CLI Installatie

```bash
# Linux (Debian/Ubuntu)
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update && sudo apt install stripe

# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe
```

### 5. Stripe CLI Login & Webhook Forwarding

```bash
# Login bij Stripe
stripe login

# Start webhook forwarding (laat dit terminal open staan)
stripe listen --forward-to localhost:3000/api/stripe/webhooks

# Dit toont een signing secret - kopieer naar STRIPE_WEBHOOK_SECRET
```

---

## Test Scenarios

### Scenario 1: Agency Signup Flow

**Doel**: Nieuwe agency kan zich aanmelden

1. Ga naar `http://localhost:3000/agency-signup`
2. Klik "Start Trial" bij een tier
3. Vul gegevens in via Stack Auth
4. Verifieer:
   - [ ] Agency record aangemaakt in database
   - [ ] Correct tier toegewezen
   - [ ] Redirect naar `/agency` dashboard

### Scenario 2: Stripe Connect Onboarding

**Doel**: Agency koppelt eigen Stripe account

**Vereisten**: Agency met SaaS Pro tier

1. Ga naar `/agency/billing/connect`
2. Klik "Connect Stripe Account"
3. Doorloop Stripe Express onboarding
   - Gebruik test data:
   - Business: Individual
   - Phone: +31 612345678
   - Address: Willekeurig NL adres
   - Bank: NL91 ABNA 0417 1643 00 (test IBAN)
4. Return naar LeadFlow
5. Verifieer:
   - [ ] `agencyStripeAccounts` record aangemaakt
   - [ ] `chargesEnabled: true`
   - [ ] `payoutsEnabled: true`
   - [ ] Badge toont "Connected"

### Scenario 3: Pricing Plans Aanmaken

**Doel**: Agency maakt eigen pricing plans

**Vereisten**: Stripe Connect gekoppeld

1. Ga naar `/agency/saas/plans/new`
2. Maak een plan:
   - Naam: "Pro Plan"
   - Prijs maandelijks: €149
   - Prijs jaarlijks: €1490 (optioneel)
   - Features: "Unlimited contacts", "Priority support"
   - Max contacts: 10000
3. Klik "Save Plan"
4. Verifieer:
   - [ ] Plan verschijnt in lijst
   - [ ] Stripe Product aangemaakt (check dashboard)
   - [ ] Stripe Price aangemaakt

### Scenario 4: SaaS Settings Configureren

**Doel**: Agency configureert self-signup

1. Ga naar `/agency/saas/settings`
2. Enable "Self-Signup"
3. Set trial days: 14
4. Vul titel en beschrijving in
5. Save
6. Verifieer:
   - [ ] Settings opgeslagen
   - [ ] Signup URL getoond

### Scenario 5: Client Self-Signup

**Doel**: Client meldt zich aan bij agency

**Vereisten**: Scenario 3 & 4 voltooid

1. Open incognito browser
2. Ga naar `http://localhost:3000/{agencySlug}/signup`
3. Selecteer plan
4. Vul bedrijfsgegevens in
5. Complete betaling met test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Elke toekomstige datum
   - CVC: Willekeurig (bijv. 123)
6. Verifieer:
   - [ ] Client account aangemaakt
   - [ ] Organization aangemaakt onder agency
   - [ ] Subscription actief
   - [ ] Webhook events ontvangen (check Stripe CLI output)

### Scenario 6: Webhook Events Testen

**Doel**: Verify webhook handling werkt

```bash
# Trigger test events via Stripe CLI
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_succeeded
stripe trigger invoice.payment_failed
```

Check voor elk event:
- [ ] 200 response in Stripe CLI output
- [ ] Event gelogd in `webhookEvents` tabel
- [ ] Status: "processed"

### Scenario 7: Subscription Lifecycle

**Doel**: Test volledige subscription lifecycle

1. **Create**: Client signup (Scenario 5)
2. **Update**: Change plan in Stripe Dashboard
   - Verifieer: Status update in `/agency/saas/clients`
3. **Cancel**: Cancel in Stripe Dashboard
   - Verifieer: Status → "canceled"
4. **Failed Payment**: Use declining card `4000 0000 0000 0002`
   - Verifieer: Status → "past_due"

---

## Database Verificatie

### Check Agency Stripe Account

```sql
SELECT * FROM agency_stripe_accounts WHERE agency_id = [ID];
```

### Check Client Subscriptions

```sql
SELECT
  cs.*,
  o.name as org_name,
  app.name as plan_name
FROM client_subscriptions cs
JOIN orgs o ON cs.org_id = o.id
JOIN agency_pricing_plans app ON cs.plan_id = app.id
WHERE cs.agency_id = [ID];
```

### Check Webhook Events

```sql
SELECT * FROM webhook_events
ORDER BY created_at DESC
LIMIT 20;
```

---

## Troubleshooting

### Webhook niet ontvangen

1. Check Stripe CLI draait: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`
2. Verify webhook secret in `.env.local`
3. Check server logs voor signature errors

### Connect onboarding faalt

1. Verify SaaS Pro tier actief
2. Check `STRIPE_SECRET_KEY` correct is
3. Probeer incognito browser (cache issues)

### Plans niet zichtbaar in Stripe

1. Check connected account ID klopt
2. Verify `stripeAccountId` in database
3. Check Stripe Dashboard onder juiste account

### Client signup redirect error

1. Verify agency has active Stripe Connect
2. Check plan has valid `stripePriceIdMonthly`
3. Check success/cancel URLs correct geconfigureerd

---

## Test Data Reset

```sql
-- Reset test subscriptions
DELETE FROM client_subscriptions WHERE agency_id = [TEST_AGENCY_ID];

-- Reset webhook logs
DELETE FROM webhook_events WHERE created_at > NOW() - INTERVAL '1 day';

-- Reset test plans (be careful!)
DELETE FROM agency_pricing_plans WHERE agency_id = [TEST_AGENCY_ID];
```

---

## Checklist Summary

### Minimale Test Coverage

- [ ] Agency signup werkt
- [ ] Stripe Connect onboarding werkt
- [ ] Pricing plan creation werkt
- [ ] Client self-signup werkt
- [ ] Webhooks worden ontvangen en verwerkt
- [ ] Dashboard stats tonen correcte data

### Extended Testing

- [ ] Plan updates sync naar Stripe
- [ ] Subscription status changes verwerkt
- [ ] Failed payments handled
- [ ] Cancellations handled
- [ ] MRR berekening correct
- [ ] Invoice logging werkt
