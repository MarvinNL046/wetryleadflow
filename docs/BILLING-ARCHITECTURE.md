# LeadFlow Billing Architecture

## Revenue Streams Overview

```
LeadFlow Revenue
├── Direct Users (ZZP/MKB) → betalen LeadFlow direct
│   ├── Free: €0/maand
│   ├── Pro: €29/maand (of €278/jaar)
│   └── Enterprise: €99/maand (of €950/jaar)
│
└── Agencies → betalen LeadFlow voor platform
    ├── Starter: €97/maand (3 sub-accounts)
    ├── Unlimited: €297/maand (onbeperkt sub-accounts)
    └── SaaS Pro: €497/maand (+ Stripe Connect voor eigen billing)
        └── Agency Clients → betalen de AGENCY (niet LeadFlow!)
```

## User Types & Billing Flow

### 1. Direct Users (Geen Agency)
- **Wie**: ZZP'ers, MKB bedrijven die LeadFlow direct gebruiken
- **Hoe**: Stripe Checkout → LeadFlow Stripe account
- **Waar**: `/crm/settings/billing`
- **Webhook**: `customer.subscription.*` events updaten `orgs.subscriptionTier`

### 2. Agencies
- **Wie**: Marketing bureaus, resellers
- **Hoe**: Stripe Checkout → LeadFlow Stripe account
- **Waar**: `/agency/billing`
- **Webhook**: `customer.subscription.*` events updaten `agencies.tier`

### 3. Agency Clients
- **Wie**: Klanten van agencies (whitelabel)
- **Hoe**: Stripe Checkout → Agency's Stripe Connect account
- **Waar**: Via agency's branded portal
- **Webhook**: Connect events → `clientSubscriptions` tabel
- **BELANGRIJK**: LeadFlow ontvangt GEEN geld van agency clients!

## Database Schema

```sql
-- Direct users & agency clients
orgs (
  subscription_tier: 'free' | 'pro' | 'enterprise',
  subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled',
  stripe_customer_id: varchar,      -- Op LeadFlow's Stripe (direct users only)
  stripe_subscription_id: varchar,  -- Op LeadFlow's Stripe (direct users only)
  agency_id: integer                -- NULL = direct user, SET = agency client
)

-- Agencies
agencies (
  tier: 'starter' | 'unlimited' | 'saas_pro',
  stripe_subscription_id: varchar,
  stripe_price_id: varchar,
  saas_mode: boolean                -- true = kan Stripe Connect gebruiken
)

-- Agency client subscriptions (op agency's Stripe Connect)
client_subscriptions (
  org_id: integer,
  agency_id: integer,
  plan_id: integer,
  stripe_subscription_id: varchar,  -- Op agency's Connect account
  stripe_customer_id: varchar,      -- Op agency's Connect account
  status: 'trialing' | 'active' | 'past_due' | 'canceled'
)
```

## API Routes

| Route | Doel | Wie |
|-------|------|-----|
| `POST /api/stripe/checkout` | Upgrade subscription | Direct users |
| `POST /api/stripe/portal` | Manage billing | Direct users |
| `GET /api/stripe/portal` | Get subscription info | Direct users |
| `POST /api/stripe/webhooks` | Handle Stripe events | System |

## Environment Variables

```env
# Agency pricing (agencies betalen LeadFlow)
STRIPE_PRICE_STARTER=price_xxx
STRIPE_PRICE_UNLIMITED=price_xxx
STRIPE_PRICE_SAAS_PRO=price_xxx

# Direct user pricing (direct users betalen LeadFlow)
STRIPE_PRICE_USER_PRO_MONTHLY=price_xxx
STRIPE_PRICE_USER_PRO_YEARLY=price_xxx
STRIPE_PRICE_USER_ENTERPRISE_MONTHLY=price_xxx
STRIPE_PRICE_USER_ENTERPRISE_YEARLY=price_xxx

# Webhooks
STRIPE_WEBHOOK_SECRET=whsec_xxx           # Platform events
STRIPE_CONNECT_WEBHOOK_SECRET=whsec_xxx   # Connect events (agency clients)
```

## Webhook Event Handling

### Platform Events (LeadFlow's Stripe)
- `checkout.session.completed` → Direct user subscription created
- `customer.subscription.updated` → Tier change
- `customer.subscription.deleted` → Downgrade to free

### Connect Events (Agency's Stripe)
- `checkout.session.completed` → Client subscription created
- `customer.subscription.updated` → Client plan change
- `invoice.payment_succeeded` → Record payment
- `invoice.payment_failed` → Mark as past_due

## Security Considerations

1. **Agency clients kunnen NIET direct billing page zien**
   - Check: `if (org.agencyId)` → redirect/hide

2. **Webhook signature verification**
   - Platform: `STRIPE_WEBHOOK_SECRET`
   - Connect: `STRIPE_CONNECT_WEBHOOK_SECRET`

3. **Idempotency**
   - Events worden opgeslagen in `webhook_events` tabel
   - Duplicate events worden geskipt

## Feature Access by Tier

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Contacten | 100 | ∞ | ∞ |
| Pipelines | 1 | ∞ | ∞ |
| AI Insights | ❌ | ✅ | ✅ |
| Meta Lead Ads | ❌ | ✅ | ✅ |
| Auto follow-ups | ❌ | ✅ | ✅ |
| Custom integraties | ❌ | ❌ | ✅ |
| Multi-workspace | ❌ | ❌ | ✅ |
| Dedicated support | ❌ | ❌ | ✅ |

## Files Reference

```
src/
├── app/
│   ├── api/stripe/
│   │   ├── checkout/route.ts      # Create checkout session
│   │   ├── portal/route.ts        # Customer portal
│   │   └── webhooks/route.ts      # Webhook handler
│   └── crm/settings/
│       └── billing/page.tsx       # Billing UI
├── lib/
│   └── stripe/
│       ├── client.ts              # Stripe client + pricing config
│       └── subscriptions.ts       # Subscription helpers
```
