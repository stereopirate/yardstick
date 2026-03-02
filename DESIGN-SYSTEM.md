# Yardstick — Design System

### Source of Truth · v1.0

> This document is the canonical reference for all visual design decisions in the Yardstick app. All UI updates, new features, and component additions should follow these specifications. Update this file when design decisions change — do not let the app drift from it.

-----

## Table of Contents

1. [Brand Identity](#1-brand-identity)
1. [Typography](#2-typography)
1. [Color Palette](#3-color-palette)
1. [Logo & Wordmark](#4-logo--wordmark)
1. [Components — Cards](#5-components--cards)
1. [Components — Alerts](#6-components--alerts)
1. [Components — Badges](#7-components--badges)
1. [Components — Buttons](#8-components--buttons)
1. [Layout & Spacing](#9-layout--spacing)
1. [Mobile-First Rules](#10-mobile-first-rules)
1. [CSS Variable Reference](#11-css-variable-reference)
1. [Do / Don’t](#12-do--dont)

-----

## 1. Brand Identity

**App name:** Yardstick  
**Tagline:** Lawn Care Companion  
**Positioning:** Research-backed, university-sourced lawn care guidance for serious DIY homeowners. Not a commercial product promoter — a trusted neighbor with a horticulture degree.

**Voice & tone:**

- Grounded, practical, confident
- Use: *dialed in, by the numbers, your zone, prime window, research-backed*
- Avoid: *amazing, revolutionary, seamless, leverage, game-changer, smart AI*
- Always cite university extension sources — it’s a core brand differentiator

**Personality keywords:** Field manual. Worn clipboard. Trusted authority. No fluff.

-----

## 2. Typography

Three fonts. Three distinct roles. Never swap them.

### Font Stack

|Role       |Font             |Weight(s)           |Use For                                                                    |
|-----------|-----------------|--------------------|---------------------------------------------------------------------------|
|Display    |**Bitter**       |700, 900, 900 italic|Headlines, logo wordmark, coach card titles, section headers               |
|Body / UI  |**Cabin**        |400, 500, 600, 700  |All UI copy, body text, buttons, labels, navigation                        |
|Data / Mono|**Courier Prime**|400, 700            |Data readouts, stat labels, source citations, timestamps, zone/grass labels|

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,600;0,700;0,900;1,600;1,700&family=Cabin:wght@400;500;600;700&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### CSS Variables

```css
--ff-display: 'Bitter', Georgia, serif;
--ff-body:    'Cabin', sans-serif;
--ff-mono:    'Courier Prime', monospace;
```

### Type Scale

```css
/* Display — Bitter */
.type-display    { font-family: var(--ff-display); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.01em; }
.type-display-sm { font-family: var(--ff-display); font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; line-height: 1.2; }
.type-display-it { font-family: var(--ff-display); font-style: italic; font-weight: 700; }

/* Body — Cabin */
.type-ui-heading { font-family: var(--ff-body); font-size: 1.05–1.2rem; font-weight: 700; line-height: 1.3; }
.type-body       { font-family: var(--ff-body); font-size: 0.86–0.92rem; font-weight: 400; line-height: 1.65–1.75; }
.type-label      { font-family: var(--ff-body); font-size: 0.72–0.82rem; font-weight: 600; }

/* Mono — Courier Prime */
.type-mono-data  { font-family: var(--ff-mono); font-size: 0.82–0.86rem; line-height: 1.9; }
.type-mono-label { font-family: var(--ff-mono); font-size: 0.56–0.66rem; letter-spacing: 0.14–0.22em; text-transform: uppercase; }
```

### Typography Rules

- **Bitter** is for headers and the logo only — never for body copy or UI labels
- **Cabin** is the workhorse — buttons, body, navigation, card copy, alert text
- **Courier Prime** gives data and labels a tactile, field-log character — use it for anything numeric or technical
- Courier Prime mono labels use `letter-spacing: 0.14–0.22em` and `text-transform: uppercase`
- Never use a fourth font — if something doesn’t fit these three, reconsider the component

-----

## 3. Color Palette

**Theme name:** Field & Soil · Parchment

All colors are used at full opacity in their assigned roles. Tints (rgba) are used for alert backgrounds and badge fills only.

### Primary Colors

|Name             |Hex          |CSS Variable   |Role                                                      |
|-----------------|-------------|---------------|----------------------------------------------------------|
|Forest Dark      |`#1E4D18`    |`--green-dark` |App header bg, coach card header, logo on light           |
|Turf Green       |`#367C2B`    |`--green`      |Primary interactive, success states, log dots             |
|Spring           |`#4E9E40`    |`--green-light`|Hover accent, decorative gradient only                    |
|**Bright Yellow**|**`#F5C842`**|**`--yellow`** |**CTA buttons, active nav, ruler underline, temp display**|
|Warm Straw       |`#D4A843`    |`--straw`      |Secondary accent, badge borders (fert), alert borders     |
|Brick Clay       |`#C05A2C`    |`--clay`       |Warnings, overdue states, destructive actions             |

### Surface Colors

|Name     |Hex      |CSS Variable|Role                                              |
|---------|---------|------------|--------------------------------------------------|
|Parchment|`#F7F3EC`|`--cream`   |Card surface (Style F), coach card body, log cards|
|Canvas   |`#EDE8DE`|`--bg`      |App body background, page background              |
|White    |`#FFFFFF`|`--white`   |Swatch info panels, select inputs                 |

### Text Colors

|Name       |Hex      |CSS Variable   |Role                                            |
|-----------|---------|---------------|------------------------------------------------|
|Rich Soil  |`#1E1A14`|`--soil`       |Primary text, button text on yellow             |
|Fieldstone |`#6B6560`|`--stone`      |Secondary text, card body copy, alert body      |
|Stone Light|`#B8B2AC`|`--stone-light`|Tertiary, timestamps, source citations, disabled|

### Color Rules

- `--yellow` (#F5C842) is **the only CTA color** — primary buttons, the floating log button, active bottom nav state
- `--straw` (#D4A843) is a **secondary accent only** — badge borders for fertilizer activity, alert borders for tips
- Never use straw for interactive elements — it doesn’t have enough contrast against `--cream`
- `--clay` is reserved for warnings and destructive/overdue states — do not repurpose it
- Text on `--yellow` buttons is always `--soil` (#1E1A14) — never white
- Text on `--green` buttons is always `--white`

-----

## 4. Logo & Wordmark

### SVG Wordmark

The Yardstick logo is a pure SVG wordmark. It consists of:

- **Bitter 900** text in the appropriate color for the surface
- A **yellow ruler underline** (`#F5C842`) directly below the text
- **Tick marks** on the ruler at regular intervals (semi-transparent `#1E1A14`, ~20–25% opacity)

The ruler is not decorative — it directly references the brand name and should always be included with the wordmark.

### Wordmark Variants

|Variant          |Text Fill|Ruler    |Background            |
|-----------------|---------|---------|----------------------|
|Light / Parchment|`#1E4D18`|`#F5C842`|`#F7F3EC` or `#EDE8DE`|
|On Forest Green  |`#F7F3EC`|`#F5C842`|`#1E4D18`             |
|On Soil / Footer |`#F7F3EC`|`#F5C842`|`#1E1A14`             |
|On Mid Green     |`#F7F3EC`|`#F5C842`|`#367C2B`             |

### SVG Code — Wordmark (On Light)

```svg
<svg viewBox="0 0 280 52" xmlns="http://www.w3.org/2000/svg" aria-label="Yardstick">
  <text x="0" y="40"
    font-family="Bitter, Georgia, serif"
    font-weight="900"
    font-size="44"
    fill="#1E4D18"
    letter-spacing="-0.5">Yardstick</text>
  <rect x="0" y="45" width="272" height="5" rx="1" fill="#F5C842"/>
  <!-- Tick marks -->
  <rect x="30"  y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="60"  y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="91"  y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="121" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="151" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="181" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="212" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="242" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
</svg>
```

### SVG Code — Wordmark (On Dark)

Change only `fill="#F7F3EC"` on the text element. Ruler and tick marks stay the same.

### SVG Code — Badge / App Icon

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Yardstick">
  <circle cx="50" cy="50" r="48" fill="#1E4D18"/>
  <circle cx="50" cy="50" r="44" fill="none" stroke="#F5C842" stroke-width="3.5"/>
  <text x="50" y="64"
    font-family="Bitter, Georgia, serif"
    font-weight="900"
    font-size="38"
    fill="#F7F3EC"
    text-anchor="middle"
    letter-spacing="-1">YS</text>
  <!-- Ruler bar -->
  <rect x="16" y="75" width="68" height="3.5" rx="1" fill="#F5C842"/>
  <rect x="28" y="75" width="1"   height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="40" y="75" width="1"   height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="52" y="75" width="1"   height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="64" y="75" width="1"   height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="76" y="75" width="1"   height="3.5" fill="#1E1A14" opacity="0.3"/>
</svg>
```

### Sizing Guidelines

|Context                   |Height |Variant                       |
|--------------------------|-------|------------------------------|
|Sticky nav / mobile header|24–28px|Wordmark (cream on dark)      |
|App header (in-app)       |32–36px|Wordmark (cream on forest)    |
|Hero / splash             |48–64px|Wordmark (forest on parchment)|
|Bottom sheet / modal      |28px   |Wordmark                      |
|App icon (installed PWA)  |any    |Badge (YS circle)             |
|Favicon                   |16–32px|Badge (YS circle, simplified) |
|Footer                    |36–40px|Wordmark (cream on soil)      |

### Logo Rules

- Never distort or stretch the wordmark — it scales via `width: auto; height: Xpx`
- Never remove the ruler underline from the wordmark
- Never place the light wordmark on a light surface, or dark on dark
- Never use a rasterized/PNG version if SVG is available
- The badge variant is **only** for compact icon contexts — not in-app headers

-----

## 5. Components — Cards

**Locked style: Style F — Parchment Inset**

All content cards use a single consistent treatment. No mixing of card styles.

### Base Card

```css
.card {
  background: var(--cream);           /* #F7F3EC */
  border-radius: 5px;
  padding: 20px;
  box-shadow:
    inset 0 0 0 1px rgba(30,26,20,0.12),   /* inner border */
    0 3px 14px rgba(30,26,20,0.09);         /* soft drop shadow */
}
```

### Card Anatomy

```
┌─────────────────────────────────────┐  ← inset 1px border
│  EYEBROW LABEL  (Courier Prime, sm) │
│  Card Title (Bitter 700)            │
│  Body copy paragraph (Cabin 400)    │
│─────────────────────────────────────│  ← 1px dashed divider
│  Source label          Action link  │
└─────────────────────────────────────┘
```

```css
.card-eyebrow { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--stone); margin-bottom: 5px; }
.card-title   { font-family: var(--ff-display); font-size: 1.05rem; font-weight: 700; color: var(--soil); line-height: 1.25; margin-bottom: 6px; }
.card-body    { font-family: var(--ff-body); font-size: 0.83rem; color: var(--stone); line-height: 1.65; }
.card-footer  { margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(30,26,20,0.1); display: flex; align-items: center; justify-content: space-between; }
.card-source  { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--stone-light); }
.card-action  { font-family: var(--ff-body); font-size: 0.78rem; font-weight: 700; color: var(--green); }
```

### Coach Card Variant

Used for the primary research-backed coaching message on the dashboard. Has a dark forest header.

```css
.card-coach { background: var(--cream); border-radius: 5px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(30,26,20,0.12), 0 3px 14px rgba(30,26,20,0.09); }

.card-coach-header {
  background: var(--green-dark);
  background-image: radial-gradient(ellipse at 90% 0%, rgba(78,158,64,0.2), transparent 60%);
  padding: 14px 18px;
  border-bottom: 2px solid rgba(245,200,66,0.4);   /* yellow rule */
}
.card-coach-header .card-eyebrow { color: var(--yellow); }
.card-coach-header .card-title   { color: var(--cream); font-size: 1rem; }

.card-coach-body { padding: 14px 18px; }
```

### Stat Card Variant

Used in the 3-up stat row on the dashboard.

```css
.card-stat {
  background: var(--cream);
  border-radius: 5px;
  padding: 16px 14px;
  text-align: center;
  box-shadow: inset 0 0 0 1px rgba(30,26,20,0.12), 0 3px 14px rgba(30,26,20,0.09);
}
.card-stat-val { font-family: var(--ff-display); font-size: 2rem; font-weight: 700; color: var(--green-dark); display: block; line-height: 1; margin-bottom: 4px; }
.card-stat-lbl { font-family: var(--ff-mono); font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--stone); }
```

**Overdue stat exception:** When a stat represents an overdue or warning count, the value uses `color: var(--clay)` instead of `--green-dark`.

### Activity Log Items (inside cards)

```css
.log-item { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px dashed rgba(30,26,20,0.1); }
.log-item:last-child { border-bottom: none; padding-bottom: 0; }
.log-dot   { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.log-label { font-family: var(--ff-body); font-size: 0.84rem; font-weight: 600; color: var(--soil); flex: 1; }
.log-date  { font-family: var(--ff-mono); font-size: 0.62rem; color: var(--stone-light); }
```

**Log dot colors by activity type:**

|Activity   |Dot Color              |
|-----------|-----------------------|
|Mowing     |`#367C2B` (green)      |
|Fertilizer |`#D4A843` (straw)      |
|Watering   |`#3B82F6` (blue)       |
|Seeding    |`#C05A2C` (clay)       |
|Aeration   |`#6B6560` (stone)      |
|Trimming   |`#4E9E40` (green-light)|
|Maintenance|`#7A5410` (dark amber) |

-----

## 6. Components — Alerts

**Locked style: Filled**

Three semantic alert types. All use a lightly tinted background with a matching border. No solid/inverted alerts in the app.

### Warning Alert (Clay)

Used for: overdue maintenance, weather risk, application timing missed.

```css
.alert-warn {
  background: rgba(192,90,44,0.1);
  border: 1px solid rgba(192,90,44,0.22);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-warn .alert-title { color: var(--clay); font-weight: 700; }
.alert-warn .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-warn .alert-meta  { color: rgba(192,90,44,0.6); font-family: var(--ff-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; }
```

### Tip / Info Alert (Straw)

Used for: coaching tips, soil temp updates, seasonal windows opening.

```css
.alert-tip {
  background: rgba(212,168,67,0.12);
  border: 1px solid rgba(212,168,67,0.28);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-tip .alert-title { color: #7A5410; font-weight: 700; }
.alert-tip .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-tip .alert-meta  { color: rgba(122,84,16,0.55); font-family: var(--ff-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; }
```

### Success Alert (Green)

Used for: activity logged confirmation, maintenance reset, profile saved.

```css
.alert-success {
  background: rgba(54,124,43,0.1);
  border: 1px solid rgba(54,124,43,0.22);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-success .alert-title { color: var(--green-dark); font-weight: 700; }
.alert-success .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-success .alert-meta  { color: rgba(54,124,43,0.55); font-family: var(--ff-mono); font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em; }
```

### Alert Shared Structure

```css
.alert       { display: flex; align-items: flex-start; gap: 12px; }
.alert-icon  { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
.alert-content { flex: 1; }
.alert-title   { display: block; margin-bottom: 2px; }
.alert-text    { display: block; line-height: 1.5; }
.alert-meta    { display: block; margin-top: 7px; }
```

### Progress Bar Alert Variant

Used in My Garage for maintenance hour tracking.

```css
.alert-progress {
  background: rgba(192,90,44,0.08);
  border: 1px solid rgba(192,90,44,0.2);
  border-radius: 5px;
  padding: 14px 16px;
}
.progress-track { height: 6px; background: rgba(30,26,20,0.1); border-radius: 3px; overflow: hidden; }
.progress-fill  { height: 100%; border-radius: 3px; background: linear-gradient(to right, #D4A843, #C05A2C); }
```

Progress fill width is set dynamically: `style="width: {(hoursUsed / threshold) * 100}%"` — capped visually at 100% but can overflow to show overdue state.

-----

## 7. Components — Badges

**Locked style: Outlined**

Activity type badges use transparent background with a colored border and matching text. No filled/solid badges.

### Badge Base

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 3px;
  font-family: var(--ff-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  background: transparent;
}
```

### Badge Variants by Activity Type

```css
.badge-mow    { border: 1.5px solid #367C2B; color: #1E4D18; }  /* Mowing */
.badge-fert   { border: 1.5px solid #D4A843; color: #7A5410; }  /* Fertilizer */
.badge-water  { border: 1.5px solid #3B82F6; color: #1D4ED8; }  /* Watering */
.badge-seed   { border: 1.5px solid #C05A2C; color: #C05A2C; }  /* Seeding */
.badge-aerate { border: 1.5px solid #6B6560; color: #6B6560; }  /* Aeration */
.badge-maint  { border: 1.5px solid #7A5410; color: #7A5410; }  /* Maintenance */
.badge-trim   { border: 1.5px solid #4E9E40; color: #1E4D18; }  /* Trimming */
```

### Badge Usage Rules

- Always pair a badge with its matching log dot color in activity lists
- Use the icon + label pattern: `✂ Mowing`, `⬡ Fertilizer`, `💧 Watering`, `◎ Seeding`, `⊕ Aeration`, `🔧 Maintenance`
- In compact mobile contexts (phone log items), scale down to `font-size: 0.64rem; padding: 2px 7px`
- Never use badges as buttons — they are display-only labels

-----

## 8. Components — Buttons

### Primary CTA — Bright Yellow

**The only primary action button color.** Used for: Log Activity, Save, Submit, primary confirms.

```css
.btn-primary {
  background: #F5C842;
  color: #1E1A14;              /* dark text — always, never white */
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 3px;
  border: none;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.18s;
}
.btn-primary:hover {
  background: #E8BA2A;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245,200,66,0.35);
}
```

**Floating CTA (full-width, bottom of dashboard):**

```css
.btn-cta-floating {
  background: #F5C842;
  color: #1E1A14;
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 0.86rem;
  padding: 13px;
  border-radius: 3px;
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 8px rgba(245,200,66,0.3);
}
```

### Secondary — Green

Used for: Save Changes, Confirm secondary actions.

```css
.btn-green {
  background: #367C2B;
  color: #FFFFFF;
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 3px;
  border: none;
}
.btn-green:hover { background: #1E4D18; }
```

### Ghost / Tertiary

Used for: Cancel, Export, secondary non-destructive actions.

```css
.btn-ghost {
  background: transparent;
  color: #6B6560;
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 3px;
  border: 1.5px solid rgba(30,26,20,0.18);
}
.btn-ghost:hover { border-color: #6B6560; color: #1E1A14; }
```

### Destructive / Warning

Used for: Delete, Mark Overdue, Reset.

```css
.btn-clay {
  background: #C05A2C;
  color: #FFFFFF;
  font-family: var(--ff-body);
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 3px;
  border: none;
}
.btn-clay:hover { background: #A04A22; }
```

### Small Variant

Add `.btn-sm` to any button type: `padding: 7px 14px; font-size: 0.78rem;`

### Button Rules

- Yellow (`btn-primary`) = primary action. Only one per screen/section.
- Green (`btn-green`) = confirmations and saves.
- Ghost = always the least important action in a group.
- Clay = only for destructive or overdue states.
- Never put white text on the yellow button.
- Never use the straw color (#D4A843) for any button.

-----

## 9. Layout & Spacing

### App Shell

```
┌──────────────────────────────────┐
│  App Header (forest green)       │  56–64px
│  Logo + Zone/Grass label         │
├──────────────────────────────────┤
│                                  │
│  Body (canvas bg #EDE8DE)        │  flex column, gap: 12–14px
│  Padding: 14px                   │
│                                  │
│  [Stat Row — 3 cols, gap 8px]    │
│  [Warning Alert]                 │
│  [Coach Card]                    │
│  [Tip Alert]                     │
│  [Activity Log Card]             │
│  [CTA Button — full width]       │
│                                  │
├──────────────────────────────────┤
│  Bottom Nav (soil bg)            │  60–68px
│  5 tabs: Home/History/Garage/    │
│  My Yard/Settings                │
└──────────────────────────────────┘
```

### Spacing Scale

|Token|Value  |Use                                           |
|-----|-------|----------------------------------------------|
|xs   |4px    |Badge padding, internal micro-gaps            |
|sm   |8px    |Stat grid gap, small component gap            |
|md   |12–14px|App body padding, component gap, alert padding|
|lg   |18–20px|Card padding, section gap                     |
|xl   |28–32px|Section spacing, large component padding      |
|xxl  |48–56px|Page-level section breaks                     |

### Border Radius

|Context                       |Radius      |
|------------------------------|------------|
|Cards, alerts, buttons, badges|3–5px       |
|App container / phone frame   |10px        |
|Dots (log, stat)              |50% (circle)|
|Progress bar                  |3px         |
|Ruler elements                |1px         |

### Grid Patterns

```css
/* Stat row — 3 equal columns */
.app-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }

/* Card grid — responsive, 300px min */
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }

/* Badge row — flex wrap */
.badge-row { display: flex; flex-wrap: wrap; gap: 7px; }
```

-----

## 10. Mobile-First Rules

Yardstick is a **mobile-first** application. All components are designed for small screens first and adjusted for larger screens where needed.

### Breakpoints

```css
/* Base: mobile (< 640px) — primary design target */
/* Tablet+: 640px+ — wider layouts, show nav links */
@media (min-width: 640px) { /* wider content grids */ }
/* Desktop: 1040px — max-width container */
.page-wrap { max-width: 1040px; margin: 0 auto; }
```

### Mobile-First Checklist for New Features

- [ ] Does it work at 375px width before anything else?
- [ ] Is the primary action reachable by thumb (bottom 60% of screen)?
- [ ] Are tap targets at least 44px tall?
- [ ] Does text remain readable at base size without zooming?
- [ ] Are secondary/detail sections collapsible (accordion) on mobile?
- [ ] Is the floating CTA button (`+ Log Activity`) still visible?
- [ ] Does the bottom nav remain unobscured?

### Information Hierarchy on Mobile

1. **Always visible:** Coach tip (if active), warning alerts, stat row
1. **One scroll:** Activity log, tip alerts, CTA
1. **Behind tap/accordion:** Details, historical data, settings, research sources
1. **Never auto-expand on mobile:** Long lists, full program details, export options

-----

## 11. CSS Variable Reference

Complete set — copy this `:root` block into any new stylesheet or component.

```css
:root {
  /* ── Fonts ── */
  --ff-display: 'Bitter', Georgia, serif;
  --ff-body:    'Cabin', sans-serif;
  --ff-mono:    'Courier Prime', monospace;

  /* ── Greens ── */
  --green:       #367C2B;   /* primary interactive */
  --green-dark:  #1E4D18;   /* headers, coach bg, logo fill on light */
  --green-light: #4E9E40;   /* accent gradient only */

  /* ── Yellows / Ambers ── */
  --yellow:      #F5C842;   /* CTA buttons, active nav, ruler, temp display */
  --straw:       #D4A843;   /* secondary accent, fert badge border only */

  /* ── Warning ── */
  --clay:        #C05A2C;   /* warnings, overdue, destructive */

  /* ── Surfaces ── */
  --cream:       #F7F3EC;   /* card surface (Style F) */
  --bg:          #EDE8DE;   /* app body / page background */
  --white:       #FFFFFF;   /* select inputs, swatch panels */

  /* ── Text ── */
  --soil:        #1E1A14;   /* primary text, button text on yellow */
  --stone:       #6B6560;   /* secondary text, card body */
  --stone-light: #B8B2AC;   /* timestamps, citations, disabled */
}
```

-----

## 12. Do / Don’t

### Typography

|✅ Do                                                                             |❌ Don’t                                   |
|---------------------------------------------------------------------------------|------------------------------------------|
|Use Bitter for all display headlines                                             |Use Bitter for body copy or UI labels     |
|Use Cabin for all buttons and UI                                                 |Use a system font for any visible UI text |
|Use Courier Prime for all data/stats                                             |Use Courier Prime for body paragraphs     |
|Pair Courier Prime with `letter-spacing: 0.14em+` and `text-transform: uppercase`|Use Courier Prime in mixed-case for labels|

### Color

|✅ Do                                              |❌ Don’t                                      |
|--------------------------------------------------|---------------------------------------------|
|Use `#F5C842` (yellow) for the primary CTA        |Use `#D4A843` (straw) for buttons            |
|Put dark (`#1E1A14`) text on yellow buttons       |Put white text on yellow buttons             |
|Use clay only for warnings and destructive actions|Use clay as a general accent color           |
|Use tinted rgba backgrounds for alert fills       |Use full opacity colors for alert backgrounds|

### Logo

|✅ Do                                                |❌ Don’t                                       |
|----------------------------------------------------|----------------------------------------------|
|Always include the ruler underline with the wordmark|Use the wordmark without the ruler            |
|Scale via `height` with `width: auto`               |Stretch or skew the SVG                       |
|Use the badge variant for icons and favicons        |Use the badge in the main app header          |
|Use the appropriate color variant for the surface   |Place the light wordmark on a light background|

### Cards & Alerts

|✅ Do                                         |❌ Don’t                                         |
|---------------------------------------------|------------------------------------------------|
|Use the parchment inset shadow for all cards |Mix card styles within a single view            |
|Use filled alerts (rgba bg + border)         |Use solid/inverted alert colors                 |
|Include a source citation in coach cards     |Add coach content without a university reference|
|Use clay progress bars for maintenance alerts|Use green progress bars for overdue states      |

### Buttons

|✅ Do                                          |❌ Don’t                                     |
|----------------------------------------------|--------------------------------------------|
|Use yellow (`btn-primary`) for the main action|Use more than one primary button per section|
|Use ghost for cancel / least important action |Use ghost for primary or important actions  |
|Use clay only for destructive/warning actions |Use clay for neutral or secondary actions   |

-----

## Changelog

|Version|Date|Changes                                                                                                                                               |
|-------|----|------------------------------------------------------------------------------------------------------------------------------------------------------|
|v1.0   |2025|Initial locked system — Bitter/Cabin/Courier Prime, Parchment theme, Style F cards, filled alerts, outlined badges, SVG wordmark, yellow CTA (#F5C842)|

-----

*Add new entries to the changelog whenever design decisions are updated. Increment the version number for significant changes (new component patterns, palette additions) and note minor changes inline.*
