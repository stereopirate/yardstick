# Yardstick – Lawn Care Tracker: Project Overview

Use this document as context for all work on this project. It describes what the app is, how it is built, and the rules to follow when making changes.

> **Branding note:** The app's name is **Yardstick**. The `manifest.json` and some older marketing files still reference "Easy Green" — this is a legacy working name and should be treated as outdated. Use **Yardstick** in all new copy, UI text, and code.

---

## 1. What This App Is

**Yardstick** is a free, privacy-first lawn care companion web app. Users can:

- Log lawn care activities (mowing, fertilizing, watering, seeding, aeration, trimming, maintenance)
- Track equipment and get maintenance reminders
- View research-backed, zone-specific grass care programs
- Get real-time local weather and soil temperature context
- Schedule recurring tasks and see what is due
- Browse and compare 96+ lawn products
- Export their data or optionally sync to the cloud via Firebase

**Core philosophy:**
- No login required — all data lives in the browser by default
- Optional Firebase sync when the user chooses to sign in
- No ads, no tracking, no subscriptions
- Offline-capable PWA

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18.2 (loaded from CDN, no build step) |
| JSX transpilation | Babel 7.23.5 (in-browser) |
| Styling | Tailwind CSS (CDN) |
| Data persistence | `localStorage` (primary) |
| Cloud sync | Firebase 10.8.0 — Auth + Firestore (optional) |
| Weather data | Open-Meteo API (no API key, privacy-friendly) |
| Zone lookup | phzmapi.org ZIP-to-USDA-zone API |
| Offline support | Service Worker + Cache API |
| Deployment | Static file hosting (no server, no build pipeline) |

**There is no build step.** The app runs directly from `index.html` in any browser or static host (GitHub Pages, Netlify, etc.).

---

## 3. File Structure

```
Lawn-care-tracker/
├── index.html               # Entire React app (all core components inline, ~3,200+ lines)
├── constants.js             # Product DB, treatment types, activity types
├── grass-programs.js        # Month-by-month care programs per grass/zone
├── service-worker.js        # PWA offline caching
├── manifest.json            # PWA metadata (still shows "Easy Green" — needs update to Yardstick)
├── components/
│   ├── Dashboard.js         # Home screen — weather, stats, recent activity
│   ├── HistoryView.js       # Full activity log, color-coded timeline
│   ├── MyGarage.js          # Equipment inventory & maintenance tracking
│   ├── SchedulesView.js     # Recurring tasks with due-date indicators
│   ├── ProductGuide.js      # Browse & compare 96+ products
│   ├── ActivityDetails.js   # Shared activity detail display
│   └── ResearchSourcesPage.js # University extension links & citations
└── marketing/
    ├── FEATURES-REFERENCE.md
    └── MESSAGING-GUIDE.md
```

### Key architectural note

`index.html` is the main entry point and is very large (~3,200+ lines). It contains the root `LawnCareTracker` component and several inner components as inline `<script type="text/babel">` blocks. External component files in `/components/` are loaded via additional `<script>` tags in the same HTML file.

---

## 4. State & Data Models

### Top-level state (in `LawnCareTracker`)

| State key | Type | Description |
|---|---|---|
| `activities` | Array | All logged lawn care events |
| `equipment` | Array | User's equipment inventory |
| `schedules` | Array | Recurring task definitions |
| `lawnProfile` | Object | Yard size, grass type, USDA zone, location |
| `weather` | Object | Current conditions + 14-day forecast |
| `currentUser` | Object/null | Firebase Auth user if signed in |
| `view` | String/null | Currently active screen |

### Activity shape

```js
{
  id: timestamp,
  type: 'mowing' | 'fertilizer' | 'watering' | 'seeding' | 'aeration' | 'trimming' | 'maintenance' | 'treatment',
  date: ISO string,
  notes: string,
  cost: number,
  data: { /* type-specific fields */ },
  createdAt: ISO timestamp
}
```

### Equipment shape

```js
{
  id: timestamp,
  name: string,
  type: 'mowers' | 'spreaders' | 'trimmers',
  brand: string,
  details: string,
  deck: string,
  maintenanceSchedule: {
    oilChange: number | 'yearly',  // hours
    airFilter: number | 'yearly',
    sparkPlug: number,
    bladeService: number
  }
}
```

### Lawn profile shape

```js
{
  specificGrass: 'Tall Fescue' | 'Kentucky Bluegrass' | 'Bermudagrass' | etc.,
  zone: '4a' | '4b' | ... | '9b',
  lawnSize: number,   // square feet
  soilType: string,
  zipCode: string,
  lat: number,
  lon: number
}
```

