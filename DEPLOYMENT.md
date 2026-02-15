# 🚀 Deployment – Zuzu Café

## Deploy na Vercel

### Varianta 1: Přes Git (doporučeno)

1. **Push repo na GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Zuzu Café"
   git remote add origin <repo-url>
   git push -u origin main
   ```

2. **Propojte s Vercelem**
   - Přihlaste se na [vercel.com](https://vercel.com)
   - Klikněte **Add New → Project**
   - Importujte Git repozitář
   - Framework preset: **Next.js** (auto-detected)
   - Root directory: `.` (default)

3. **Nastavte Environment Variables** na Vercelu:
   | Proměnná | Hodnota | Povinná |
   |----------|---------|---------|
   | `NEXT_PUBLIC_SITE_URL` | `https://vase-domena.cz` | ✅ |
   | `RESERVATIONS_EXPORT_TOKEN` | vlastní silný token | ✅ |
   | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA klíč | ❌ (volitelné) |
   | `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret | ❌ (volitelné) |

4. **Deploy**
   - Vercel automaticky buildne a deployne při každém push

### Varianta 2: Přes Vercel CLI

```bash
# Nainstalujte CLI (globálně)
npm i -g vercel

# Přihlaste se
vercel login

# Deploy (preview)
vercel

# Deploy (produkce)
vercel --prod

# Nastavte env vars
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add RESERVATIONS_EXPORT_TOKEN
```

## Nastavení vlastní domény

1. Na Vercelu: **Settings → Domains → Add Domain**
2. Zadejte vaši doménu (např. `kavarnamleta.cz`)
3. Vercel vám ukáže DNS záznamy, které potřebujete nastavit:

   **Varianta A – Apex doména (kavarnamleta.cz):**
   ```
   Typ: A
   Název: @
   Hodnota: 76.76.21.21
   ```

   **Varianta B – Subdoména (www.kavarnamleta.cz):**
   ```
   Typ: CNAME
   Název: www
   Hodnota: cname.vercel-dns.com
   ```

4. Nastavte DNS záznamy u vašeho registrátora (Wedos, Forpsi, Cloudflare…)
5. Vercel automaticky vydá SSL certifikát (Let's Encrypt)
6. Ověřte, že `NEXT_PUBLIC_SITE_URL` odpovídá vaší doméně

## Produkční checklist

- [ ] Nastavit `NEXT_PUBLIC_SITE_URL` na skutečnou doménu
- [ ] Nastavit `RESERVATIONS_EXPORT_TOKEN` na silný, unikátní token
- [ ] Rozhodnout o spam ochraně (honeypot / reCAPTCHA)
- [ ] Nahradit placeholder obrázky reálnými fotografiemi
- [ ] Nahradit placeholder kontaktní údaje (adresa, telefon, email)
- [ ] Upravit texty ochrany soukromí (konzultace s právníkem)
- [ ] Zvážit upgrade ukládání rezervací (Redis/PostgreSQL) pro persistenci
- [ ] Nastavit Google Analytics / Plausible (volitelně)
- [ ] Otestovat na mobilech + tabletových zařízeních
- [ ] Ověřit OpenGraph image na sociálních sítích
- [ ] Přidat reálné odkazy na sociální sítě (Instagram, Facebook)

## Známá omezení

1. **In-memory storage**: Rezervace se ztratí při cold start (serverless). Pro produkci doporučujeme Redis (Upstash) nebo PostgreSQL (Vercel Postgres).
2. **Newsletter**: Mock implementace – pro produkci napojte na Mailchimp, Brevo nebo ConvertKit.
3. **Kontaktní formulář**: Zprávy se pouze logují – pro produkci implementujte emailové notifikace (Resend, SendGrid, Postmark).
4. **Mapy**: Google Maps embed s placeholder lokací – aktualizujte souřadnice.

## Vercel Edge Functions

OG image (`app/opengraph-image.tsx`) běží na Edge Runtime pro rychlé generování. Ostatní API routes běží na Node.js runtime.
