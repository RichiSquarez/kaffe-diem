# Kaffe Diem — project guide

Marketing site for Kaffe Diem, a student-run coffee bar inside Amalie Skram
videregående skole in Bergen, Norway. Rebuilt from a static HTML site.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** — theme tokens live in `app/globals.css` under `@theme`
- Deployed on **Vercel**. Every route is statically prerendered.

## Layout

| Path | What lives there |
|---|---|
| `lib/content.ts` | **Single source of truth** — menu, prices, hours, FAQ, news, NAP details |
| `lib/schema.tsx` | schema.org JSON-LD, derived from `content.ts` |
| `app/*/page.tsx` | One folder per route (`/menu`, `/hours`, …) |
| `components/` | `site-header`, `site-footer`, `hero`, `ui` (Section/Button/PageHero), `icons`, `open-status` |

## Rules that matter here

- **Content changes go in `lib/content.ts`, never in JSX.** Pages, nav and JSON-LD
  all read from it, so editing one place keeps structured data honest.
- **Never override Button colors via `className`.** Use a variant
  (`primary` / `gold` / `ghost` / `ghostLight`). Conflicting Tailwind utilities
  resolve by stylesheet order, not prop order — overriding produced an invisible
  button on a dark background once already.
- `ghostLight` / light text is for dark (espresso) backgrounds; `ghost` / dark text
  is for light (paper) backgrounds. Check contrast before shipping either.
- Scroll animations: add `data-reveal` to an element. `components/reveal.tsx`
  handles it, respects `prefers-reduced-motion`, and reveals above-the-fold
  content synchronously. Content must stay readable if JS never runs.
- **`RevealScript` must stay keyed on `usePathname()`.** It lives in the root
  layout, which does not remount during client-side navigation. With a bare
  `[]` dependency it runs only once, and every page reached by clicking a link
  renders blank below the hero until a hard refresh. This shipped once — if you
  touch that effect, re-check it by clicking (not reloading) into each page.
- Site language is **Norwegian (bokmål)**. URLs stay English (`/menu`, `/hours`)
  because they are already indexed — do not rename routes.
- Icons are SVG in `components/icons.tsx`. No emoji as icons.
- **Anything time-dependent must be a client component.** Pages are statically
  prerendered, so computing "are we open?" on the server bakes in the build time.
  See `components/open-status.tsx`; `getOpenState` evaluates in Europe/Oslo, not
  the visitor's timezone, and is covered by `lib/open-state.test.mts`.
- The menu quick-nav links to section ids. If you add or rename a section,
  update both — a dead `#anchor` scrolls nowhere and is easy to miss.

## Commands

```bash
npm run dev        # local dev
npm run test       # self-check for getOpenState (node type-stripping, no framework)
npm run build      # production build (also type-checks)
npm run typecheck  # types only
```

## Verifying UI changes

There is no browser extension configured. Screenshot locally with headless Chrome:

```bash
npm run build && npx next start -p 4311 &
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1440,3000 --virtual-time-budget=7000 \
  --screenshot=/tmp/shot.png http://localhost:4311/menu
```

Use `--headless=new`; the old headless mode ignores `--window-size` for layout and
produces misleading crops.
