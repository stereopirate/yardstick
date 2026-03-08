# Yardstick — Project Architecture Overview

**Last updated:** March 2026
**Live URL:** `https://yardstick.diy`
**Repo:** `stereopirate/yardstick`
**Hosting:** GitHub Pages (static, free tier)

Use this document as the authoritative reference for all work on this project. It describes what the app is, how it is built, and the rules to follow when making changes.

---

## 1. What This App Is

**Yardstick** is a free, research-backed lawn care tracking Progressive Web App (PWA) for DIY homeowners. Users can:

- Log lawn care activities (mowing, fertilizing, watering, seeding, aeration, trimming, treatments, maintenance)
- Get personalized care programs by grass type and USDA hardiness zone
- Track local weather, soil temperature, and water budget
- Schedule recurring tasks and see what is overdue or coming up
- Track equipment and get maintenance reminders
- Browse and compare 90+ lawn products
- Share and view lawn progress photos in a community gallery
- Calculate exact product application amounts by yard size
- Optionally sync all data to the cloud via Firebase

**Core philosophy:**
- No login required for basic use — all data lives in the browser by default
- Optional Firebase sync when the user signs in
- All lawn care recommendations cite university extension research
- Offline-capable PWA after first load

**Branding note:** The app name is **Yardstick**. Older files may reference "Easy Green" (legacy working name) or "Lawn Care Tracker" — treat these as outdated. Use **Yardstick** everywhere in new copy and code.

**Beta status:** The app is in public beta. All features are free for signed-in users. `PRO_GATE_ENABLED` is a constant in `index.html` that gates certain features behind sign-in (not behind payment).

---

## 2. Fundamental Architecture Constraints

These are non-negotiable and must be respected in every change:

| Constraint | Detail |
|---|---|
| **No build step** | No webpack, Vite, Rollup, npm, or package.json. Zero. |
| **No backend** | All logic is client-side. Firebase is the only "server." |
| **Static hosting only** | Must deploy to GitHub Pages for free |
| **CDN dependencies** | React, ReactDOM, Babel, and Tailwind loaded from CDN at runtime |
| **JSX transpiled in-browser** | Babel Standalone runs in the browser via `<script type="text/babel">` |
| **Mobile-first** | Primary design target is 375px phone screens |
| **No analytics/tracking** | No third-party scripts beyond the listed CDNs and Firebase |

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| UI framework | React 18.2 (UMD build, from cdnjs) |
| JSX transpilation | Babel 7.23.5 Standalone (in-browser, from cdnjs) |
| Styling | Tailwind CSS (CDN JIT) + custom CSS variables |
| Data persistence | `localStorage` (primary, always used) |
| Cloud sync | Firebase 10.8.0 — Auth + Firestore + Storage (optional) |
| Weather data | Open-Meteo API (free, no API key, privacy-friendly) |
| Zone lookup | phzmapi.org — ZIP → USDA hardiness zone + coordinates |
| Photo storage | Firebase Storage (signed-in users only) |
| Offline support | Service Worker + Cache API |
| Deployment | Static files only — no server, no build pipeline |

---

## 4. File Structure

```
yardstick/
├── index.html                  # Main app — ALL core logic (~5,552 lines)
│                               #   Contains React components inline as <script type="text/babel">
│                               #   blocks, plus Firebase init, CSS variables, and app shell
├── constants.js                # Shared global data loaded before any JSX scripts (~498 lines)
│                               #   PRODUCT_DATABASE, TREATMENT_PRODUCTS, GRASS_INFO,
│                               #   ACTIVITY_TYPES, ACTIVITY_COLORS, ZONE_INFO,
│                               #   RESEARCH_SOURCES, TREATMENT_CATEGORIES, WMO_CODES
├── grass-programs.js           # grassPrograms — monthly care schedules by grass type & zone
│                               #   (~2,535 lines; university-sourced, do NOT change without citations)
├── v4-new-components.js        # Legacy Dashboard component (441 lines; kept for reference,
│                               #   the active Dashboard is now inline in index.html)
├── service-worker.js           # PWA offline caching, cache-first strategy (53 lines)
├── manifest.json               # PWA manifest — name, icons, theme color
├── firestore.rules             # Firestore security rules
├── firebase-messaging-sw.js    # Firebase Cloud Messaging service worker
├── about.html                  # Static informational/marketing page
│
├── components/                 # Standalone component JS files (loaded via <script> tags)
│   ├── ActivityDetails.js      # Renders logged activity detail fields (43 lines)
│   ├── Dashboard.js            # Stats, charts, breakdown (183 lines; superseded by
│   │                           #   inline version in index.html but still loaded)
│   ├── HistoryView.js          # Chronological activity log (57 lines; superseded by inline)
│   ├── MyGarage.js             # Equipment manager — add/track/maintain (239 lines)
│   ├── ProductGuide.js         # Curated product database browser (211 lines)
│   ├── ResearchSourcesPage.js  # Lists all 19 university extension sources (41 lines)
│   └── SchedulesView.js        # Recurring task scheduler with due-date tracking (207 lines)
│
├── learn/                      # Static SEO content pages
│   ├── index.html              # Learn hub listing page
│   ├── learn.css               # Styles for learn pages
│   └── *.md / *.html           # ~20 individual lawn care guide articles
│
├── marketing/                  # Marketing copy references (not served to users)
│   ├── FEATURES-REFERENCE.md
│   └── MESSAGING-GUIDE.md
│
├── CLAUDE.md                   # AI assistant rules for this project (may have outdated details)
├── DESIGN-SYSTEM.md            # Design token reference
├── PROJECT-OVERVIEW.md         # This file — canonical architecture reference
│
└── [image assets]              # logo.png, logo.svg, coach-icon.png, coach-winter.png,
                                # activity-*.png, icon-*.png, icon-*.svg,
                                # yardstick-logo-light.svg, yardstick-logo-light-tagline.svg
```

