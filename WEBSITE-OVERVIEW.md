# Yardstick — Website & Brand Overview

**For use as context in Claude projects and chat sessions.**

---

## What Is Yardstick?

**Yardstick** is a free, research-backed lawn care tracking Progressive Web App (PWA) for DIY homeowners. Every recommendation cites university extension research — not fertilizer brands.

- **Live URL:** `https://yardstick.diy`
- **GitHub repo:** `stereopirate/yardstick`
- **Tagline:** *Lawn care backed by science. Built for your yard.*
- **Short description:** Research-backed lawn care for DIYers. Free account. Personalized to your yard, grounded in science.
- **Status:** Public beta — all features free for signed-in users

### What users can do

- Log lawn care activities (mowing, fertilizing, watering, seeding, aeration, trimming, treatments, maintenance)
- Get a personalized year-long care program by grass type and USDA hardiness zone
- Track local weather, soil temperature, and water budget (Open-Meteo API, no key required)
- Schedule recurring tasks and see what is overdue or coming up
- Track equipment and maintenance reminders
- Browse and compare 90+ lawn products
- Share and view lawn progress photos in a community gallery
- Calculate exact product application amounts by yard size
- Optionally sync all data to the cloud via Firebase (free sign-in)

### Core philosophy

- No login required for basic use — all data lives in the browser by default
- Optional Firebase cloud sync when the user signs in
- All lawn care recommendations cite university extension research
- Offline-capable PWA after first load
- Free to use and free to host (GitHub Pages)

---

## Brand Identity

### Personality

| Keyword | Meaning |
|---|---|
| **Field Manual** | Dense with useful info. Built to be referenced, not just read once. |
| **Worn Clipboard** | Tactile, earned character. Trusted through use. |
| **Trusted Authority** | University-sourced guidance. Confident without being preachy. |
| **No Fluff** | Every word earns its place. No filler, no hype, no product pushing. |

**Brand voice in one sentence:** *"Like a trusted neighbor who happens to have a horticulture degree."*

### Voice — Use & Avoid

**Use:** dialed in · by the numbers · your zone · prime window · research-backed · university-sourced · grounded in science · personalized · soil temp · extension-verified

**Avoid:** amazing · revolutionary · seamless · leverage · game-changer · smart AI · unlock · supercharge · effortless · next-level

### Legacy Names (Never Use)
- "Easy Green" — legacy name, discontinued
- "Lawn Care Tracker" — legacy name, discontinued
- "Lawn Coach" — legacy name, discontinued
- "GrassCoach" — legacy name, discontinued

---

## Typography

Three fonts. Three distinct roles. Never swap or add a fourth.

| Role | Font | Weights | Use For |
|---|---|---|---|
| **Display** | Bitter | 700, 900, 900 italic | Headlines, logo wordmark, section headers |
| **Body / UI** | Cabin | 400, 500, 600, 700 | All UI copy, buttons, labels, navigation |
| **Data / Mono** | Courier Prime | 400, 700 | Data readouts, stats, zone/grass labels, timestamps |

```css
--ff-display: 'Bitter', Georgia, serif;
--ff-body:    'Cabin', sans-serif;
--ff-mono:    'Courier Prime', monospace;
```

---

## Color Palette

**Theme name:** Field & Soil · Parchment

### Primary Colors

| Name | Hex | Role |
|---|---|---|
| Forest Dark | `#1E4D18` | App header bg, logo fill on light surfaces |
| Turf Green | `#367C2B` | Success states, log dots, secondary interactive |
| Spring | `#4E9E40` | Hover accent, decorative gradients only |
| **Bright Yellow** | `#F5C842` | **Primary CTA buttons**, active nav, ruler underline |
| Warm Straw | `#D4A843` | Fertilizer badge borders, tip alert borders only |
| Brick Clay | `#C05A2C` | Warnings, overdue states, destructive actions only |

### Surface Colors

| Name | Hex | CSS Variable | Role |
|---|---|---|---|
| Parchment | `#F7F3EC` | `--cream` | Card surfaces, coach card body |
| Canvas | `#EDE8DE` | `--bg` | App body / page background |
| White | `#FFFFFF` | `--white` | Select inputs, swatch panels |

### Text Colors

| Name | Hex | CSS Variable | Role |
|---|---|---|---|
| Rich Soil | `#1E1A14` | `--soil` | Primary text, button text on yellow |
| Fieldstone | `#6B6560` | `--stone` | Secondary text, card body copy |
| Stone Light | `#B8B2AC` | `--stone-light` | Timestamps, citations, disabled states |

### Color Rules
- Yellow (`#F5C842`) is **always** the primary CTA color — never use green for primary buttons
- Always use **dark text** (`#1E1A14`) on yellow buttons — never white
- Use clay only for warnings and destructive/overdue states
- Use `var(--cream)` / `var(--bg)` for surfaces — never Tailwind's `bg-white` or `bg-gray-*`

### Activity Colors (for log dots and icons)

| Activity | Color |
|---|---|
| Mowing | `#367C2B` (turf green) |
| Fertilizer | `#F97316` (orange) |
| Trimming | `#10B981` (emerald) |
| Watering | `#3B82F6` (blue) |
| Seeding | `#92400E` (brown) |
| Aeration | `#8B5CF6` (purple) |
| Maintenance | `#6B7280` (gray) |

