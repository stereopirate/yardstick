# CLAUDE.md — Lawn Care Tracker (Easy Green)

This file provides context, conventions, and development guidance for AI assistants working on this codebase.

---

## Project Overview

**Easy Green** is a research-backed lawn care tracking Progressive Web App (PWA). It is entirely client-side — no backend, no build step, no npm. The app runs directly in the browser using CDN-loaded dependencies.

- **App name**: Easy Green – Your Lawn Care Made Simple
- **Live URL**: `https://stereopirate.github.io/Lawn-care-tracker/`
- **Primary file**: `index.html` (~2,440 lines, contains all React app logic)
- **Theme color**: `#367C2B` (forest green)
- **Target users**: DIY homeowners tracking their own lawn and landscape maintenance by grass type and USDA hardiness zone
- **Hosting**: GitHub Pages (free tier) — the app must remain statically hostable with zero server costs

---

## Project Rules (Owner Instructions)

These rules come directly from the project owner and **must be followed in every session**:

### 1. Keep It Simple and Free
- The app must remain hostable on **GitHub Pages for free** — no paid services, no backend, no databases, no server-side logic
- Avoid adding complexity that would require a build step, server, or paid CDN beyond the existing free CDN dependencies

### 2. Always Work from the Latest Files
- Before making any changes, always read the **current state of the file** being modified — do not rely on memory or prior conversation turns
- After changes are approved, the updated files should be treated as the new canonical version

### 3. Provide a Preview After Every Change
- After any code change to `index.html` or other UI files, **provide an updated preview** (rendered HTML snippet or description of what changed visually) so the owner can review before publishing

### 4. Mobile-First Design
- **Primary design target is mobile** — assume the user is on a phone in their yard
- Critical information must be immediately visible; secondary details go behind accordions, collapsibles, or "show more" patterns
- Never add information-dense layouts that only work on desktop

### 5. Suggest UX Improvements
- When relevant, **proactively suggest improvements** that would benefit a DIY homeowner tracking lawn and landscape maintenance
- Keep suggestions practical and tied to real homeowner workflows (e.g., seasonal reminders, equipment maintenance alerts, quick-log shortcuts)

### 6. Never Remove Content Without Explicit Approval
- **Do not remove any existing feature, section, or piece of content** unless the owner has explicitly requested its removal
- When in doubt, ask before deleting — additions are always safer than removals
- If a change requires removing something, state clearly what will be removed and get confirmation first

---

## Architecture

### No Build Step

This project has **no package.json, no webpack, no TypeScript, no npm**. All dependencies are loaded via CDN at runtime:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
```

React JSX is transpiled in-browser by Babel Standalone via `<script type="text/babel">`.

### File Structure

```
Lawn-care-tracker/
├── index.html              # Main app — all React components, state, and UI (~2,440 lines)
├── grass-programs.js       # Grass maintenance program schedules by type and zone (276 lines)
├── v4-new-components.js    # Dashboard and statistics components (441 lines, inserted at ~line 1669)
├── service-worker.js       # PWA offline caching (53 lines)
├── manifest.json           # PWA manifest (app name, icons, theme)
├── about.html              # Static informational page
├── logo.png                # App logo
├── coach-icon.png          # Coach mascot (summer)
├── coach-winter.png        # Coach mascot (winter variant)
└── activity-*.png          # Activity type icons (mowing, fertilizer, trimming, watering, seeding, general)
```

### Key Data Structures (all defined in `index.html`)

| Constant | Purpose |
|---|---|
| `PRODUCT_DATABASE` | 75+ mowers (walk-behind, riding, zero-turn), 10 spreaders, 10 trimmers, fertilizers, seeds |
| `TREATMENT_PRODUCTS` | Pre/post-emergent, fungicide, insecticide, soil amendments (5 each) |
| `GRASS_INFO` | Grass type metadata: mow height, water needs, soil pH, zone notes, sources |
| `RESEARCH_SOURCES` | 19 university extension services used for citation badges |
| `ACTIVITY_TYPES` | mowing, fertilizer, trimming, watering, seeding, aeration, maintenance |

`grassPrograms` is defined in `grass-programs.js` and loaded before the main script tag.

---

## React Component Conventions

- **All components are functional** with React hooks (`useState`, `useEffect`, `useRef`)
- **No React Router** — navigation is purely state-driven (a `currentView` state variable)
- **No Context or Redux** — state is managed locally and passed as props
- Components are defined inline inside `index.html`'s `<script type="text/babel">` block
- `v4-new-components.js` contains the `Dashboard` component (to be inserted at ~line 1669)

### Citation System

A key UI pattern is the `CitationBadge` component — a small circular `i` button that opens a popup showing university extension sources for a given claim:

```jsx
<CitationBadge sources={[{ name: 'Penn State Extension', url: '...', topic: 'Tall Fescue' }]} label="mow height" />
```

The popup uses `position: fixed` centered on screen (not a portal) to ensure reliable mobile behavior. Do not replace this with tooltip/hover approaches — they are broken on mobile.

---

## Styling Conventions

- **Tailwind CSS utility classes** for all layout and spacing (no custom CSS framework)
- **Inline styles** used for dynamic values or precise overrides
- **Custom CSS** at top of `index.html` `<style>` block for animations and cite-btn/cite-popup styles

### Typography

| Role | Font | Weight | CSS Variable |
|---|---|---|---|
| Hero & all headings (h1, h2, h3) | **Fraunces** | 600–700 | `--ys-font-display` |
| Body, buttons, nav, labels | **Quicksand** | 500–700 | `--ys-font-body` |

Loaded via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
```

