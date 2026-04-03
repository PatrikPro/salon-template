# Luna Studio – prémiový web salonu

Elegantní, responzivní web pro **kadeřnictví / beauty salon** (vlasy, lashes, nails). Postavený na **Next.js 15**, **TypeScript** a **Tailwind CSS**. Obsah se upravuje jednoduchými **JSON soubory v `content/`** (bez vlastní databáze). Rezervace běží přes **externí systém** (výchozí integrace Reservio — tlačítko nebo iframe).

## Rychlý start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplikace běží na [http://localhost:3000](http://localhost:3000).

## Skripty

| Příkaz | Popis |
|--------|--------|
| `npm run dev` | Vývoj (Turbopack) |
| `npm run build` | Produkční build |
| `npm run start` | Produkční server |
| `npm run lint` | ESLint |
| `npm run test` | Vitest |

---

## Úprava obsahu (CMS přes JSON)

Veškerý text a struktura pro klienta jsou v adresáři **`content/`**. Po úpravě souboru uložte a znovu nasaďte / restartujte dev server.

### Služby a ceny → `content/services.json`

- **`categories`**: skupiny služeb (`id`, `name`, `description`, `order`).
- **`items`**: jednotlivé služby:
  - `name`, `description`, `priceLabel` (zobrazený text, např. `od 2 790 Kč`)
  - `priceFromKc` — číslo v Kč pro filtr „max. cena“ (u „od 2 790“ použijte `2790`)
  - `category` — musí odpovídat `id` kategorie
  - `badge` (volitelné, např. `Novinka`)
  - `image` (volitelné, cesta z `/public`, např. `/images/…`)
  - `available`: `false` službu skryje z přehledů
  - `order` — řazení v náhledu na homepage

Stránka: **`/sluzby`**. Stará URL **`/menu`** přesměrovává na `/sluzby`.

### Otevírací doba → `content/openingHours.json`

Pole **`days`**: u každého dne `label`, `hours` (text) nebo `closed: true` a `note` (např. „Zavřeno“). Volitelné **`note`** pod tabulkou (např. odkaz na Instagram).

### Promo banner → `content/promo.json`

- `isActive` — zapnout/vypnout
- `headline`, `text`, `ctaLabel`, `ctaHref` (může být `/rezervace` nebo externí URL)
- `validFrom` / `validTo` — volitelné ISO datumy; mimo rozsah se banner nezobrazí
- `image` — volitelný obrázek

### Galerie → `content/gallery.json`

Pole **`images`**: `id`, `src`, `alt`, `order`. Kliknutím se otevře náhled (lightbox).

### Tým → `content/team.json`

Pole **`members`**: `name`, `role`, `bio`, `image`, `order`. Jedna osoba = jedna karta; více členů se zobrazí v mřížce.

### Rezervace (Reservio / jiný provider) → `content/reservationSettings.json`

Abstraktní vrstva v kódu: `lib/booking/` načítá tento soubor.

| Pole | Význam |
|------|--------|
| `providerName` | Zobrazený název (např. `Reservio`) |
| `bookingMode` | `"button"` nebo `"iframe"` |
| `bookingUrl` | URL rezervační stránky (otevře se v novém okně u tlačítka i jako fallback u iframe) |
| `iframeUrl` | URL pro vložení widgetu (použije se jen při `bookingMode: "iframe"`) |
| `ctaLabel` | Text hlavního tlačítka |
| `helperText` | Krátká nápověda nad widgetem |

**Režim tlačítko:** zobrazí se CTA, které otevře `bookingUrl`.  
**Režim iframe:** vloží se responzivní iframe + tlačítko „Otevřít rezervace v novém okně“.

Pro jiného poskytovatele (Bookio atd.) změňte `providerName` a URL — struktura zůstává stejná.

### Texty homepage, kontakt, reference → `content/site.json`

- `brandName`, `hero` (nadpisy, CTA, obrázek, `imageAlt`)
- `about`, `whyUs`, `aboutPage` (stránka O nás)
- `contact` (adresa, telefon, e-mail, Instagram, `mapEmbedUrl` pro Google Maps embed)
- `testimonials`
- Titulky sekcí pro služby / galerii / tým

Výchozí hodnoty a sloučení s fallbacky: `lib/cms/loadContent.ts`.

---

## AI / stock prompty pro fotografie

Až budete chtít nahradit SVG placeholdery v `public/images/`:

1. **Hero / interiér:** „Elegant salon interior, warm neutral tones, champagne and ivory palette, soft daylight, premium beauty studio, editorial photography“
2. **Styling:** „Female hair stylist working with client, soft natural light, luxury atmosphere, shallow depth of field“
3. **Detail vlasů:** „Close-up of healthy glossy styled hair, editorial beauty, neutral background“
4. **Pracovní místo:** „Beauty workspace with premium hair products, clean minimal aesthetic, rose gold accents“
5. **Nails:** „Elegant manicure detail on neutral background, high-end nail studio“

---

## Architektura (zkráceně)

- **`lib/cms/`** — typy a načítání JSON obsahu
- **`lib/services/`** — služby, filtrace (`filterServiceItems`), provider pro budoucí CMS
- **`lib/booking/`** — konfigurace externí rezervace
- **Stránky:** `/`, `/sluzby`, `/o-nas`, `/tym`, `/galerie`, `/rezervace`, `/kontakt`

Rezervace **neukládají data** na serveru tohoto projektu. Kontaktní formulář a newsletter stále používají API routy v `app/api/`.

## SEO a prostředí

Nastavte `NEXT_PUBLIC_SITE_URL` v `.env.local` na produkční doménu (metadata, OG, sitemap).

---

_Detailní nasazení viz [DEPLOYMENT.md](./DEPLOYMENT.md)._
