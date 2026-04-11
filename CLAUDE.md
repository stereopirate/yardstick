# CLAUDE.md — Yardstick

This file provides context, conventions, and development guidance for AI assistants working on this codebase.

> **Quick reference:** See `PROJECT-OVERVIEW.md` for the full architecture reference and `yardstick-brand-book.md` for the complete design system. `WEBSITE-OVERVIEW.md` is a clean overview optimized for adding to a Claude project.

---

## Project Overview

**Yardstick** is a free, research-backed lawn care tracking Progressive Web App (PWA). It is client-side first — no backend, no build step, no npm. The app runs directly in the browser using CDN-loaded dependencies, with optional Firebase for cloud sync.

- **App name**: Yardstick
- **Live URL**: `https://yardstick.diy`
- **GitHub repo**: `stereopirate/yardstick`
- **Primary file**: `index.html` (~9,181 lines, contains all React app logic)
- **Theme color**: `#1D5C38` (forest dark green)
- **Primary CTA color**: `#C88E22` (Harvest Gold)
- **Target users**: DIY homeowners tracking lawn and landscape maintenance by grass type and USDA hardiness zone
- **Hosting**: GitHub Pages (free tier) — the app must remain statically hostable with zero server costs
- **Beta note**: `PRO_GATE_ENABLED` is a constant in `index.html` that gates certain features behind sign-in (not behind payment). All features are free for signed-in users.

> **Legacy names — never use:** "Easy Green", "Lawn Care Tracker", "Lawn Coach", "GrassCoach" — these are all discontinued working names. Always use "Yardstick".

---

## Project Rules (Owner Instructions)

These rules come directly from the project owner and **must be followed in every session**:

### 1. Keep It Simple and Free
- The app must remain hostable on **GitHub Pages for free** — no paid services, no databases, no server-side logic
- Firebase is the one exception — it is already integrated and is optional (local-only mode works without it)
- Avoid adding complexity that would require a build step, server, or paid CDN beyond existing free dependencies

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

Firebase is loaded as ES modules inside a `<script type="module">` block in `<head>`.

React JSX is transpiled in-browser by Babel Standalone via `<script type="text/babel">`.

### File Structure

```
yardstick/
├── index.html                  # Main app — ALL core logic (~9,181 lines)
│                               # Contains React components inline as <script type="text/babel">
│                               # blocks, plus Firebase init, CSS variables, and app shell
├── constants.js                # Shared global data loaded before any JSX scripts
│                               # PRODUCT_DATABASE, TREATMENT_PRODUCTS, GRASS_INFO,
│                               # ACTIVITY_TYPES, ACTIVITY_COLORS, ZONE_INFO,
│                               # RESEARCH_SOURCES, TREATMENT_CATEGORIES, WMO_CODES
├── grass-programs.js           # grassPrograms — monthly care schedules by grass type & zone
│                               # (~2,559 lines; university-sourced, do NOT change without citations)
├── v4-new-components.js        # Legacy reference file — active Dashboard is now inline in index.html
├── service-worker.js           # PWA offline caching (network-first for HTML, cache-first for assets)
├── manifest.json               # PWA manifest — name "Yardstick", theme #1D5C38
├── about.html                  # Static informational/marketing page
│
├── components/                 # Standalone component JS files (loaded via <script> tags after inline)
│   ├── ActivityDetails.js      # Renders logged activity detail fields
│   ├── Dashboard.js            # Stats, charts, breakdown (active version — loads last, wins)
│   ├── HistoryView.js          # Chronological activity log
│   ├── MyGarage.js             # Equipment manager — add/track/maintain
│   ├── ProductGuide.js         # Curated product database browser
│   ├── ResearchSourcesPage.js  # Lists all 19 university extension sources
│   └── SchedulesView.js        # Recurring task scheduler with due-date tracking
│
├── learn/                      # Static SEO content pages (lawn care guides)
├── marketing/                  # Marketing copy references (not served to users)
│
├── CLAUDE.md                   # This file — AI development guidance
├── PROJECT-OVERVIEW.md         # Full architecture reference (canonical)
├── WEBSITE-OVERVIEW.md         # Brand/product brief for Claude project context
├── yardstick-brand-book.md     # Complete visual and brand design system
│
└── [image assets]              # logo.png, logo.svg, coach-icon.png, coach-winter.png,
                                # activity-*.png, icon-*.png, yardstick-logo-*.svg
```