> **Important:** The primary, active code for most components lives **inline in `index.html`**, not in the `/components/` files. When debugging or editing a component, always check `index.html` first. The `/components/` files are loaded after the inline definitions and their `window.*` assignments will overwrite the inline ones — so both are active, but `components/Dashboard.js` is the one actually rendering (as it loads later and re-assigns `window.Dashboard`). This is a legacy artifact. For most components the inline `index.html` version is the final one.

---

## 5. Script Loading Order

Order matters — later scripts depend on globals set by earlier ones:

```
1. <head> CDN scripts (synchronous):
   react.production.min.js → window.React
   react-dom.production.min.js → window.ReactDOM
   babel.min.js → Babel transpiler
   tailwind CDN → Tailwind JIT

2. <head> inline <script type="module"> (async):
   → Loads Firebase ES modules
   → Sets window.__FIREBASE__ = { auth, db, storage, ...methods, configured: true }
   → Dispatches window event 'firebase-ready' when complete

3. <head> inline <script> (synchronous):
   → Defines window.compressImage() utility function

4. <body> <script src="constants.js"> (synchronous):
   → Sets globals: PRODUCT_DATABASE, TREATMENT_PRODUCTS, GRASS_INFO,
     ACTIVITY_TYPES, ACTIVITY_COLORS, ZONE_INFO, RESEARCH_SOURCES,
     TREATMENT_CATEGORIES, WMO_CODES

5. <body> <script src="grass-programs.js"> (synchronous):
   → Sets global: grassPrograms

6. <body> <script type="text/babel"> blocks (transpiled at runtime, in order):
   a. ActivityDetails component → window.ActivityDetails
   b. GalleryView component → window.GalleryView
   c. HistoryView (inline) → window.HistoryView
   d. Dashboard (inline) → window.Dashboard
   e. MyGarage (inline) → window.MyGarage
   f. [many more inline components...]
   g. Main App block: LawnCareTracker(), ReactDOM.createRoot('#root').render()

7. <body> <script src="components/*.js" type="text/babel"> blocks:
   → Re-assigns window.Dashboard, window.HistoryView, etc.
   → These final assignments are the active versions
```

---

## 6. CDN Dependencies

```html
<!-- React & ReactDOM (UMD builds) -->
https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js
https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js

<!-- Babel Standalone (in-browser JSX transpilation) -->
https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js

<!-- Tailwind CSS (CDN JIT mode) -->
https://cdn.tailwindcss.com

<!-- Google Fonts -->
Bitter (display/headings): weights 600, 700, 900
Cabin (body/UI text): weights 400, 500, 600, 700

<!-- Firebase (dynamic ES module imports inside <script type="module">) -->
https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js
https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js
https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js
https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js

<!-- Runtime API calls (not <script> tags) -->
https://phzmapi.org/{zip}.json           ← ZIP → USDA zone + lat/lon
https://api.open-meteo.com/v1/forecast   ← Weather, soil temp, ET0 (free, no key)
```

**Updating CDN versions:** If you update any CDN URL, bump `CACHE_NAME` in `service-worker.js` (e.g., `yardstick-v1` → `yardstick-v2`) to invalidate old offline caches.

---

## 7. Firebase Integration

Firebase is **optional** — the app runs fully in "local-only" mode when unconfigured or when the user is not signed in.

**Firebase project:** `lawn-tracker-71c43`

**Services used:**
| Service | Purpose |
|---|---|
| Firebase Auth | Google OAuth + email/password sign-in |
| Firestore | Cloud storage for user data |
| Firebase Storage | Activity photos (`photos/{uid}/{timestamp}.jpg`) |
| Firestore `gallery` collection | Community lawn photo feed |