CSS variable declarations (in `:root`):
```css
--ys-font-body:    'Quicksand', system-ui, -apple-system, sans-serif;
--ys-font-display: 'Fraunces', Georgia, serif;
```

The global rule `h1, h2, h3 { font-family: var(--ys-font-display); }` applies the display font to all heading elements automatically. Apply `style={{fontFamily:'var(--ys-font-display)'}}` to any element that should use Fraunces but isn't a semantic heading (e.g., the header wordmark span).

**Character:** Fraunces is warm, editorial, and softly organic — giving the brand authority without stiffness. Quicksand is rounded and highly legible at small sizes, ideal for mobile labels, buttons, and nav tabs.

### Brand CSS Variables (`:root`)

```css
/* Green scale */
--ys-green-900: #1C3318
--ys-green-800: #234D20   ← header background
--ys-green-700: #2D6627   ← coach card gradient start
--ys-green-600: #367C2B   ← primary CTAs, active states
--ys-green-500: #4A9E3C
--ys-green-400: #6BBF5A
--ys-green-200: #C4E8BC
--ys-green-100: #EBF5E6   ← icon backgrounds, badge fills
--ys-green-50:  #F4FAF2   ← nav tab hover

/* Gold accent */
--ys-gold-500: #C8960C
--ys-gold-400: #D4A833
--ys-gold-300: #E2C46A
--ys-gold-100: #FDF3D8

/* Soil / warm neutral */
--ys-soil-800: #3B2A1A
--ys-soil-600: #6B4C2A
--ys-soil-400: #9C7248
--ys-soil-200: #D4B896
```

### Phase 2 Utility CSS Classes

Defined in the `<style>` block in `index.html`:

| Class | Purpose |
|---|---|
| `.ys-coach-card` | Dark-green gradient hero card (home screen greeting) |
| `.ys-badge-white` | Semi-transparent white pill badge (used inside coach card) |
| `.ys-badge-green` | Light green pill badge (used on white backgrounds) |
| `.ys-btn-primary` | Green CTA button using `--ys-green-600` |
| `.ys-card` | White rounded card with subtle shadow |
| `.ys-bottom-nav` | Fixed mobile bottom navigation bar |
| `.ys-nav-tab` | Individual bottom nav tab |
| `.ys-nav-active` | Active state for bottom nav tab |
| `.ys-nav-log-btn` | Prominent green Log CTA in bottom nav |

### Color Palette

| Use | Value |
|---|---|
| Primary green | `#367C2B` |
| Mowing activity | `#367C2B` |
| Fertilizer activity | `#F97316` (orange) |
| Trimming activity | `#10B981` (emerald) |
| Watering activity | `#3B82F6` (blue) |
| Seeding activity | `#92400E` (brown) |
| Aeration activity | `#8B5CF6` (purple) |
| Maintenance activity | `#6B7280` (gray) |

### Animation Classes

