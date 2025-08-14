# Agile Articles ✨ (Now on Next.js)
A modern, magazine-like reading experience for opinionated essays and guides — not a knowledge base. Rebuilt on Next.js (App Router) with Tailwind CSS, Markdown content, dark mode, and tasteful motion.

[![Node.js](https://img.shields.io/badge/node-%E2%89%A5%2018.x-3c873a?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/next-14.x-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind](https://img.shields.io/badge/tailwind-3.x-38bdf8?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## Highlights
- 📰 Curated reading vibe (Hero, Featured, Latest grid)
- 🔎 Trending tags (computed from content)
- 🌗 Dark mode with persistence (respects system preference)
- ⏱ Reading time + subtle progress bar on articles
- 📝 Write in Markdown (GFM enabled)
- ⚡️ Fast by default: Server Components, code-splitting, caching
- 🖼 Image-friendly: relative images in Markdown served under /content
- ♿ Accessibility-first: landmarks, labels, focus styles, contrast

---

## Quick start
Run locally with Node 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Environment variables:
- CONTENT_DIR: where your Markdown lives (default ./data/docs)

```bash
CONTENT_DIR=./data/docs npm run dev
```

---

## Add your first article
Place Markdown anywhere under CONTENT_DIR (default: data/docs).

Example: data/docs/agile-mindset.md
```md
---
title: The Agile Mindset
date: 2024-09-18
tags: agility, culture, teams
summary: A short riff on why mindset matters more than process charts.
---

# The Agile Mindset

Agility starts with how you think, not the tools you use…
```

Front matter fields:
- title (required-ish; falls back to first H1 or filename)
- slug (optional; auto-derived from title if missing)
- date or publishedAt (optional, for sorting)
- tags (array or comma-separated string)
- summary/description/excerpt (optional, used on cards and meta)

Images: keep them alongside your .md and reference relatively (e.g., ./imgs/flow.png). They’re served from /content preserving structure.

---

## What you get
- Home (/) shows:
  - A welcoming hero
  - Optional Featured article (most recent)
  - Trending tags
  - Latest grid
- Article (/:slug) shows:
  - Title, date, tags, reading time
  - Rich Markdown (GFM), progress bar, copy-link button
- Global:
  - Dark mode toggle with localStorage persistence
  - Optimized, accessible UI with Tailwind

---

## Project structure
- app/ — Next.js App Router
  - layout.jsx — shell, header/footer, theme
  - page.jsx — home (hero, featured, trending, latest)
  - [slug]/page.jsx — article page
  - content/[...path]/route.js — serves assets under /content from CONTENT_DIR
  - components/ — UI components (Header, Footer, etc.)
  - globals.css — Tailwind styles
- lib/
  - contentLoader.js — scans Markdown, parses front matter, renders HTML
- data/docs/ — default content directory (configurable via CONTENT_DIR)
- public/ — static assets

---

## Theming & customization
- Tailwind config in tailwind.config.js (brand colors under theme.extend.colors.brand)
- Header logo “A” badge — customize in app/components/Header.jsx
- Typography — Tailwind Typography plugin; prose classes used on article pages

Production tip: Consider ISR (revalidate) + image optimization for very large catalogs.

---

## Accessibility
- Clear landmarks (header, main, footer)
- Labels for interactive controls (theme toggle, buttons)
- Keyboard focus visible and usable
- Colors tuned for contrast in light/dark

---

## Deployment
Any Node-friendly platform works (Vercel, Render, Railway, Fly.io, Azure, etc.).

- Node version: >= 18
- Ensure CONTENT_DIR exists and is readable at runtime
- Build and start:
```bash
npm run build
npm start
```

---

## Roadmap
- Search index (server-side)
- RSS/sitemap
- Tag landing pages
- Image thumbnails and blur-up
- MDX for interactive embeds

---

## Contributing
PRs welcome!
- Keep UI accessible and responsive
- Small, focused changes are best
- Follow existing conventions

---

## License
Add a LICENSE file to define your preferred terms.

Built with ❤️ for teams who value clarity and momentum.