**Init pattern:**
- Firebase loads asynchronously as ES modules inside `<script type="module">` in `<head>`
- On success, sets `window.__FIREBASE__ = { auth, db, storage, ...all methods, configured: true }`
- Dispatches `window.dispatchEvent(new Event('firebase-ready'))` when done
- React app waits for this event before setting up auth state listener
- This prevents the "refresh-logout bug" where Firebase not yet ready causes the app to think it's unconfigured

**Firestore data structure:**
```
users/{uid}/activities/{docId}   ← activity objects
users/{uid}/equipment/{docId}    ← equipment objects
users/{uid}/profile/data         ← single profile document
gallery/{docId}                  ← community photos (shared, all users)
```

---

## 8. `useDataStore` Hook

Defined inline in `index.html` (~line 1413). Abstracts localStorage vs. Firestore. Used as `const store = useDataStore(currentUser)` in `LawnCareTracker`.

```js
// Automatically routes to localStorage (no auth) or Firestore (signed in)
const store = useDataStore(currentUser);

store.loadAll()                          // → { activities, equipment, profile }
store.saveActivity(activity)             // → saved activity (with Firestore ID if cloud)
store.deleteActivity(id)
store.saveEquipment(item)               // → saved item
store.deleteEquipment(id)
store.updateEquipment(id, updates)      // merge update
store.saveProfile(profile)
```

**Local-only behavior:** Photos (`photoUrl`) are stripped from activity objects when saving to localStorage — they require a signed-in Firebase account and Storage.

---

## 9. Data Storage

### LocalStorage Keys

| Key | Contents |
|---|---|
| `lawnCareActivities` | `Activity[]` — all logged activities |
| `lawnCareEquipment` | `Equipment[]` — user's garage items |
| `lawnProfile` | `LawnProfile` — zone, grass, size, zip, lat/lon |
| `lawnCareSchedules` | `Schedule[]` — recurring tasks (localStorage only, no cloud sync) |
| `yardstick_onboarding_done` | `'1'` — onboarding splash completed |
| `yardstick_save_banner_dismissed` | `'1'` — "save your data" banner dismissed |
| `yardstick_display_name` | string — user's chosen display name |

### Data Schemas

**Activity:**
```js
{
  id: Date.now(),           // number (local) or Firestore doc ID string (cloud)
  type: 'mowing',           // see ACTIVITY_TYPES in constants.js
  date: 'YYYY-MM-DD',
  notes: '',
  cost: 12.50 | null,
  data: { /* type-specific fields from ACTIVITY_TYPES[type].fields */ },
  photoUrl: 'https://...',  // optional — cloud/signed-in users only
  createdAt: ISO8601
}
```

**LawnProfile:**
```js
{
  lawnSize: '5000',         // sq ft, string
  zone: '7a',               // USDA hardiness zone, lowercase string
  specificGrass: 'tall-fescue',  // kebab-case key matching grassPrograms
  soilType: 'clay',
  zipCode: '27601',
  lat: 35.77,               // from phzmapi.org
  lon: -78.63
}
```

**Equipment:**
```js
{
  id: Date.now(),
  name: 'Honda HRX217VKA',
  type: 'mowers',           // 'mowers' | 'spreaders' | 'trimmers'
  brand: 'Honda',
  details: 'Variable Speed, Versamow, GCV200',
  deck: '21"',
  maintenanceSchedule: { oilChange: 50, airFilter: 50, sparkPlug: 100 },
  maintenanceLogs: {
    oilChange: { loggedAt: timestamp, hoursAtLog: 12.5 }
  },
  createdAt: ISO8601
}
```

**Schedule:**
```js
{
  id: Date.now(),
  name: 'Weekly Mow',
  type: 'mowing',           // activity type key
  frequencyDays: 7,
  lastDone: 'YYYY-MM-DD' | null,
  createdAt: ISO8601
}
```

---

## 10. React Architecture

- **All components are functional** with hooks (`useState`, `useEffect`, `useRef`, `useCallback`, `useMemo`)
- **No React Router** — navigation is a single `view` state variable (`null` = home)
- **No Context, Redux, or Zustand** — state lives in `LawnCareTracker` and is passed as props
- **No TypeScript** — plain JavaScript

### Main App State (`LawnCareTracker`, ~line 4392 in `index.html`)

