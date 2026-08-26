# Kaffe Diem

Website for **Kaffe Diem** — a coffee bar inside Amalie Skram videregående skole
in Bergen, Norway. <https://www.kaffediem.online>

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Every page is statically prerendered.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (type-checks too) |
| `npm start` | Serve the production build |
| `npm run typecheck` | Types only |

## Editing content

Menu items, prices, opening hours, FAQ entries, news posts and the address all
live in **`lib/content.ts`**. Change them there — the pages, the navigation and
the schema.org structured data are all generated from that file.

Adding a menu item:

```ts
// lib/content.ts → menuGroups → items
{ name: "Flat white", price: "12 kr" },
```

## Deploying to Vercel

The repo is zero-config for Vercel.

1. Push to GitHub.
2. In Vercel: **Add New → Project**, import the repo.
3. Framework preset is detected as Next.js. No env vars needed.
4. Deploy, then add the custom domain `kaffediem.online` under
   **Settings → Domains**.

Or from this directory:

```bash
npx vercel        # preview
npx vercel --prod # production
```

## Notes

- The original static HTML site is not in the working tree; it is preserved in
  git history at commit `6cafbf4` if you ever need to look something up.
- Old `.html` URLs (`/menu.html` etc.) 308-redirect to their new paths, so
  existing inbound links keep working.
- `robots.txt` and `sitemap.xml` are generated at build time from `lib/content.ts`.
