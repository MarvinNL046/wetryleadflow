# Automatische Subdomain Setup

Dit document beschrijft hoe agency subdomeinen automatisch werken in LeadFlow.

## Hoe het werkt

Wanneer een agency zich aanmeldt met slug `marketing-xyz`:
- **Subdomain**: `marketing-xyz.wetryleadflow.com` → werkt automatisch
- **Path-based**: `wetryleadflow.com/marketing-xyz` → werkt ook

Beide URLs leiden naar dezelfde content. De middleware detecteert automatisch of het een subdomain of path is.

## Eenmalige Hosting Setup (Vercel)

### 1. Wildcard Domain Toevoegen

In Vercel Dashboard:

1. Ga naar je project → Settings → Domains
2. Voeg toe: `*.wetryleadflow.com`
3. Vercel vraagt om een DNS record

### 2. DNS Configuratie

Bij je DNS provider (Cloudflare, etc.), voeg toe:

```
Type: CNAME
Name: *
Target: cname.vercel-dns.com
```

Of als je Vercel DNS gebruikt, wordt dit automatisch geconfigureerd.

### 3. SSL Certificaat

Vercel regelt automatisch wildcard SSL certificaten voor `*.wetryleadflow.com`.

### 4. Environment Variable

In Vercel → Settings → Environment Variables:

```
NEXT_PUBLIC_ROOT_DOMAIN=wetryleadflow.com
```

## Wat er automatisch gebeurt

1. **Agency maakt account**: Kiest slug `marketing-xyz`
2. **Middleware detecteert subdomain**: `marketing-xyz.wetryleadflow.com`
3. **Rewrite naar interne route**: `/marketing-xyz/...`
4. **Whitelabel branding geladen**: Agency logo, kleuren, etc.

Geen handmatige actie nodig per agency!

## Lokaal Testen

Subdomeinen werken niet standaard op localhost. Om te testen:

### Optie 1: /etc/hosts (Linux/Mac)

```bash
sudo nano /etc/hosts

# Voeg toe:
127.0.0.1 test-agency.localhost
127.0.0.1 demo.localhost
```

### Optie 2: lvh.me (gratis DNS service)

`lvh.me` wijst automatisch naar 127.0.0.1:

```
http://test-agency.lvh.me:3000
http://demo.lvh.me:3000
```

### Optie 3: Alleen path-based testen

Gewoon via:
```
http://localhost:3000/test-agency/crm
http://localhost:3000/demo/signup
```

## Reserved Subdomains

Deze subdomeinen zijn gereserveerd en worden NIET als agency behandeld:

- `www` - Main website
- `app` - Applicatie
- `api` - API endpoints
- `admin` - Admin panel
- `blog` - Blog
- `docs` - Documentatie
- `help` / `support` - Support
- `status` - Status page
- `mail` / `smtp` - Email
- `cdn` / `static` / `assets` - Static files
- `staging` / `dev` / `test` - Development

## Custom Domains (Unlimited & SaaS Pro)

Agencies met Unlimited of SaaS Pro kunnen hun eigen domein gebruiken.

### Setup per Agency

1. Agency gaat naar `/agency/settings/domain`
2. Voert in: `crm.hunbedrijf.nl`
3. We tonen DNS instructies:
   ```
   Type: CNAME
   Name: crm
   Target: wetryleadflow.com
   ```
4. Agency configureert DNS
5. We verifiëren en activeren

### Implementatie (nog te bouwen)

Database veld: `agencies.customDomain`
Middleware check: Lookup agency by custom domain

## Troubleshooting

### Subdomain werkt niet

1. Check DNS propagation: `dig marketing-xyz.wetryleadflow.com`
2. Wacht 5-10 minuten na DNS wijziging
3. Clear browser cache
4. Check Vercel domain status

### SSL Error

1. Vercel genereert certificaten automatisch
2. Kan tot 24 uur duren bij nieuwe wildcard
3. Check Vercel Dashboard → Domains

### Redirect Loop

1. Check `NEXT_PUBLIC_ROOT_DOMAIN` correct is
2. Verify middleware niet dubbel rewrite doet
3. Check geen conflicterende Vercel redirects

## Monitoring

In Vercel Analytics zie je:
- Requests per subdomain
- Errors per subdomain
- Response times

Voor meer detail, voeg logging toe aan middleware.