| State variable | Type | Purpose |
|---|---|---|
| `activities` | `Activity[]` | All logged activities |
| `view` | `string \| null` | Current screen (`null` = home) |
| `mobileMenuOpen` | `bool` | Hamburger menu open/closed |
| `selectedActivityType` | `string \| null` | Activity type chosen in log flow |
| `weather` | `object \| null` | Open-Meteo weather/soil data |
| `weatherLoading` | `bool` | Weather fetch in progress |
| `equipment` | `Equipment[]` | User's garage items |
| `schedules` | `Schedule[]` | Recurring tasks (localStorage only) |
| `lawnProfile` | `LawnProfile \| null` | Saved lawn profile |
| `profileFormData` | `LawnProfile` | Live editing form state |
| `profileEditing` | `bool` | Whether profile form is in edit mode |
| `zipLookupLoading` | `bool` | ZIP → zone lookup in progress |
| `zipLookupError` | `string` | ZIP lookup error message |
| `statsView` | `'year' \| 'season' \| 'all'` | Dashboard time filter |
| `onboardingDone` | `bool` | Onboarding splash card completed |
| `splashJustDone` | `bool` | Used to control post-onboarding animation |
| `saveBannerDismissed` | `bool` | "Save your data" banner dismissed |
| `currentUser` | `FirebaseUser \| null` | Firebase auth user |
| `authReady` | `bool` | Firebase auth state initialized |
| `showAuthModal` | `bool` | AuthModal overlay visible |
| `dataLoading` | `bool` | Initial data load in progress |
| `userName` | `string` | Display name (from localStorage) |

---

## 11. Views / Navigation

Navigation is purely state-driven. `setView('key')` switches screens. The header logo resets to home (`setView(null)`).

**`PRO_GATE_ENABLED`** — constant in `index.html`. When true, certain views show `<ProFeatureNotice>` instead of the component if `!currentUser`. Currently in beta — all features free for signed-in users.

| `view` value | Screen | Pro-gated? |
|---|---|---|
| `null` | Home — weather card, welcome splash, quick-log grid | No |
| `'add'` | Log Activity — ActivitySelector → ActivityForm | No |
| `'history'` | Activity History — chronological log | No |
| `'dashboard'` | Dashboard — stats, charts, water budget | Yes (requires sign-in) |
| `'gameplan'` | Full Year Lawn Program — monthly care schedule | Yes (requires sign-in) |
| `'schedules'` | My Tasks — recurring schedule tracker | No |
| `'garage'` | My Garage — equipment add/track/maintain | No |
| `'profile'` | My Yard — lawn profile setup form | No |
| `'products'` | Product Guide — curated database browser | Yes (requires sign-in) |
| `'calculator'` | Treatment Calculator — product quantity tool | Yes (requires sign-in) |
| `'gallery'` | Lawn Gallery — community photos | Requires Firebase sign-in |
| `'account'` | Account — sign in/out, data management | No |
| `'sources'` | Research Sources — 19 university extension links | No |
| `'contact'` | Contact — feedback form | No |
| `'pricing'` | Pricing — beta/pro tier overview | No |
| `'proSignup'` | Pro Waitlist — early access sign-up form | No |
| `'admin'` | Admin — internal feedback submissions review | No (guards with admin UID check) |

---

## 12. Key Components

### Components defined inline in `index.html`

**`LawnCareTracker`** (~line 4392)
Root component. Manages all state, the `useDataStore` hook, auth listener, weather fetching, and the full view router.

**`useDataStore(currentUser)`** (~line 1413)
Custom hook returning `{ loadAll, saveActivity, deleteActivity, saveEquipment, deleteEquipment, updateEquipment, saveProfile }`. Automatically routes to localStorage or Firestore.

**`WelcomeSplashCard`**
3-step onboarding: (1) ZIP entry + feature overview, (2) grass type selection, (3) account CTA. Shown to logged-out users who haven't completed setup.

**`ActivitySelector`**
Grid of activity type buttons. Leads to `ActivityForm`.

**`ActivityForm`**
Dynamic form where fields change based on `selectedActivityType`. Handles photo capture (camera or file), client-side image compression, optional "Share to gallery" checkbox (signed-in only), cost, notes, and date.

**`ActivityDetails`**
Renders the typed detail fields of a single activity. Used in HistoryView and Dashboard recent list.

**`GalleryView`** (~line 378)
Community photo feed from Firestore `gallery` collection. Grid layout with lightbox. Requires Firebase auth. Shows "Filter by mine" toggle.

**`HistoryView`** (active version is in `/components/HistoryView.js`)
Chronological list of all activities. Each row is tap-to-expand with `ActivityDetails`. Supports photo thumbnails and inline delete.

**`Dashboard`** (active version is in `/components/Dashboard.js`)
Summary stat cards (total, mows, feeds, hours), water budget panel (rainfall + irrigation vs. ET0 target from weather), activity breakdown horizontal bar chart, 6-month trend bar chart, 3 most recent activities.

**`MyGarage`** (active version is in `/components/MyGarage.js`)
Equipment add form (type → sub-type → product dropdown from `PRODUCT_DATABASE`). Equipment list with maintenance schedule tracking — computes estimated mower hours from logged mowing activities.