> **Important:** The primary, active code for most components lives **inline in `index.html`**. The `/components/` files are loaded after inline definitions and their `window.*` assignments overwrite the inline ones. When debugging or editing a component, check `index.html` first, then the `/components/` file.

### Script Loading Order

```
1. CDN scripts (synchronous): React, ReactDOM, Babel, Tailwind
2. <script type="module"> (async): Firebase ES modules → sets window.__FIREBASE__
3. <script> (synchronous): window.compressImage() utility
4. <script src="constants.js"> (synchronous): all global data constants
5. <script src="grass-programs.js"> (synchronous): grassPrograms global
6. <script type="text/babel"> blocks (inline): all React components
7. <script src="components/*.js" type="text/babel">: re-assigns window.Dashboard etc.
```

### Key Data Structures

| Constant | File | Purpose |
|---|---|---|
| `PRODUCT_DATABASE` | `constants.js` | 90+ mowers, spreaders, trimmers, fertilizers, seeds |
| `TREATMENT_PRODUCTS` | `constants.js` | Pre/post-emergent, fungicide, insecticide, soil amendments |
| `GRASS_INFO` | `constants.js` | Grass type metadata: mow height, water needs, soil pH, zone notes |
| `RESEARCH_SOURCES` | `constants.js` | 19 university extension services for citation badges |
| `ACTIVITY_TYPES` | `constants.js` | mowing, fertilizer, trimming, watering, seeding, aeration, maintenance, treatment |
| `ACTIVITY_COLORS` | `constants.js` | Hex colors per activity type |
| `ZONE_INFO` | `constants.js` | USDA zone metadata |
| `WMO_CODES` | `constants.js` | Weather condition code descriptions |
| `grassPrograms` | `grass-programs.js` | Monthly care schedules by grass type and zone |

---

## React Component Conventions

- **All components are functional** with React hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`)
- **No React Router** — navigation is a single `view` state variable (`null` = home)
- **No Context, Redux, or Zustand** — state lives in `LawnCareTracker` and is passed as props
- **No TypeScript** — plain JavaScript
- Components are defined inline inside `index.html`'s `<script type="text/babel">` blocks

### Citation System

A key UI pattern is the `CitationBadge` component — a small circular `i` button that opens a popup showing university extension sources for a given claim:

```jsx
<CitationBadge sources={[{ name: 'Penn State Extension', url: '...', topic: 'Tall Fescue' }]} label="mow height" />
```

The popup uses `position: fixed` centered on screen (not a portal) to ensure reliable mobile behavior. Do not replace this with tooltip/hover approaches — they do not work reliably on mobile.

### `useDataStore` Hook

Defined inline in `index.html`. Abstracts localStorage vs. Firestore. Used as `const store = useDataStore(currentUser)` in `LawnCareTracker`.

```js
store.loadAll()           // → { activities, equipment, profile }
store.saveActivity(a)     // → saved activity
store.deleteActivity(id)
store.saveEquipment(item)
store.deleteEquipment(id)
store.updateEquipment(id, updates)
store.saveProfile(profile)
```

---

## Styling Conventions

- **Tailwind CSS utility classes** for layout and spacing (padding, flex, gap, rounded)
- **Inline styles** for dynamic values or precise overrides
- **Custom CSS** in `<style>` block for animations and component-specific classes

> **Critical — background colors:** Always use `style={{background:'var(--cream)'}}` for card/content surfaces and `style={{background:'var(--bg)'}}` for page backgrounds. **Never** use Tailwind color utilities like `bg-white` or `bg-gray-50` for brand colors — Tailwind JIT has higher specificity than CSS variables and will silently override design tokens.

### Typography

> **v3.0 update:** Cabin and Courier Prime have been removed. The system is now two fonts only.

| Role | Font | Weights | CSS Variable |
|---|---|---|---|
| Display / headings | **Bitter** | 700, 900, 900 italic | `--ff-display` |
| Body / UI / buttons / data | **Nunito** | 400, 500, 600, 700, 800, 900 | `--ff-body` |

```html
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

