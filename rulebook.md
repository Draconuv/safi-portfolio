# Safi Portfolio — Homepage Rulebook

> **Status:** IN DEVELOPMENT (planning phase)
> **Rulebook-first:** tokens and structure before pixels. Items marked **PROPOSED** are not yet ruled by Safi. **LOCKED** means Safi chose it. Nothing below is LOCKED unless it says so.
> Source of truth: this file. `.md`, not the extracted CSS.

---

## 1. Context

- **Who:** Safi (product design) — portfolio hosted on GitHub Pages.
- **Live:** `https://draconuv.github.io/safi-portfolio/` (repo `Draconuv/safi-portfolio`, public, branch `main`).
- **Stack (LOCKED):** static HTML + CSS + JS, zero build, no dependency. Deployed pushing `main`.
- **Purpose of this doc:** plan the **homepage** only. Individual project/case-study pages come later, each as its own pass.

---

## 2. Open questions (not yet ruled by Safi)

- **Audience:** recruiters vs freelance clients vs both — **OPEN**. Affects case-study framing, not homepage layout much.
- **Visual direction:** minimalist (Bryn Taylor) vs dark neon vs a 2-3 option browser — **PROPOSED**: minimalist canvas, color carried by project imagery. Awaiting ruling.
- **Motion section name/wording:** "Interactions / Motion studies" — draft only.

---

## 3. Homepage sections (proposed order)

1. **Hero** — tiny. Name, one-line tagline, no animation flourish beyond a single quiet entrance.
2. **Selected work** — grid of 3-6 case-study cards. Lead with outcome + role/platform/context on the card.
3. **Interactions / Motion studies** — the dedicated showcase (see §5). This section is a differentiator: most portfolios show static screens.
4. **About** — short; personality usually lives here, not the hero.
5. **Contact / footer** — minimal.

Patterns researched: work on the homepage immediately, hero stays small; color reserved for the work; descriptive titles; 3-6 items max; motion is subtle and serves navigation.

---

## 4. Design tokens (PROPOSED — pending visual direction ruling)

> Current live CSS uses `Inter`, `#1a1a1a` on `#fafafa`. These tokens formalize that as the base so the site chrome stays quiet.

- **Color (chrome):** background `#fafafa`, ink `#1a1a1a`, muted `#6b6b6b`, line `#e5e5e5`.
- **Color (accent):** reserved for project media, not page chrome — **PROPOSED** constraint.
- **Type:** `Inter` (or other sans) — one family, vary weight/size only. Configurable later.
- **Spacing:** 16/24 rhythm; work-section uses larger gutters. 48px tap targets on interactive elements (Safi default).
- **Radius:** small pills for badges; modest cards. TBD after direction ruling.

---

## 5. Motion & the Interactions showcase (LOCKED shape)

### 5.1 Site-wide motion (LOCKED, dependency-free)
- CSS transitions + keyframes + `IntersectionObserver` only. No animation library/GSAP.
- Allowed: reveal-on-scroll (fade + slight rise, once), one quiet hero entrance, hover states (subtle lift / accent line), staggered homepage entrance on load.
- Ruled out: parallax marquees, scroll-jacking, autoplaying pull-focus motion in chrome.
- `prefers-reduced-motion`: animations collapse to static end states.

### 5.2 The Interactions section (LOCKED purpose)
- A dedicated homepage section showing **design interaction / motion demos**, e.g. made in **Rive** (`.riv`) or **Lottie** (`.json` via Figma export).
- Purpose: demonstrate animation craft that static screenshots cannot. Fits Safi's rule that motion is a mechanism.
- 3-5 demos max. Five crafted beats a dozen unfinished.

### 5.3 Demo card contract
- Card fields: short label, one line on intent ("hover state for offline confirmation flow"), then the demo.
- One runtime/format per demo. Discipline: whole section under ~1MB total.
- Demo behavior:
  - Hover/focus rebinds (site rule).
  - Tap replays the demo on mobile.
  - `prefers-reduced-motion` → static image showing end state.
  - Poster image before play; lazy-load/`IntersectionObserver` on request.

### 5.4 Dependency exception (PROPOSED)
- Rive/Lottie runtimes are small deps and deviate from zero-dependency site-wide. Flagged as an accepted exception **for this section only**, because its sole purpose is running demos. Awaiting Safi's sign-off.

---

## 6. Guards

- Every animation serves navigation/craft, never performance theatre.
- Content readable in 5s; work section is first-class.
- Motion sections degrade gracefully (poster / reduced-motion).
- Nothing on the homepage is more important than the work itself.