**`SchedulesView`** (from `/components/SchedulesView.js`)
Recurring task manager. Groups tasks into Overdue / Due Today / Coming Up (14 days) / Later. "Log It" button creates an activity entry and resets the countdown.

**`LawnProfile`**
Profile editing form — ZIP code (auto-lookup to USDA zone + coordinates via phzmapi.org), grass type, lawn size sq ft, soil type. Triggers `fetchWeatherData` on successful ZIP lookup.

**`YearlyGameplan`**
Month-by-month care program rendered from `grassPrograms` data, filtered to the user's grass type and zone. Uses `CitationBadge` for research-sourced claims. Displays soil temp thresholds, task lists, and seasonal warnings.

**`ProductGuide`** (from `/components/ProductGuide.js`)
Browseable database of mowers, spreaders, trimmers, fertilizers, and seeds. Comparison and filter functionality.

**`TreatmentCalculator`**
Calculates product amounts needed based on `TREATMENT_PRODUCTS` data (category → product → yard size). Supports custom label-rate entry for products without a known rate. Pre-fills yard size from `lawnProfile`.

**`AuthModal`**
Email/password + Google sign-in modal overlay. Handles sign-up, sign-in, and error display.

**`CitationBadge`**
Small `ⓘ` button that opens a **fixed-position popup** (not a hover tooltip) showing university extension sources. **Always use fixed-center popup** — hover tooltips are non-functional on mobile.

**`AccountPage`**
Sign in / sign out, display name editing, data export, account management.

**`ContactPage`**
Feedback form that submits to Firebase Firestore. Falls back to `mailto:` link if Firebase unavailable.

**`PricingView`**
Beta/pro tier overview. Shows "Always Free" features and "Beta — free with account" pro features.

**`ProSignupView`**
Pro early-access waitlist form using Firestore to store interest signups.

**`AdminSubmissionsPage`**
Internal admin view for reading feedback submissions from Firestore. Only useful if `currentUser.uid` matches admin UIDs in the app.

---

## 13. Key Data Constants (`constants.js`)

All declared with `var` for global scope accessibility:

| Constant | Contents |
|---|---|
| `PRODUCT_DATABASE` | `{ mowers: [...], spreaders: [...], trimmers: [...] }` — 75+ products with maintenance schedules |
| `TREATMENT_PRODUCTS` | `{ pre_emergent: [...], post_emergent: [...], fungicide: [...], insecticide: [...], soil_amendment: [...] }` — 5 products each with application rates |
| `TREATMENT_CATEGORIES` | `{ pre_emergent, post_emergent, fungicide, insecticide, soil_amendment }` — icon and label for each |
| `GRASS_INFO` | Per grass type: `name`, `mowHeight`, `waterNeeds`, `soilPH`, `zones`, `notes`, `sources` |
| `ACTIVITY_TYPES` | `{ mowing, fertilizer, trimming, watering, seeding, aeration, treatment, maintenance }` — each has `name`, `icon`, `color`, `fields[]` |
| `ACTIVITY_COLORS` | Per activity type: `hex` (color string), `border` (Tailwind class), `text` (Tailwind class) |
| `ZONE_INFO` | USDA hardiness zones with descriptions and season guidance |
| `RESEARCH_SOURCES` | 19 university extension services — name + URL for `CitationBadge` |
| `WMO_CODES` | Open-Meteo weather condition codes → `{ label, icon }` |

**Product ID prefixes (for `PRODUCT_DATABASE`):**
- `wb1–wb25` Walk-behind mowers
- `rd1–rd25` Riding mowers
- `zt1–zt25` Zero-turn mowers
- `sp1–sp10` Spreaders
- `t1–t10` Trimmers
- `m-other`, `sp-other`, `t-other` — custom entry placeholders

**Grass type keys (for `GRASS_INFO` and `grassPrograms`):**
- Cool-season: `tall-fescue`, `kentucky-bluegrass`, `perennial-ryegrass`, `fine-fescue`
- Warm-season: `bermuda`, `zoysia`, `st-augustine`, `centipede`, `bahia`, `buffalograss`

---

## 14. `grassPrograms` Data (`grass-programs.js`)

Structure:
```js
var grassPrograms = {
  'tall-fescue': {
    '7a': [   // USDA zone string
      {        // 12 monthly entries per grass/zone pair
        month: 'January',
        tasks: ['...', '...'],
        notes: '...',
        soilTempMin: 32,
        soilTempMax: 50,
        sources: [{ name: 'NC State Extension', url: 'https://...' }]
      }
    ]
  }
}
```

**Do not modify schedules without university extension citations.** These are the core research-backed data of the entire product.

---

## 15. Weather Integration