```css
--ff-display: 'Bitter', Georgia, serif;
--ff-body:    'Nunito', sans-serif;
/* --ff-mono removed — use --ff-body for all data/labels/timestamps */
```

### Brand CSS Variables (`:root`)

```css
/* Primary colors */
--green-dark:   #1D5C38   /* header bg, logo on light */
--green:        #2E7A44   /* success states, log dots */
--green-light:  #4E9E40   /* hover/decorative only */
--gold:         #C88E22   /* primary CTA buttons, active nav (replaces --yellow) */
--gold-dark:    #A87018   /* gold hover state */
--gold-light:   #FDF4E0   /* badge fills, alert backgrounds */
--clay:         #C05A2C   /* warnings, overdue, destructive */
--clay-light:   #FAE8E0   /* clay-tinted backgrounds */

/* Surfaces */
--cream:        #F7F3EC   /* card surfaces */
--bg:           #EDE8DE   /* page background */
--white:        #FFFFFF   /* inputs, swatch panels */

/* Text */
--soil:         #1E1A14   /* primary text */
--stone:        #6B6560   /* secondary text */
--stone-light:  #B8B2AC   /* timestamps, disabled */
```

### Color Rules

- `#C88E22` (Harvest Gold / `--gold`) is **always** the primary CTA button color — not green
- Always use **dark text** (`#1E1A14`) on gold buttons, never white
- Old yellow `#F5C842` and `--straw` `#D4A843` are **retired** — do not use
- Use clay (`#C05A2C`) only for warnings and destructive states
- Card surfaces: `var(--cream)` | Page background: `var(--bg)`

### Activity Colors

| Activity | Color |
|---|---|
| Mowing | `#2E7A44` (green) |
| Fertilizer | `#F97316` (orange) |
| Trimming | `#10B981` (emerald) |
| Watering | `#3B82F6` (blue) |
| Seeding | `#92400E` (brown) |
| Aeration | `#8B5CF6` (purple) |
| Maintenance | `#6B7280` (gray) |

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

### LocalStorage (always used)

| Key | Contents |
|---|---|
| `lawnCareActivities` | `Activity[]` — all logged activities |
| `lawnCareEquipment` | `Equipment[]` — user's garage items |
| `lawnProfile` | `LawnProfile` — zone, grass, size, zip, lat/lon |
| `lawnCareSchedules` | `Schedule[]` — recurring tasks (local only, no cloud sync) |
| `yardstick_onboarding_done` | `'1'` — onboarding completed |
| `yardstick_save_banner_dismissed` | `'1'` — save-data banner dismissed |
| `yardstick_display_name` | string — user's display name |

### Firebase (optional cloud sync)

Firebase project: `lawn-tracker-71c43`

| Service | Purpose |
|---|---|
| Firebase Auth | Google OAuth + email/password sign-in |
| Firestore | Cloud storage for activities, equipment, profile |
| Firebase Storage | Activity photos (`photos/{uid}/{timestamp}.jpg`) |
| `gallery` collection | Community lawn photo feed |

Firestore structure:
```
users/{uid}/activities/{docId}
users/{uid}/equipment/{docId}
users/{uid}/profile/data
gallery/{docId}
```

**Init pattern:** Firebase loads async as ES modules → sets `window.__FIREBASE__` → dispatches `firebase-ready` event. The React app waits for this event before setting up auth state listener.

**Local-only behavior:** Photos (`photoUrl`) are stripped from activity objects when saving to localStorage — they require Firebase Storage.

---

## PWA / Service Worker

