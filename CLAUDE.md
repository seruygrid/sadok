# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** landing page for "Sadok" — a Ukrainian service selling living fruit tree gifts.

- **Single-page app**: all UI lives in `src/app/page.tsx` (one large React component, ~444 lines)
- **Layout & metadata**: `src/app/layout.tsx` — sets up Manrope font (with Cyrillic subset), OpenGraph/Twitter metadata, and `lang="uk"` for Ukrainian
- **Styling**: Tailwind CSS v4 via PostCSS; no separate CSS modules — all utility classes inline in JSX
- **Images**: Uses Next.js `<Image>` with remote sources configured in `next.config.ts` (Unsplash, Pixabay). Large local hero: `public/hero-orchard.png`
- **Path alias**: `@/*` maps to `./src/*`

### Page structure (page.tsx sections, top to bottom)
1. Fixed navigation with mobile menu toggle (client-side `useState`)
2. Hero — full-viewport image with gradient overlay
3. Feature cards — 3-column grid
4. How It Works — 3-step timeline
5. Pricing — 3 tiers (Базовий 2490₴ / Стандарт 3990₴ / Преміум 5990₴)
6. FAQ — native `<details>`/`<summary>` elements
7. Footer

The component uses `"use client"` directive (required for the mobile menu toggle state).