**Source:** Open-Meteo API — free, no API key, no privacy issues.

**Request:**
```
https://api.open-meteo.com/v1/forecast
  ?latitude={lat}&longitude={lon}
  &current=temperature_2m,relative_humidity_2m,apparent_temperature,
           precipitation,weathercode,windspeed_10m,winddirection_10m
  &hourly=soil_temperature_6cm
  &daily=temperature_2m_max,temperature_2m_min,precipitation_sum,
         precipitation_probability_max,uv_index_max,et0_fao_evapotranspiration
  &temperature_unit=fahrenheit&precipitation_unit=inch&windspeed_unit=mph
  &timezone=auto&past_days=7&forecast_days=14
```

**`weather` state object:**
```js
{
  temperature,          // current °F
  feelsLike,            // apparent temp °F
  humidity,             // %
  windSpeed,            // mph
  windDirection,        // 'N' | 'NE' | etc.
  soilTemp,             // °F — from Open-Meteo 6cm hourly data (falls back to airTemp - 7)
  highTemp, lowTemp,    // today's forecast
  rainfall,             // past 7 days total precip inches
  precipitation,        // current precip inches
  precipProbability,    // today's rain probability %
  uvIndex,              // today's max UV
  conditionLabel,       // e.g. 'Partly Cloudy'
  conditionIcon,        // emoji from WMO_CODES
  location,             // 'Zip 27601'
  forecastDays,         // 14-day array: { date, high, low, precip, precipProb }
  rainNext24h,
  rainNext48h,
  rainNext72h,
  frostRiskDays,        // days until next <32°F low (null if none in 14-day window)
  soilTempTrend,        // 'warming' | 'cooling' | 'stable' (7-day delta)
  pastAvgSoilTemp,
  futureAvgSoilTemp,
  et0Past7,             // inches of evapotranspiration past 7 days (for water budget)
}
```

**Water budget (Dashboard):** `et0Past7` is compared against `loggedIrrigThisWeek + rainfall` to show users whether their lawn's water needs are met.

---

## 16. Photo Handling

`window.compressImage(file, maxDim, quality)` — defined as a plain `<script>` in `<head>`:
- Resizes to max 1200px on longest side
- Re-encodes as JPEG at 0.82 quality using Canvas API
- Returns a `Blob` ready for Firebase Storage upload
- Runs entirely client-side, no server involved

Upload path: `photos/{uid}/{Date.now()}.jpg`

Community gallery share: when "Share to gallery" is checked on `ActivityForm`, a doc is written to the Firestore `gallery` collection with `photoUrl`, `userId`, `userName`, `activityType`, `caption`, `date`, `grassType`, `zone`, `lawnSize`, `createdAt`.

---

## 17. PWA / Service Worker

**Cache name:** `yardstick-v1` (bump to `yardstick-v2` etc. when CDN URLs change)
**Strategy:** Cache-first with network fallback
**Caches:** `/`, `/index.html`, `/manifest.json`, React CDN, ReactDOM CDN, Babel CDN, Tailwind CDN

---

## 18. Navigation Layout

### Mobile (< 768px)
- Sticky dark-green header: logo on left, hamburger on right
- Hamburger opens a slide-down overlay menu with all navigation links
- **Floating Action Button (FAB)** — fixed bottom-right, green pill, always visible except on the log-activity screen, opens `setView('add')`
- No sidebar

### Desktop (≥ 768px)
- Sticky dark-green header with logo + inline nav links in the header
- **Left sidebar** (`ys-sidebar` class) — 224px wide (256px at 1024px+), sticky, full-height, scrollable, white background
- Contains all navigation items as `ys-sidebar-item` buttons
- Active item gets `ys-sidebar-active` class
- Content area constrained to `max-w-5xl mx-auto` with `px-4` padding

---

## 19. Design System

### Fonts

**Always check `index.html` `<head>` for what fonts are actually loaded** — the CLAUDE.md references older fonts (Fraunces/Quicksand) but the live code has changed.

| Role | Font | CSS Variable |
|---|---|---|
| Headings (h1, h2, h3) + display text | **Bitter** (serif) | `--ys-font-display` |
| Body, buttons, nav, inputs, labels | **Cabin** (sans-serif) | `--ys-font-body` |

Global rules:
```css
h1, h2, h3 { font-family: var(--ys-font-display); }
body, button, input, select, textarea { font-family: var(--ys-font-body); }
```

To apply display font to a non-heading element: `style={{fontFamily:'var(--ys-font-display)'}}`

### Brand CSS Variables (defined in `<style>` block in `<body>`)

