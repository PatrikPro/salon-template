# Nasazení – Luna Studio

## Vercel (doporučeno)

1. Propojte Git repozitář s [Vercel](https://vercel.com).
2. Framework: **Next.js** (automaticky).
3. **Environment variables:**

| Proměnná | Povinná | Popis |
|----------|---------|--------|
| `NEXT_PUBLIC_SITE_URL` | Ano | Veřejná URL webu (včetně `https://`) |

Volitelně: reCAPTCHA klíče (viz `.env.example`), `CONTACT_EMAIL` pro kontaktní API.

4. Deploy proběhne po každém pushi na hlavní větev.

## Produkční checklist

- [ ] `NEXT_PUBLIC_SITE_URL` odpovídá doméně
- [ ] V `content/reservationSettings.json` jsou skutečné URL od Reservia (nebo jiného providera)
- [ ] Texty v `content/` a stránka ochrany soukromí zkontrolovány (právník)
- [ ] Obrázky v `public/images/` nahrazeny za reálné fotografie

## Doména

Vercel: **Settings → Domains**. DNS podle návodu u registrátora; SSL řeší Vercel automaticky.

Stará cesta **`/menu`** je přesměrována na **`/sluzby`** (`next.config.ts`).