- Cache name: `yardstick-v6` (bump when updating CDN URLs or SW fetch strategy)
- **Fetch strategy**:
  - **HTML pages** (`index.html`, `/`) → **network-first**: always fetches fresh, falls back to cache when offline
  - **All other assets** (CDN scripts, images) → **cache-first**: serves from cache, falls back to network on miss
- No need to bump cache for `index.html` changes — network-first handles those automatically

---

## Views / Navigation

The app uses a `view` state variable (`null` = home). No URL routing.

| View | Description |
|---|---|
| `null` (home) | Coach mascot card, "This Week" tasks, activity calendar |
| `add` | Log Activity — dynamic form per activity type |
| `today` | Today view |
| `history` | Chronological activity log |
| `gallery` | Community lawn photo feed |
| `garage` | My Garage — equipment tracker and maintenance |
| `profile` | Lawn Profile — zone, grass type, yard size, soil type |
| `gameplan` | Year-Long Gameplan — monthly care schedule by grass/zone |
| `schedules` | Recurring task scheduler |
| `dashboard` | Stats, charts, activity breakdown |
| `products` | Curated product guide |
| `sources` | Research sources page |
| `calculator` | Treatment/product application calculator |
| `grass-id` | Grass identifier (photo-based) |
| `learn` | Learn Library — filtered lawn care article hub |
| `account` | Sign-in / account management |
| `pricing` | Pricing/plan info |
| `contact` | Contact form |
| `more` | More menu |
| `admin` | Admin submissions |
| `proSignup` | Pro sign-up |

**Bottom navigation:** 5-tab system — Home, Gameplan, Profile, More Menu, (Learn)

---

## Development Workflow

Since there is no build step, development is direct file editing:

1. **Read the current file** before making any edits — always reference the latest version
2. Edit `index.html`, `constants.js`, `grass-programs.js`, or files in `components/`
3. **Provide a preview** of the changed UI or describe what changed visually after every edit
4. Wait for owner approval before treating the change as final
5. Open `index.html` in a browser (or serve via any static file server) for local testing
6. Hard-refresh to pick up changes (Ctrl+Shift+R / Cmd+Shift+R)
7. Test at **mobile viewport first** (375px wide), then desktop

**No linter, formatter, or test runner is configured.** Testing is manual via browser.

### Serving Locally

```bash
python3 -m http.server 8080
# or
npx serve .
```

---

## Deployment

GitHub Pages is deployed via `.github/workflows/deploy.yml` on every push to `main`. The workflow is intentionally minimal — it checks out the repo and deploys the root directory as-is. There is no build step.

**Never add `npm`, `node`, or build commands to this workflow.** The project has no `dist/` folder. The workflow includes a sanity check (`test -f index.html`) that will fail fast if misconfigured.

---

## Important Constraints

- **No build step** (webpack, Vite, etc.) — this is intentional
- **No npm / package.json** — CDN approach is intentional for zero-dependency deployment
- **No React Router** — view navigation is state-based
- **Mobile-first**: Design for 375px phone screens first
- **CSS variables for brand colors** — never Tailwind color utilities for semantic colors
- **Never remove content** without explicit owner approval
- **GitHub Pages only** — no backends, no paid APIs, no server-side logic
- **All lawn care recommendations must cite sources** from `RESEARCH_SOURCES`
- **Grass program data is authoritative** — do not alter schedules without sourced justification
- **Suggest UX improvements** relevant to a DIY homeowner's workflow when opportunities arise

---

## Git Workflow

Branch naming: `claude/<description>-<id>`

Commit messages use imperative present tense (e.g., "Fix citation tooltips on mobile", "Add recurring schedules view").

---

## Research Sources

All recommendations in the app cite one or more of 19 university extension services in `RESEARCH_SOURCES` (defined in `constants.js`). When adding new lawn care content, source it from:
- Penn State Extension
- University of Georgia Extension
- Clemson Cooperative Extension
- NC State Extension
- University of Minnesota Extension
- Ohio State Extension
- Purdue Extension
- Virginia Cooperative Extension
- (and others listed in `RESEARCH_SOURCES` in `constants.js`)