```css
/* Green scale */
--ys-green-900: #1C3318
--ys-green-800: #1E4D18   ← header background
--ys-green-700: #2D6627
--ys-green-600: #367C2B   ← primary CTAs, active sidebar, borders
--ys-green-500: #4E9E40
--ys-green-400: #6BBF5A
--ys-green-200: #C4E8BC
--ys-green-100: #EBF5E6   ← icon backgrounds, badge fills, active sidebar bg
--ys-green-50:  #F4FAF2   ← hover states

/* Yellow — CTA button color */
--ys-yellow:      #F5C842
--ys-yellow-dark: #E8BA2A

/* Gold — PRO badge, pricing highlights */
--ys-gold-500: #D4A843
--ys-gold-400: #D4A833
--ys-gold-300: #E2C46A
--ys-gold-100: #FDF3D8

/* Soil / warm neutral — dark text, soil metaphor */
--ys-soil-800: #1E1A14   ← text on yellow buttons
--ys-soil-600: #6B6560
--ys-soil-400: #9C7248
--ys-soil-200: #D4B896

/* Canvas — warm off-white backgrounds */
--ys-cream:  #F7F3EC
--ys-canvas: #EDE8DE     ← app body background color
```

### Activity Colors (from `ACTIVITY_COLORS` in `constants.js`)

| Activity | Hex | Tailwind border class | Tailwind text class |
|---|---|---|---|
| mowing | `#367C2B` | `border-green-600` | `text-green-700` |
| fertilizer | `#F97316` | `border-orange-500` | `text-orange-600` |
| trimming | `#10B981` | `border-emerald-500` | `text-emerald-600` |
| watering | `#3B82F6` | `border-blue-500` | `text-blue-600` |
| seeding | `#92400E` | `border-yellow-800` | `text-yellow-900` |
| aeration | `#8B5CF6` | `border-purple-500` | `text-purple-600` |
| treatment | `#06B6D4` | `border-cyan-500` | `text-cyan-600` |
| maintenance | `#6B7280` | `border-gray-500` | `text-gray-600` |

### Key CSS Classes (from `<style>` block in `<body>`)

| Class | Purpose |
|---|---|
| `.ys-btn-primary` | Yellow CTA button (`--ys-yellow` bg, `--ys-soil-800` text) |
| `.ys-card` | White rounded card with subtle shadow |
| `.ys-coach-card` | Dark-green gradient hero card (home screen) |
| `.ys-badge-white` | Semi-transparent white pill (on dark backgrounds) |
| `.ys-badge-green` | Light-green pill (on white backgrounds) |
| `.ys-sidebar` | Desktop sticky left navigation sidebar |
| `.ys-sidebar-item` | Individual sidebar nav button |
| `.ys-sidebar-active` | Active sidebar item highlight |
| `.ys-sidebar-section-label` | Section header label in sidebar |
| `.ys-fab` | Mobile floating action button styles |
| `.cloud-badge` | Green pill — data synced to cloud |
| `.local-badge` | Gray pill — local-only mode |
| `.cite-btn` | Citation `ⓘ` button |
| `.cite-popup` | **Fixed-center** citation popup (never use hover tooltips) |
| `.cite-overlay` | Transparent overlay to close cite popup on tap |
| `.animate-fade-in` | Fade + slide up (0.3s) |
| `.animate-scale-in` | Scale from 0.95 (0.25s) |
| `.card-hover` | Scale effect on `:active` |
| `.btn-press` | Scale + opacity on `:active` |
| `.menu-slide` | Fade + slide animation (0.2s) |

---

## 20. Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Variables / functions | `camelCase` | `addActivity`, `lawnProfile` |
| Constants / databases | `UPPER_SNAKE_CASE` | `PRODUCT_DATABASE`, `ACTIVITY_TYPES` |
| Grass type keys | `kebab-case` | `tall-fescue`, `kentucky-bluegrass` |
| USDA zone keys | lowercase + letter | `'7a'`, `'6b'` |
| Product IDs | category prefix + number | `wb1`, `rd12`, `sp3` |
| View keys | lowercase string | `'dashboard'`, `'gameplan'`, `'garage'` |
| CSS variables | `--ys-*` prefix | `--ys-green-600`, `--ys-canvas` |

---

## 21. Development Workflow

**No build step. No linter. No automated tests.** All testing is manual in the browser.

1. **Always read the current file before editing** — never rely on memory from earlier in a conversation
2. Edit `index.html` for most changes; `constants.js` for data; `grass-programs.js` for care schedules
3. Test at **375px mobile width first**, then desktop
4. Hard-refresh after changes: `Ctrl+Shift+R` / `Cmd+Shift+R`

**Local dev server:**
```bash
python3 -m http.server 8080
# or: npx serve .
```

**Git branch pattern:** `claude/<description>-<id>`

---

## 22. Working Efficiently — Which File for Each Task

