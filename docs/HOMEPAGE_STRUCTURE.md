# Homepage Information Architecture & Design Plan

## Reasoning and Planning
1) Goals & constraints
- Purpose: Present a polished, professional knowledge base with a subtle epic-cosmic vibe that drives discovery and reading of articles/collections.
- Constraints: Keep stars subtle; prioritize readability, speed (SSG), and accessibility (WCAG AA+ contrast, keyboard focus).
- KPIs: Click-through to Articles/Collections, feature article engagement, tag filter usage, time-on-page.

2) Primary audiences & tasks
- Practitioners (PMs, EMs, Designers, Coaches): Quickly find actionable guidance, scan latest/featured, jump by topic (tags/collections).
- Leaders: Skim featured/highlights, evaluate credibility/consistency, share content.
- Tasks: Browse featured, filter by tag, open collection, read latest, navigate core pages.

3) UX principles applied
- Clear hierarchy: Single dominant H1, scannable subcopy, predictable sections in priority order.
- Progressive disclosure: Light hero → feature → filters → previews; no overwhelming walls of content.
- Consistency & restraint: Reuse kb-card, limited accent glows, small constellation dividers, calm motion.

4) Visual system and content model
- Typography: Headings with Cinzel; body with Lora. Tight tracking for professionalism, generous line-height for readability.
- Background: Keep gradient + stars at reduced opacity; ensure cards have strong contrast (light/dark variants).
- Components: kb-card containers, nav-link underline hover, constellation-divider separators, badge/tag chips.

---

## Final Recommendations: Homepage Sections & Behavior

1) Hero (top)
- Content: H1 value proposition (40–60 chars), subcopy (1–2 sentences), primary CTA “Browse articles”, secondary “Explore collections”.
- Optional: Inline search (future), small trust statement (“Curated, practical patterns”).
- Visual: kb-card wrapper; minimal imagery; no heavy glow; stars present but subdued.

2) Featured Article
- Content: Date, up to 3 tags, Title (link), 1–2 sentence description, “Read the feature” CTA.
- Purpose: Editorial focus that sets tone and drives depth reading.
- Visual: kb-card with comfortable spacing; tags as subtle chips.

3) Quick Filters (Trending Tags)
- Content: 8–16 most-used tags as chips linking to /articles?tag=tag; include article count dot.
- Purpose: Fast entry to relevant clusters; measurable engagement.
- Visual: Compact chip row; wraps on small screens.

4) Collections Preview
- Content: 3–6 top collections (by count), card titles, brief line on what’s inside, “View collection” link.
- Purpose: Communicate information architecture; encourage thematic exploration.
- Visual: kb-card grid (1/2/3 cols by breakpoint), thin indigo border and subtle shadow.

5) Latest Highlights
- Content: 3 most recent articles; consistent ArticleCard usage.
- Purpose: Freshness and cadence without overwhelming the page.
- Visual: Grid of ArticleCard (1/2/3 cols), “View all” link to /articles.

6) Principles/Social Proof (optional, compact)
- Content: 3 bullet “Our approach” principles or small testimonial row; keep subtle and brief.
- Purpose: Credibility without distraction.
- Visual: constellation-divider label; small kb-card or inline list.

7) CTA / Newsletter (optional)
- Content: Invite feedback or updates; link to About/Contact; keep low friction.
- Visual: Small kb-card with btn-primary/btn-outline; do not overshadow main CTAs.

8) Footer
- Existing footer is sufficient; ensure links and contrast meet AA; keep constellation divider.

---

## Responsive & Accessibility
- Layout: 1 col on mobile; 2 cols for feature/side on lg; grids at 1/2/3 columns with consistent gap.
- Order: On mobile place Trending Tags below Featured; Collections before Latest; avoid long vertical CTAs.
- Semantics: Use section with aria-labelledby; maintain H1 then descending headings; alt text for any imagery.
- Focus: Visible focus rings on chips/links (uses focus-visible ring tokens); keyboard navigable tag chips.
- Motion: Respect prefers-reduced-motion (future enhancement to pause star animation if needed).

---

## Performance & Implementation Notes
- Keep starfield CSS-only; avoid large background images; prefer SSG; prefetch internal links.
- Lazy-load heavy images (if added later); reuse kb-card and ArticleCard to reduce CSS churn.
- Trending tags and collections derived from existing metadata via contentLoader utilities.

---

## Component Mapping to Existing Code
- Hero: kb-card with H1/subcopy, btn-primary and btn-outline (app/page.jsx).
- Featured: kb-card left; Trending Tags aside right (existing pattern).
- Trending Tags: Link chips to /articles?tag=; reflect counts as now.
- Collections Preview: Grid using /collections logic; show top 3–6 on homepage.
- Latest Highlights: Reuse ArticleCard; cap at 3.
- Divider: constellation-divider for subtle section labels.

---

## Content Guidelines
- H1: “Team Patterns: Practical ways of working for modern product teams”
- Subcopy: 120–160 chars, avoid jargon, emphasize outcomes (clarity, flow, delivery).
- Titles: 50–70 chars; Descriptions: 140–180 chars; Tags: 1–3 per article.

---