---

## Logo & Wordmark

The Yardstick logo is an SVG wordmark: **Bitter 900** text with a **yellow ruler underline** (`#F5C842`) and tick marks. The ruler is not decorative — it directly references the brand name.

### Wordmark Variants

| Variant | Text Fill | Background |
|---|---|---|
| Light / Parchment | `#1E4D18` | `#F7F3EC` or `#EDE8DE` |
| On Forest Green | `#F7F3EC` | `#1E4D18` |
| On Turf Green | `#F7F3EC` | `#367C2B` |

### Logo Rules
- Always include the ruler underline — it is not optional
- Use SVG only, never a rasterized PNG for the wordmark
- Never use the YS badge icon in the main app header (icons/favicon only)

---

## App Screens / Views

Navigation is state-based — no URL routing. A `view` state variable controls which screen is shown.

| View | Description |
|---|---|
| Home (`null`) | Coach mascot card, "This Week" task list, activity calendar |
| `add` | Log Activity — dynamic form per activity type |
| `today` | Today's tasks and soil temperature |
| `history` | Chronological activity log |
| `gallery` | Community lawn photo feed |
| `garage` | My Garage — equipment tracker and maintenance reminders |
| `profile` | Lawn Profile — zone, grass type, yard size, soil type |
| `gameplan` | Year-Long Gameplan — monthly care schedule by grass type & zone |
| `schedules` | Recurring task scheduler |
| `dashboard` | Stats, charts, activity breakdown |
| `products` | Curated product guide |
| `sources` | Research sources page (19 university extension services) |
| `calculator` | Treatment/product application calculator |
| `grass-id` | Grass identifier (photo-based) |
| `learn` | Learn Library — filtered lawn care article hub |
| `account` | Sign-in / account management |
| `pricing` | Pricing and plan info |
| `contact` | Contact form |
| `more` | More menu |

---

## Technology Stack

| Layer | Technology |
|---|---|
| UI framework | React 18.2 (UMD CDN build) |
| JSX transpilation | Babel 7.23.5 Standalone (in-browser) |
| Styling | Tailwind CSS (CDN JIT) + custom CSS variables |
| Data persistence | `localStorage` (primary, always) |
| Cloud sync | Firebase 10.8.0 — Auth + Firestore + Storage (optional) |
| Weather data | Open-Meteo API (free, no API key) |
| Zone lookup | phzmapi.org — ZIP → USDA hardiness zone + coordinates |
| Offline support | Service Worker + Cache API (`yardstick-v6`) |
| Hosting | GitHub Pages (free, static) |

**No build step.** No webpack, Vite, npm, or package.json. CDN dependencies load at runtime.

---

## Data & Research

### University Extension Sources
All lawn care recommendations cite one or more of 19 university extension services, including:
Penn State, University of Georgia, Clemson, NC State, University of Minnesota, Ohio State, Purdue, Virginia Cooperative, and others tracked in `RESEARCH_SOURCES` in `constants.js`.

### Grass Types Supported
Data lives in `grass-programs.js` (~2,559 lines). Keys are kebab-case: `tall-fescue`, `kentucky-bluegrass`, `bermuda`, `zoysia`, `st-augustine`, `centipede`, `fine-fescue`, `ryegrass`, etc.

### LocalStorage Keys
| Key | Contents |
|---|---|
| `lawnCareActivities` | All logged activities |
| `lawnCareEquipment` | Garage items |
| `lawnProfile` | Zone, grass, size, zip, lat/lon |
| `lawnCareSchedules` | Recurring tasks |

---

## Key Copy (Approved & Locked)

**Primary tagline:** Lawn care backed by science. Built for your yard.

**Short description (meta/social):** Research-backed lawn care for DIYers. Free account. Personalized to your yard, grounded in science.

**Long description (README/Reddit):** Yardstick is a free lawn care companion built for DIY homeowners who want to do it right. Every recommendation comes from university extension research — not fertilizer brands. Create a free account to track your activities, monitor soil temps, and follow a science-backed program for your grass type and USDA zone. No ads. Just your lawn, measured.

### Copy Rules
- Cite university extension research as the source
- Lead with the user's outcome, not app features
- Use "your yard" and "your zone" — make it personal
- Keep CTAs action-oriented: "Track your lawn" not "Try Yardstick"
- Use sentence case for headlines and UI labels
- No exclamation marks in the app UI
- No ALL CAPS for emphasis in body copy
- Do not promise specific outcomes ("achieve the perfect lawn")

---

## Development Constraints (Quick Reference)

- No build step, no npm, no webpack
- No React Router — state-based navigation only
- No backend — Firebase is the only "server" (optional)
- Must remain hostable on GitHub Pages for free
- Mobile-first: design for 375px first
- Always use CSS variables for brand colors, not Tailwind color utilities
- Never remove features/content without explicit owner approval
- All lawn care claims must cite a `RESEARCH_SOURCES` entry
- Do not alter grass program schedules without sourced justification

---

## Approved Channels & Links

- **App:** `https://yardstick.diy`
- **GitHub repo:** `https://github.com/stereopirate/yardstick`
- **GitHub Pages:** `https://stereopirate.github.io/yardstick/`