### Schedule shape

```js
{
  id: string,
  name: string,
  type: activity type,
  frequencyDays: number,
  createdAt: timestamp,
  lastDone: timestamp   // optional
}
```

---

## 5. Data Persistence

### localStorage keys

```
lawnCareActivities    // activities array
lawnCareEquipment     // equipment array
lawnProfile           // profile object
lawnCareSchedules     // schedules array
yardstick_feedback    // feedback fallback (if Firebase unavailable)
```

### Firebase Firestore collections (when signed in)

```
users/{uid}/activities
users/{uid}/equipment
users/{uid}/profile
```

**Sync strategy:** localStorage is always read first. When a user signs in, data is merged with Firestore. The `useDataStore()` hook abstracts this.

---

## 6. External APIs

| API | Purpose | Auth |
|---|---|---|
| `api.open-meteo.com/v1/forecast` | Weather + 14-day forecast | None |
| `phzmapi.org` | ZIP → USDA zone + coordinates | None |
| Firebase Auth | Google OAuth + email/password | Firebase config |
| Firebase Firestore | Cloud data sync | Firebase config (authenticated) |

Soil temperature is estimated as `airTemp - 7°F` (not from an API).

---

## 7. Views / Screens

| View key | Screen name | Description |
|---|---|---|
| `null` | Dashboard | Home — weather, stats, recent activity |
| `'add'` | Add Activity | Form for logging any of 7 activity types |
| `'history'` | History | Full chronological activity log |
| `'garage'` | My Garage | Equipment list + maintenance alerts |
| `'schedules'` | My Yard | Lawn profile + recurring schedule tracker |
| `'products'` | Product Guide | Browse & compare 96+ products |
| `'research'` | Research Sources | 110+ university citations |
| `'settings'` | Settings & Help | Export data, reset, feedback form |

---

## 8. Product Database (constants.js)

- **75+ mower models** across Walk Behind, Riding, and Zero Turn categories
- **10 spreaders**
- **10 trimmers**
- **8 fertilizer products** (NPK ratios, coverage rates)
- **8 grass seed varieties**
- **25+ treatment products** across 6 categories: Fertilizers, Pre-Emergent, Post-Emergent, Fungicide, Insecticide, Soil Amendments

---

## 9. Grass Programs (grass-programs.js)

Research-backed, month-by-month care programs for:

- **Cool-season grasses:** Tall Fescue, Kentucky Bluegrass, Perennial Ryegrass
- **Warm-season grasses:** Bermudagrass, Zoysiagrass, St. Augustinegrass
- **USDA zones:** 4a–9b (16 zone profiles)

Each monthly entry includes: soil temp thresholds, fertilizer recommendations, task list, seasonal warnings.

---

## 10. PWA & Offline

- Theme color: `#367C2B`
- Service worker caches React, Babel, Tailwind (CDN), and core app files
- Cache strategy: network-first for dynamic content, cache-first for static assets
- Full offline functionality after first load
- `manifest.json` still shows "Easy Green" as the app name — this should be updated to "Yardstick" when rebranding is confirmed

---

## 11. Development Rules

Follow these rules whenever making changes to this project:

### Branding
- The app name is **Yardstick**. Do not use "Easy Green" or "Lawn Care Tracker" in new code, UI text, or copy.
- Brand color: `#367C2B` (deep green). Tailwind classes use `green-*` variants. Full green scale is exposed as `--ys-green-*` CSS custom properties (50–900).
- Voice: confident, grounded, practical — "like a trusted neighbor who happens to have a horticulture degree."

**Typography system (Phase 2):**

| Role | Font | Weights | Variable |
|---|---|---|---|
| Hero & headings (h1/h2/h3) | **Fraunces** | 400, 500, 600, 700 | `--ys-font-display` |
| Body, buttons, nav | **Quicksand** | 400, 500, 600, 700 | `--ys-font-body` |

- All `h1`, `h2`, `h3` elements automatically receive `font-family: var(--ys-font-display)` via a global CSS rule.
- All other text (body, buttons, inputs, labels) inherits `var(--ys-font-body)` via the `body, button, input, select, textarea` rule.
- To apply the display font to a non-heading element (e.g., a branded `<span>`), use `style={{fontFamily:'var(--ys-font-display)'}}`.
- **Do not hardcode font-family strings** — always use the CSS variables so a future font swap only requires changing two lines in `:root`.