| Task | File to edit |
|---|---|
| UI bug or layout issue | `index.html` — find component by view key or function name |
| Add or edit a product | `constants.js` — find the relevant array |
| Add or edit a grass care program | `grass-programs.js` — find grass type + zone |
| Activity history, expandable log | `components/HistoryView.js` |
| Dashboard stats, charts, water budget | `components/Dashboard.js` |
| Equipment manager | `components/MyGarage.js` |
| Recurring schedule tracker | `components/SchedulesView.js` |
| Product database browser | `components/ProductGuide.js` |
| Research sources list | `components/ResearchSourcesPage.js` |
| Offline caching behavior | `service-worker.js` |
| App install name / icons | `manifest.json` |
| Firebase security rules | `firestore.rules` |

---

## 23. Rules — Must Follow in Every Session

1. **Never remove content** without explicit owner approval — ask before deleting any feature, section, or data
2. **Never add a build step**, package.json, bundler, or npm dependency
3. **Never add uncited lawn care claims** — all recommendations must cite `RESEARCH_SOURCES`
4. **Never add analytics, tracking pixels, or third-party scripts** beyond those already present
5. **Always read the current file** before editing — never rely on conversation memory
6. **Always provide a preview** (description of visual change) after any UI modification
7. **Do not alter `grassPrograms` schedules** without sourced university extension justification
8. **Mobile-first** — design for 375px first; secondary info goes behind accordions/collapsibles
9. **Be careful with `index.html`** — it is large and JSX. Syntax errors blank the entire page.

---

## 24. Common Task Patterns

**Add a new activity type:**
1. Add to `ACTIVITY_TYPES` and `ACTIVITY_COLORS` in `constants.js`
2. Add form fields section in `ActivityForm` in `index.html`
3. Update `ActivityDetails` in `components/ActivityDetails.js`

**Add a new product to the database:**
- Edit `constants.js` — find the relevant array in `PRODUCT_DATABASE`

**Add a new grass care recommendation:**
- Edit `grass-programs.js` — find the grass type + zone entry and update the monthly object

**Add a new screen/view:**
1. Create the component function in `index.html` (inline) or a new file in `/components/`
2. If separate file, add `<script src="components/NewView.js" type="text/babel">` tag to `index.html`
3. Add the `view === 'newkey'` render case to the view router in `LawnCareTracker`'s return
4. Add a navigation item to the sidebar and mobile menu

**Change the primary CTA button style:**
- Edit `.ys-btn-primary` in the `<style>` block in `index.html`

**Add a research citation:**
- Add source to `RESEARCH_SOURCES` in `constants.js`
- Use `<CitationBadge sources={[...]} label="..." />` at the relevant claim

---

## 25. External Services Summary

| Service | Purpose | Free? | Key needed? |
|---|---|---|---|
| GitHub Pages | Static hosting | Yes | No |
| Firebase Auth | User sign-in (Google + email) | Free tier | Yes (in `index.html`) |
| Firestore | Cloud data sync | Free tier | Yes (in `index.html`) |
| Firebase Storage | Activity photo storage | Free tier | Yes (in `index.html`) |
| Open-Meteo API | Weather, soil temp, ET0 data | Unlimited free | No |
| phzmapi.org | ZIP code → USDA zone + lat/lon | Free | No |
| Google Fonts | Bitter + Cabin fonts | Free | No |
| cdnjs.cloudflare.com | React, ReactDOM, Babel | Free | No |
| cdn.tailwindcss.com | Tailwind CSS | Free | No |

---

## 26. Glossary

| Term | Meaning |
|---|---|
| Yardstick | The app's brand name |
| Easy Green | Legacy working name — do not use |
| Activity | A single logged lawn care event |
| USDA zone | Hardiness zone string like `'7a'` used for regional care timing |
| Lawn profile | User's grass type, zone, yard size, ZIP, and coordinates |
| Schedule | A recurring task with a frequency in days |
| My Garage | The equipment inventory and maintenance tracking section |
| My Yard / Profile | The lawn profile setup section |
| Full Year Program / Gameplan | The month-by-month grass care schedule view |
| `useDataStore` | Custom hook abstracting localStorage ↔ Firestore CRUD |
| `LawnCareTracker` | Root React component (in `index.html`) |
| `view` | State string controlling which screen renders (`null` = home) |
| `PRO_GATE_ENABLED` | Constant — gates certain views behind sign-in |
| `window.__FIREBASE__` | Global set by Firebase init module; `configured: false` in local mode |
| `grassPrograms` | Global data structure from `grass-programs.js` |
| `CitationBadge` | Inline `ⓘ` button component opening a fixed-position source popup |
| ET0 | Evapotranspiration — used for water budget calculations in Dashboard |
| WMO codes | Open-Meteo weather condition integers mapped to labels + emoji in `WMO_CODES` |