Defined in `<style>` block at top of `index.html`:
- `.animate-fade-in` — fade + slide up (0.3s)
- `.animate-scale-in` — scale from 0.95 (0.25s)
- `.card-hover` — scale on `:active`
- `.btn-press` — scale + opacity on `:active`
- `.menu-slide` — fade + slide (0.2s)

---

## Naming Conventions

- **Variables/functions**: `camelCase`
- **Constants/databases**: `UPPER_SNAKE_CASE` (e.g., `PRODUCT_DATABASE`, `ACTIVITY_TYPES`)
- **Product IDs**: prefixed by category — `wb1`–`wb25` (walk-behind), `rd1`–`rd25` (riding), `zt1`–`zt25` (zero-turn), `sp1`–`sp10` (spreaders), `t1`–`t10` (trimmers), `f1`–`f10` (fertilizers), `s1`–`s10` (seeds)
- **Grass type keys**: kebab-case (e.g., `tall-fescue`, `kentucky-bluegrass`)

---

## Data Storage

All user data is persisted in **browser LocalStorage**. There is no backend, database, or server-side storage of any kind. The app is fully offline-capable via the service worker after first load.

---

## PWA / Service Worker

- Cache name: `easy-green-v1`
- Caches: `/`, `/index.html`, `/manifest.json`, and all CDN script URLs
- Strategy: cache-first with network fallback
- **When updating CDN versions**, bump `CACHE_NAME` in `service-worker.js` to invalidate old caches

---

## Views / Navigation

The app uses a `currentView` state variable to switch between views — there is no URL routing:

| View | Description |
|---|---|
| `home` | Coach mascot, activity calendar, quick-log buttons |
| `dashboard` | Stats, monthly chart, activity breakdown (in `v4-new-components.js`) |
| `program` | Full Year Program — grass-type-specific monthly maintenance schedule |
| `addActivity` | Activity logging form with dynamic fields per activity type |
| `history` | Chronological activity log |
| `equipment` | Equipment selector and maintenance tracker |
| `products` | Product guide / comparison |

---

## Development Workflow

Since there is no build step, development is direct file editing:

1. **Read the current file** before making any edits — always reference the latest version
2. Edit `index.html`, `grass-programs.js`, or `v4-new-components.js`
3. **Provide a preview** of the changed UI or describe what changed visually after every edit
4. Wait for owner approval before treating the change as final
5. Open `index.html` in a browser (or serve via any static file server) for local testing
6. Hard-refresh to pick up changes (Ctrl+Shift+R / Cmd+Shift+R)
7. Test at **mobile viewport first** (375px wide), then desktop

**No linter, formatter, or test runner is configured.** Testing is manual via browser.

### Serving Locally

Any static file server works. Examples:
```bash
python3 -m http.server 8080
npx serve .
```

---

## Important Constraints

- **Do not introduce a build step** (webpack, Vite, etc.) without explicit instruction — this is intentional
- **Do not add npm** or a `package.json` — the CDN approach is intentional for zero-dependency deployment
- **Do not use React Router** — view navigation is state-based
- **Mobile-first**: Design for 375px phone screens first. Important info is always visible; secondary info goes in accordions or "show more" patterns. Citation tooltips must use the fixed-center popup approach, not hover-based tooltips
- **Never remove content** without explicit owner approval — ask before deleting any feature, section, or data
- **GitHub Pages only**: No backends, no paid APIs, no server-side logic — the app must remain a free static site
- **All lawn care recommendations must cite sources** from `RESEARCH_SOURCES` — do not add uncited claims
- **Grass program data** is authoritative and based on university extension research — do not alter schedules without sourced justification
- **Suggest UX improvements** relevant to a DIY homeowner's workflow when opportunities arise

---

## Git Workflow

Branch naming follows the pattern: `claude/<description>-<id>`

Recent PRs show the pattern of one focused change per PR with a descriptive commit message. Commit messages use imperative present tense (e.g., "Fix citation tooltips on mobile", "Add citation system with source tooltips").

---

## Research Sources

All recommendations in the app cite one or more of 19 university extension services tracked in `RESEARCH_SOURCES`. When adding new lawn care content, source it from:
- Penn State Extension
- University of Georgia Extension
- Clemson Cooperative Extension
- NC State Extension
- University of Minnesota Extension
- Ohio State Extension
- Purdue Extension
- Virginia Cooperative Extension
- (and others listed in `RESEARCH_SOURCES` in `index.html`)
