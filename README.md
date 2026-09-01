# Infinium Softech

Next.js (App Router) rebuild of the Infinium Softech site. TypeScript + SCSS (no Tailwind), built with SEO as a first-class concern.

## Getting started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

- `src/app/` — routes (App Router). Each folder is a route; `page.tsx` is the page, `layout.tsx` wraps it.
- `src/components/` — shared UI components.
- `src/styles/` — shared SCSS partials (`_variables.scss`, `_mixins.scss`).
- `src/lib/` — shared utilities, including `seo.ts` (site name/URL/description used across metadata, sitemap, robots).
- `src/app/sitemap.ts`, `src/app/robots.ts` — auto-generated `/sitemap.xml` and `/robots.txt`.
- `design-reference/` — the original standalone HTML design export, kept for reference only (not part of the app).

## SEO

- Per-page `metadata` exports (App Router Metadata API) — title template, description, Open Graph, Twitter cards.
- `metadataBase` set from `src/lib/seo.ts` so relative OG/canonical URLs resolve correctly.
- `sitemap.ts` / `robots.ts` generate `/sitemap.xml` and `/robots.txt` automatically.
- Prefer server components and semantic HTML for every section so content is present in the initial server-rendered HTML.

Update `NEXT_PUBLIC_SITE_URL` (or the default in `src/lib/seo.ts`) once the production domain is confirmed.
