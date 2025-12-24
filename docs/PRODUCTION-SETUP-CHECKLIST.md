# 📋 LeadFlow Production Setup Checklist

Volledige checklist voor het deployen van LeadFlow naar productie.

---

## 1. 🔐 Neon Database

- [ ] Maak een Neon project aan op [console.neon.tech](https://console.neon.tech)
- [ ] Kies regio: `eu-central-1` (Frankfurt) voor NL/BE
- [ ] Kopieer de `DATABASE_URL` connection string
- [ ] Run database migratie:
  ```bash
  npx drizzle-kit push
  ```
- [ ] Verifieer dat alle tabellen zijn aangemaakt
- [ ] Optioneel: Stel connection pooling in voor betere performance

**Environment variables:**
```env
DATABASE_URL="postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/leadflow?sslmode=require"
```

---

## 2. 🔑 Stack Auth

- [ ] Maak project aan op [app.stack-auth.com](https://app.stack-auth.com)
- [ ] Kopieer de credentials:
  - `NEXT_PUBLIC_STACK_PROJECT_ID`
  - `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY`
  - `STACK_SECRET_SERVER_KEY`
- [ ] Configureer OAuth providers:
  - [ ] Google OAuth
  - [ ] (Optioneel) GitHub, Microsoft, etc.
- [ ] Stel allowed redirect URLs in:
  - `https://wetryleadflow.com/*`
  - `https://*.wetryleadflow.com/*`
- [ ] Configureer email templates:
  - [ ] Welcome email
  - [ ] Password reset
  - [ ] Email verification

**Environment variables:**
```env
NEXT_PUBLIC_STACK_PROJECT_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STACK_SECRET_SERVER_KEY="ssk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 3. 📧 Resend Email

- [ ] Maak account aan op [resend.com](https://resend.com)
- [ ] Verifieer je domein (`wetryleadflow.com`)
- [ ] Voeg DNS records toe:

| Type | Name | Value |
|------|------|-------|
| TXT | @ | `v=spf1 include:_spf.resend.com ~all` |
| CNAME | resend._domainkey | `resend._domainkey.resend.com` |
| TXT | _dmarc | `v=DMARC1; p=none;` |

- [ ] Wacht tot domein verified is (kan 24-48 uur duren)
- [ ] Maak API key aan → `RESEND_API_KEY`
- [ ] Maak Audience aan voor marketing emails → `RESEND_AUDIENCE_ID`

**Environment variables:**
```env
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_AUDIENCE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
EMAIL_FROM="LeadFlow <noreply@wetryleadflow.com>"
FEEDBACK_EMAIL="hello@wetryleadflow.com"
```

---

## 4. 📱 Meta (Facebook) Lead Ads

### 4.1 Facebook App aanmaken
- [ ] Ga naar [developers.facebook.com](https://developers.facebook.com)
- [ ] Create App → Business → "Other"
- [ ] Voeg "Webhooks" product toe
- [ ] Voeg "Facebook Login for Business" toe

### 4.2 App configureren
- [ ] Kopieer App ID → `META_APP_ID`
- [ ] Kopieer App Secret → `META_APP_SECRET`
- [ ] Genereer verify token:
  ```bash
  openssl rand -hex 16
  ```
  → `META_WEBHOOK_VERIFY_TOKEN`

### 4.3 Webhook instellen
- [ ] Ga naar Webhooks → Page
- [ ] Subscribe to: `leadgen`
- [ ] Callback URL: `https://wetryleadflow.com/api/meta/webhook`
- [ ] Verify Token: je `META_WEBHOOK_VERIFY_TOKEN`

### 4.4 Permissies aanvragen
- [ ] `pages_read_engagement`
- [ ] `pages_manage_metadata`
- [ ] `leads_retrieval`
- [ ] `pages_show_list`

### 4.5 App Review (voor productie)
- [ ] Submit app voor review met use case beschrijving
- [ ] Wacht op goedkeuring (1-5 dagen)

**Environment variables:**
```env
META_APP_ID="1234567890123456"
META_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
META_WEBHOOK_VERIFY_TOKEN="your-random-webhook-verify-token"
```

---

## 5. 💳 Stripe Setup

### 5.1 Platform Account (jouw account)

- [ ] Maak Stripe account aan op [dashboard.stripe.com](https://dashboard.stripe.com)
- [ ] Activeer live mode
- [ ] Kopieer API keys:
  - `STRIPE_SECRET_KEY` (sk_live_...)
  - `STRIPE_PUBLISHABLE_KEY` (pk_live_...)

### 5.2 Webhook voor betalingen

- [ ] Ga naar Developers → Webhooks → Add endpoint
- [ ] Endpoint URL: `https://wetryleadflow.com/api/stripe/webhooks`
- [ ] Events selecteren:
  - `checkout.session.completed`
  - `invoice.payment_succeeded`
  - `invoice.payment_failed`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- [ ] Kopieer signing secret → `STRIPE_WEBHOOK_SECRET`

### 5.3 Stripe Connect (voor agencies/klanten)

- [ ] Ga naar Connect → Get started
- [ ] Kies account type: **Standard** (aanbevolen) of **Express**
- [ ] Configureer branding en onboarding flow
- [ ] Maak Connect Webhook:
  - URL: `https://wetryleadflow.com/api/stripe/connect-webhooks`
  - Events:
    - `account.updated`
    - `account.application.authorized`
    - `payment_intent.succeeded`
    - `payment_intent.payment_failed`
  - Kopieer signing secret → `STRIPE_CONNECT_WEBHOOK_SECRET`

### 5.4 Producten en Prijzen aanmaken

Ga naar Products → Add product:

| Product | Prijs | Interval | ENV Variable |
|---------|-------|----------|--------------|
| Starter | €29/maand | Monthly | `STRIPE_PRICE_STARTER` |
| Unlimited | €79/maand | Monthly | `STRIPE_PRICE_UNLIMITED` |
| SaaS Pro | €149/maand | Monthly | `STRIPE_PRICE_SAAS_PRO` |

- [ ] Kopieer elke price ID (price_xxx...)

**Environment variables:**
```env
STRIPE_SECRET_KEY="sk_live_YOUR_STRIPE_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_CONNECT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_STARTER="price_xxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_UNLIMITED="price_xxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_SAAS_PRO="price_xxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 6. ⚡ Upstash QStash

- [ ] Maak account aan op [console.upstash.com](https://console.upstash.com)
- [ ] Ga naar QStash
- [ ] Kopieer credentials van het dashboard

**Environment variables:**
```env
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
QSTASH_CURRENT_SIGNING_KEY="sig_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
QSTASH_NEXT_SIGNING_KEY="sig_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 7. 🚀 Vercel Deployment

### 7.1 Project Setup

- [ ] Connect GitHub repo aan Vercel
- [ ] Kies Framework: Next.js
- [ ] Kies Root Directory: `/` (of waar package.json staat)

### 7.2 Environment Variables

Voeg ALLE environment variables toe in Vercel Dashboard → Settings → Environment Variables.

**Secrets genereren:**
```bash
# ENCRYPTION_KEY (32 bytes hex)
openssl rand -hex 32

# JOBS_SECRET_KEY
openssl rand -hex 32

# CRON_SECRET
openssl rand -hex 32
```

### 7.3 Cron Jobs Verificatie

De cron jobs zijn geconfigureerd in `vercel.json`:

| Cron Job | Schedule | Functie |
|----------|----------|---------|
| `/api/cron/process-meta-leads` | `*/5 * * * *` | Meta leads verwerken (elke 5 min) |
| `/api/cron/generate-recurring-invoices` | `0 6 * * *` | Recurring facturen (06:00 daily) |
| `/api/cron/send-invoice-reminders` | `0 9 * * *` | Betalingsherinneringen (09:00 daily) |
| `/api/cron/generate-follow-up-reminders` | `0 * * * *` | Follow-up notificaties (elk uur) |

⚠️ **Let op:** Vercel Cron Jobs zijn alleen beschikbaar op Pro plan!

### 7.4 Domain Setup

- [ ] Voeg custom domain toe: `wetryleadflow.com`
- [ ] Voeg wildcard subdomain toe: `*.wetryleadflow.com` (voor agencies)
- [ ] Configureer DNS records bij je registrar
- [ ] Wacht tot SSL certificaat actief is

### 7.5 Build Settings

- [ ] Build Command: `npm run build`
- [ ] Output Directory: `.next`
- [ ] Install Command: `npm install`
- [ ] Node.js Version: 20.x

**App environment variables:**
```env
NEXT_PUBLIC_APP_URL="https://wetryleadflow.com"
NEXT_PUBLIC_ROOT_DOMAIN="wetryleadflow.com"
JOBS_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CRON_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
ENCRYPTION_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 8. 🔒 Security Checklist

- [ ] Alle API keys staan ALLEEN in Vercel env vars (niet in code!)
- [ ] `.env.local` staat in `.gitignore`
- [ ] HTTPS is actief op alle endpoints
- [ ] CORS is correct geconfigureerd
- [ ] Rate limiting is actief (via middleware)
- [ ] Webhook signatures worden geverifieerd (Stripe, Meta)
- [ ] Database connections gebruiken SSL (`sslmode=require`)
- [ ] Sensitive data is encrypted (tokens, API keys)

---

## 9. 🧪 Post-Deployment Testing

### Authentication
- [ ] Registratie met email werkt
- [ ] Login werkt
- [ ] OAuth login werkt (Google)
- [ ] Password reset email wordt ontvangen
- [ ] Logout werkt

### Core Features
- [ ] Contact aanmaken werkt
- [ ] Pipeline aanmaken werkt
- [ ] Opportunity aanmaken werkt
- [ ] Opportunity verplaatsen werkt

### Integraties
- [ ] Meta Lead Ads webhook ontvangt test events
- [ ] Nieuwe Meta lead wordt correct verwerkt
- [ ] Email verzending werkt (verstuur test factuur)

### Betalingen
- [ ] Stripe Checkout werkt
- [ ] Subscription wordt correct aangemaakt
- [ ] Webhook events worden verwerkt
- [ ] Stripe Connect onboarding werkt

### Cron Jobs
- [ ] Check Vercel Functions logs
- [ ] `/api/cron/process-meta-leads` draait
- [ ] `/api/cron/generate-follow-up-reminders` draait

### Multi-tenant
- [ ] Agency subdomain werkt
- [ ] Workspace isolatie werkt
- [ ] Juiste data per tenant

---

## 📝 Complete Environment Variables Reference

```env
# ============================================
# DATABASE
# ============================================
DATABASE_URL="postgresql://user:password@ep-xxx.eu-central-1.aws.neon.tech/leadflow?sslmode=require"

# ============================================
# AUTHENTICATION (Stack Auth)
# ============================================
NEXT_PUBLIC_STACK_PROJECT_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY="pck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STACK_SECRET_SERVER_KEY="ssk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# ============================================
# QSTASH (Upstash)
# ============================================
QSTASH_URL="https://qstash.upstash.io"
QSTASH_TOKEN="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
QSTASH_CURRENT_SIGNING_KEY="sig_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
QSTASH_NEXT_SIGNING_KEY="sig_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# ============================================
# EMAIL (Resend)
# ============================================
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
RESEND_AUDIENCE_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
EMAIL_FROM="LeadFlow <noreply@wetryleadflow.com>"
FEEDBACK_EMAIL="hello@wetryleadflow.com"

# ============================================
# APP CONFIG
# ============================================
NEXT_PUBLIC_APP_URL="https://wetryleadflow.com"
NEXT_PUBLIC_ROOT_DOMAIN="wetryleadflow.com"
JOBS_SECRET_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
CRON_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
ENCRYPTION_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# ============================================
# META (Facebook) INTEGRATION
# ============================================
META_APP_ID="1234567890123456"
META_APP_SECRET="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
META_WEBHOOK_VERIFY_TOKEN="your-random-webhook-verify-token"

# ============================================
# STRIPE
# ============================================
STRIPE_SECRET_KEY="sk_live_YOUR_STRIPE_SECRET_KEY_HERE"
STRIPE_PUBLISHABLE_KEY="pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_CONNECT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Pricing
STRIPE_PRICE_STARTER="price_xxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_UNLIMITED="price_xxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_PRICE_SAAS_PRO="price_xxxxxxxxxxxxxxxxxxxxxxxx"
```

---

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx drizzle-kit studio
```

### Webhook niet ontvangen
1. Check Vercel Functions logs
2. Verifieer webhook URL is correct
3. Check signing secret is correct
4. Test met Stripe/Meta webhook tester

### Emails worden niet verzonden
1. Check Resend dashboard voor errors
2. Verifieer domein is verified
3. Check DNS records zijn correct
4. Test met Resend test mode

### Cron jobs draaien niet
1. Check je Vercel plan (Pro required)
2. Verifieer `vercel.json` syntax
3. Check CRON_SECRET is ingesteld
4. Bekijk Vercel Functions logs

---

*Laatste update: December 2024*
