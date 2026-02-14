# ☕ Kavárna Mletá & Měkká – Web

Moderní, responzivní, reprezentativní web pro kavárnu. Postavený na **Next.js 15 + TypeScript + Tailwind CSS**.

> **UNSPECIFIED defaults** (lze změnit – hledej komentáře `UNSPECIFIED` v kódu):
> - Název kavárny: *Kavárna Mletá & Měkká*
> - Adresa: Školská 12, Praha 2
> - Telefon: +420 777 123 456
> - E-mail: ahoj@kavarnamleta.cz
> - Otevírací doba: Po–Pá 8–20, So 9–21, Ne 9–18
> - Max osob online: 8
> - Ukládání rezervací: in-memory (demo) – viz upgrade path níže

---

## Rychlý start

```bash
# Naklonuj repo
git clone <repo-url> && cd coffee-shop

# Nainstaluj závislosti
npm install

# Zkopíruj env soubor a uprav
cp .env.example .env.local

# Spusť dev server
npm run dev
```

Otevři [http://localhost:3000](http://localhost:3000).

## Skripty

| Příkaz | Popis |
|--------|-------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Produkční build |
| `npm run start` | Produkční server |
| `npm run lint` | ESLint |
| `npm run test` | Vitest (unit + integration) |
| `npm run test:watch` | Vitest watch mode |
| `npm run test:e2e` | Playwright (e2e skeleton) |

## Tech stack

- **Next.js 15** (App Router, Server Components, Route Handlers)
- **React 19** + **TypeScript**
- **Tailwind CSS 3** (custom design tokens: coffee/cream/accent)
- **react-hook-form** + **zod** (formuláře + validace)
- **react-icons** (Feather ikony – `react-icons/fi`)
- **clsx** + **tailwind-merge** (utility `cn()`)
- **vitest** + **@testing-library/react** (testy)

## Stránky

| URL | Popis |
|-----|-------|
| `/` | Homepage – hero, o nás, menu preview, galerie, akce, recenze, kontakt |
| `/menu` | Kompletní menu s filtry (kategorie, tagy, hledání, max cena) + detail modal |
| `/rezervace` | 3-krokový formulář (datum/čas → kontakt → rekapitulace) |
| `/kontakt` | Kontaktní formulář + mapa + otevírací doba |
| `/ochrana-soukromi` | GDPR / ochrana soukromí (placeholder) |

## API endpointy

| Endpoint | Method | Popis |
|----------|--------|-------|
| `/api/contact` | POST | Kontaktní formulář (validace + honeypot) |
| `/api/reservations` | POST | Nová rezervace |
| `/api/reservations-export` | GET | CSV export (chráněno tokenem) |
| `/api/newsletter` | POST | Newsletter signup (mock) |

### CSV export

```bash
# S tokenem v headeru:
curl -H "X-Export-Token: change-me-before-deploy" http://localhost:3000/api/reservations-export

# Nebo s query parametrem:
curl "http://localhost:3000/api/reservations-export?token=change-me-before-deploy"
```

## Správa menu

Menu je uložené v `content/menu.json`. Formát:

```json
{
  "categories": [{ "id": "espresso", "name": "Espresso", "description": "...", "order": 1 }],
  "items": [{ "id": "espresso-single", "name": "Espresso", "price": 55, "category": "espresso", "tags": ["oblíbené"], ... }]
}
```

### Tagy pro filtrování

`vegan` | `bezlepkové` | `bez-kofeinu` | `work-friendly` | `oblíbené` | `sezónní`

### YAML podpora (volitelná)

1. Nainstalujte `npm i yaml`
2. Vytvořte `content/menu.yaml` ve stejném formátu
3. Odkomentujte `YamlMenuProvider` v `lib/menu/loadMenu.ts`

### Headless CMS (unspecified – zatím neimplementováno)

Rozhraní `MenuProvider` je připraveno v `lib/menu/loadMenu.ts`. Doporučené CMS:

1. **Sanity.io** – flexibilní, free tier, real-time preview, GROQ dotazy
2. **Strapi** – open-source, self-hosted, REST + GraphQL
3. **Contentful** – cloud, CDN, bohatý ekosystém pluginů

Pro přepnutí: implementujte `MenuProvider` interface a změňte export.

## Ochrana proti spamu

### Honeypot (default)

Formuláře obsahují skryté pole `website`. Boti ho vyplní → server request tiše zahodí.

### reCAPTCHA (volitelné)

1. Získejte klíče z Google reCAPTCHA v3
2. Nastavte v `.env.local`:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=xxx
   RECAPTCHA_SECRET_KEY=xxx
   ```
3. Na klientu přidejte reCAPTCHA widget
4. Server automaticky ověří token (viz `lib/spam/recaptcha.ts`)

## Ukládání rezervací

**Default**: In-memory store (`lib/reservations/repoMemory.ts`)

⚠️ **Omezení**: Data se ztratí při restartu / novém deployi (serverless = cold start).

**Upgrade path** (implementujte `ReservationRepo` interface):
- **Upstash Redis** – serverless Redis, persistence, jednoduché API
- **Vercel Postgres / Neon** – plnohodnotná PostgreSQL databáze
- **Supabase** – PostgreSQL + realtime + auth

## Assety – doporučení pro reálné obrázky

Placeholder SVG jsou v `public/images/`. Pro produkci doporučujeme:

### AI prompty pro generování fotek

| Obrázek | AI prompt |
|---------|-----------|
| Hero | "Bright, airy coffee shop interior, wooden table with a latte and a laptop, natural light from large windows, minimal Scandinavian style, warm tones" |
| Gallery 1 | "Top-down view of a latte art rosetta in a ceramic cup on a light wooden table" |
| Gallery 2 | "Cozy coffee shop corner with a person reading a book, warm light, plants" |
| Gallery 3 | "Display case with fresh pastries, croissants, and banana bread in a coffee shop" |

Doporučené nástroje: Midjourney, DALL-E 3, Stable Diffusion

## Alternativa: styled-components

Pokud byste chtěli místo Tailwindu použít styled-components:
- Odebrali byste `tailwind.config.ts`, `postcss.config.mjs` a Tailwind direktivy z `globals.css`
- Přidali byste `styled-components` + `babel-plugin-styled-components` (nebo SWC plugin)
- Každá komponenta by měla vlastní `*.styles.ts` soubor
- ThemeProvider by definoval tokeny (colors, fonts, spacing)
- Klíčové soubory: `lib/theme.ts`, `components/ui/Button.styles.ts`

Implementována je **Tailwind varianta**.

## Testování

```bash
# Unit + integration testy
npm run test

# Watch mode
npm run test:watch
```

### Pokryté testy

1. **UI Button** – render, varianty, velikosti, click, disabled
2. **Menu filtrování** – kategorie, tagy, hledání, cena, kombinace
3. **API kontakt** – validní submit, krátké jméno, neplatný email, honeypot spam

### E2E plán (Playwright skeleton)

Pro budoucí implementaci:

```typescript
// tests/e2e/homepage.spec.ts
test("homepage loads with hero section", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /zpomalí/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /rezervovat/i })).toBeVisible();
});

test("menu page filters work", async ({ page }) => {
  await page.goto("/menu");
  await page.getByRole("button", { name: "Espresso" }).click();
  // Ověř, že se zobrazí jen espresso položky
});

test("reservation form completes", async ({ page }) => {
  await page.goto("/rezervace");
  // Krok 1: vyplň datum, čas, osoby
  // Krok 2: vyplň jméno, email
  // Krok 3: potvrď
  await expect(page.getByText(/přijata/i)).toBeVisible();
});
```

---

*Detaily k nasazení viz [DEPLOYMENT.md](./DEPLOYMENT.md).*