### Architecture
- **Do not introduce a build step or bundler** (no Webpack, Vite, etc.) unless explicitly requested. The app deliberately runs without one.
- **Do not add npm dependencies** to the app itself — it uses CDN-loaded libraries only.
- New components should follow the existing pattern: either inline in `index.html` as a `<script type="text/babel">` block, or as a separate file in `/components/` loaded via a `<script>` tag.

### Code style
- Use React functional components with hooks (`useState`, `useEffect`, `useMemo`, `useRef`).
- Follow the Tailwind utility-class styling patterns already in use — do not add a separate CSS file unless necessary.
- Activity types, product lists, and treatment data belong in `constants.js`, not scattered inline.
- Zone and grass program logic belongs in `grass-programs.js`.

### Data & privacy
- Default behavior must never require login or send data off-device.
- Firebase usage is always opt-in (triggered by user sign-in).
- Do not add any analytics, tracking pixels, or third-party scripts.

### UI/UX
- The app is mobile-first. All new UI must be fully usable on small screens.
- Use the existing color system: green (`#367C2B`, Tailwind `green-*`) as primary, consistent type-color mapping for activity badges.
- Maintain the research citation pattern — if adding grass care advice, reference a university extension source.

### Testing & safety
- The app has no automated test suite. Manually verify all 8 views still load and function after changes.
- Be careful with `index.html` — it is large and contains JSX. Syntax errors will blank the entire page.
- Always check for nested template literal or JSX syntax errors before completing edits to `index.html`.

---

## 12. Working Efficiently with Claude

### Which file to reference for each task

| Task type | Start here |
|---|---|
| UI bug or layout issue | `index.html` (find the affected component by view name or state key) |
| Add or edit a product | `constants.js` |
| Add or edit a grass care program | `grass-programs.js` |
| Dashboard, weather, or stats | `components/Dashboard.js` |
| Activity log or history | `components/HistoryView.js` |
| Equipment or maintenance | `components/MyGarage.js` |
| Schedules or lawn profile | `components/SchedulesView.js` |
| Product guide or comparison | `components/ProductGuide.js` |
| Offline / PWA behavior | `service-worker.js` |
| App metadata or install name | `manifest.json` |

### How to write efficient prompts

**Be specific about the view or component:**
> "In the My Garage view (`MyGarage.js`), the maintenance alert doesn't show when hours exceed the threshold."

**Reference data models when relevant:**
> "When logging a Fertilizer activity, I want to add a `targetArea` field to the `data` object."

**State what should NOT change:**
> "Update the product card layout in `ProductGuide.js` but keep the comparison tool behavior the same."

**For `index.html` edits, name the section:**
> "Find the `AddActivityForm` component in `index.html` and add a cost field to the Aeration form."

### What to include when reporting a bug

1. Which screen/view it occurs on
2. What action triggers it
3. What you expected vs. what happened
4. Whether it affects data (activities, equipment, profile) or just display

### Common task patterns

**Add a new activity type:**
1. Add it to the `ACTIVITY_TYPES` constant in `constants.js`
2. Add a form section in the `AddActivityForm` component in `index.html`
3. Add a display case in `components/ActivityDetails.js`
4. Add a color and icon to `components/HistoryView.js`

**Add a new product to the database:**
- Edit `constants.js` — find the relevant array (`MOWERS`, `SPREADERS`, `TRIMMERS`, `FERTILIZERS`, `SEEDS`, or `TREATMENT_PRODUCTS`)

**Add a new grass care recommendation:**
- Edit `grass-programs.js` — find the correct grass type + zone combo and add or update the monthly entry

**Add a new screen/view:**
1. Add a new `view` string key to the `setView()` call pattern
2. Create the component in `/components/`
3. Add a `<script src="components/NewView.js" type="text/babel">` tag to `index.html`
4. Add routing in the main render return of `LawnCareTracker`

---

## 13. Glossary

| Term | Meaning |
|---|---|
| Yardstick | The app's brand name |
| Easy Green | Legacy working name — do not use in new work |
| Activity | A single logged lawn care event |
| USDA zone | Hardiness zone (4a–9b) used to determine regional care timing |
| Lawn profile | User's grass type, zone, yard size, and location |
| Schedule | A recurring task with a frequency (e.g., "Mow every 7 days") |
| My Garage | The equipment inventory section |
| My Yard | The schedules/profile section |
| useDataStore | Custom hook abstracting localStorage ↔ Firestore sync |
| LawnCareTracker | Root React component name (in `index.html`) |
| view | State string that controls which screen is rendered (`null` = Dashboard) |
