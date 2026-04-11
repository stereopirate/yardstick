# Yardstick — Brand Book

**Version 3.0 · 2026 · yardstick.diy**
**Theme: Field & Soil · Parchment · Visual Rebrand 2026**

> The canonical visual and brand reference for Yardstick. Every design decision, color, font, component, and copy rule lives here. When creating any visual content — app UI, social graphics, marketing materials, or AI-generated assets — consult this document first.

> **v3.0 summary:** Harvest Gold (#C88E22) replaces the old Sunday-adjacent #F5C842 yellow. Nunito replaces Cabin as the body/UI font. Courier Prime is removed entirely. The system is now two fonts: Bitter (display authority) + Nunito (warmth and usability). All greens shift slightly darker. The `--straw` variable is retired.

-----

## Table of Contents

1. [Brand Identity](#1-brand-identity)
1. [Approved Copy](#2-approved-copy)
1. [Typography](#3-typography)
1. [Color Palette](#4-color-palette)
1. [Logo & Wordmark](#5-logo--wordmark)
1. [Components — Buttons](#6-components--buttons)
1. [Components — Cards](#7-components--cards)
1. [Components — Alerts](#8-components--alerts)
1. [Components — Badges](#9-components--badges)
1. [Layout & Spacing](#10-layout--spacing)
1. [Mobile-First Rules](#11-mobile-first-rules)
1. [CSS Variables (Design Tokens)](#12-css-variables-design-tokens)
1. [Do / Don’t Quick Reference](#13-do--dont-quick-reference)

-----

## 1. Brand Identity

**App name:** Yardstick  
**Domain:** yardstick.diy  
**Tagline:** Lawn care backed by science. Built for your yard.  
**Positioning:** Research-backed, university-sourced lawn care guidance for serious DIY homeowners. Not a commercial product promoter — a trusted neighbor with a horticulture degree.

### Brand Personality

|Keyword              |What it means                                                        |
|---------------------|---------------------------------------------------------------------|
|**Field Manual**     |Dense with useful info. Built to be referenced, not just read once.  |
|**Worn Clipboard**   |Tactile, earned character. Not shiny or sterile. Trusted through use.|
|**Trusted Authority**|University-sourced guidance. Confident without being preachy.        |
|**No Fluff**         |Every word earns its place. No filler. No hype. No product pushing.  |

**Brand voice in one sentence:** *“Like a trusted neighbor who happens to have a horticulture degree.”*

### Voice — Use & Avoid

**✓ USE:** dialed in · by the numbers · your zone · prime window · research-backed · university-sourced · grounded in science · personalized · soil temp · extension-verified

**✕ AVOID:** amazing · revolutionary · seamless · leverage · game-changer · smart AI · unlock · supercharge · effortless · next-level

### Legacy Names (Never Use)

- “Easy Green” — legacy name, discontinued
- “Lawn Care Tracker” — legacy name, discontinued
- “Lawn Coach” — legacy name, discontinued
- “GrassCoach” — legacy name, discontinued

-----

## 2. Approved Copy

These are the locked, approved lines for Yardstick. Use them verbatim across the app, social channels, and marketing materials.

### Primary Tagline

> **Lawn care backed by science. Built for your yard.**

Use as the primary descriptor everywhere a one-liner is needed: app header, hero section, social bio.

### Short Description

> Research-backed lawn care for DIYers. Free account. Personalized to your yard, grounded in science.

*Use for: meta tags, social bio, app store listing.*

### Long Description

> Yardstick is a free lawn care companion built for DIY homeowners who want to do it right. Every recommendation comes from university extension research — not fertilizer brands. Create a free account to track your activities, monitor soil temps, and follow a science-backed program for your grass type and USDA zone. No ads. Just your lawn, measured.

*Use for: Reddit posts, GitHub README, About page.*

### Copy Rules

**✓ DO:**

- Always cite university extension research as the source
- Lead with the user’s outcome, not app features
- Use “your yard” and “your zone” — make it personal
- Keep CTAs action-oriented: “Track your lawn” not “Try Yardstick”
- Use sentence case for headlines and UI labels

**✕ DON’T:**

- Don’t mention what competitors lack — let the product speak
- Don’t promise specific outcomes (“achieve the perfect lawn”)
- Don’t use exclamation marks in the app UI
- Don’t use ALL CAPS for emphasis in body copy
- Don’t use “no account required” or “no login” framing — encourage free account creation; accounts are the path to long-term data sync, not a barrier

-----

## 3. Typography

Two fonts. Two distinct roles. Bitter for authority, Nunito for warmth. Never add a third. Courier Prime has been removed from the system.

### Font Stack

|Role         |Font   |Weights                  |Use For                                                                 |
|-------------|-------|-------------------------|------------------------------------------------------------------------|
|**Display**  |Bitter |700, 900, 900 italic     |Headlines, logo wordmark, coach card titles, section headers            |
|**Body / UI**|Nunito |400, 500, 600, 700, 800, 900|All UI copy, body text, buttons, labels, badges, data, navigation    |

> **Removed:** Cabin (old body font) and Courier Prime (old mono/data font) are no longer part of the system. Any existing references to `--ff-mono` or Courier Prime should be migrated to `--ff-body` (Nunito).

### Google Fonts Import

```html
<!-- Yardstick v3.0 — 2 fonts only -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,700;0,900;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<!-- Removed: Cabin (old body font), Courier Prime (mono) -->
```

### CSS Variables

```css
--ff-display: ‘Bitter’, Georgia, serif;
--ff-body:    ‘Nunito’, sans-serif;
/* --ff-mono removed — use --ff-body (Nunito) for all data, labels, timestamps */
```

### Type Scale

|Class              |Font         |Size                    |Weight|Use                              |
|-------------------|-------------|------------------------|------|---------------------------------|
|`.type-display`    |Bitter       |clamp(2rem, 5vw, 3.5rem)|900   |Hero headlines                   |
|`.type-display-sm` |Bitter       |clamp(1.4rem, 3vw, 2rem)|700   |Section headers                  |
|`.type-display-it` |Bitter italic|inherited               |700   |Emphasis in headers              |
|`.type-ui-heading` |Nunito       |1.05–1.2rem             |800   |Card titles, subsections         |
|`.type-body`       |Nunito       |0.88–0.94rem            |500   |Body copy, descriptions          |
|`.type-label`      |Nunito       |0.72–0.78rem            |700   |Badges, UI chips, zone/grass tags|
|`.type-label-caps` |Nunito       |0.68–0.72rem            |800   |Stat labels, section eyebrows (uppercase + letter-spacing 0.1em)|

### Typography Rules

**✓ DO:**

- Use Bitter for all headers and the logo wordmark
- Use Nunito for every button, label, badge, body paragraph, data readout, and eyebrow
- Use Bitter italic for emphasis within headers
- Use Nunito 800 + `letter-spacing: 0.1em` + `text-transform: uppercase` for stat labels and section eyebrows

**✕ DON’T:**

- Don’t use Courier Prime — it has been removed from the system
- Don’t use Cabin — it has been replaced by Nunito
- Don’t use Bitter for body copy, buttons, or UI labels
- Don’t add a third font — the system is complete at two
- Don’t use system fonts (Arial, Helvetica) for any visible UI text

-----

## 4. Color Palette

**Theme name:** Field & Soil · Parchment

All colors are used at full opacity in their assigned roles. Tints (rgba) are used for alert backgrounds and badge fills only. Every color has a locked role — do not reassign them.

### Primary Colors (Greens)

|Name            |Hex      |CSS Variable   |Role                                               |Status  |
|----------------|---------|---------------|---------------------------------------------------|--------|
|**Deep Forest** |`#1D5C38`|`--green-dark` |App header bg, coach card header, logo fill on light|Updated|
|**Turf Green**  |`#2E7A44`|`--green`      |Primary interactive, success states, log dots       |Updated|
|**Spring**      |`#4E9E40`|`--green-light`|Hover accent, decorative gradients ONLY             |Kept   |

### Gold Colors (replaces Yellow + Straw)

|Name            |Hex      |CSS Variable  |Role                                                |Status  |
|----------------|---------|--------------|-----------------------------------------------------|--------|
|**Harvest Gold**|`#C88E22`|`--gold`      |CTA buttons, active nav, ruler underline             |New     |
|**Gold Dark**   |`#A87018`|`--gold-dark` |Gold hover state                                     |New     |
|**Gold Light**  |`#FDF4E0`|`--gold-light`|Badge fills, alert backgrounds, icon backgrounds     |New     |

> **Removed:** `--yellow` (#F5C842) and `--straw` (#D4A843) are retired. The old yellow was too close to Sunday’s brand color (#FBBF24). Harvest Gold (#C88E22) is the new CTA and accent color.

### Warning Colors

|Name           |Hex      |CSS Variable  |Role                                           |
|---------------|---------|--------------|-----------------------------------------------|
|**Brick Clay** |`#C05A2C`|`--clay`      |Warnings, overdue states, destructive actions  |
|**Clay Light** |`#FAE8E0`|`--clay-light`|Clay-tinted alert backgrounds                  |

### Surface Colors

|Name         |Hex      |CSS Variable|Role                                              |
|-------------|---------|------------|--------------------------------------------------|
|**Parchment**|`#F7F3EC`|`--cream`   |Card surface (Style F), coach card body, log cards|
|**Canvas**   |`#EDE8DE`|`--bg`      |App body background, page background              |
|**White**    |`#FFFFFF`|`--white`   |Select inputs, swatch info panels                 |

### Text Colors

|Name           |Hex      |CSS Variable   |Role                                        |
|---------------|---------|---------------|--------------------------------------------|
|**Rich Soil**  |`#1E1A14`|`--soil`       |Primary text, button text on gold           |
|**Fieldstone** |`#6B6560`|`--stone`      |Secondary text, card body copy, alert body  |
|**Stone Light**|`#B8B2AC`|`--stone-light`|Timestamps, source citations, disabled states|

### Why gold changed — Sunday comparison

| Swatch          | Hex       | Status         |
|-----------------|-----------|----------------|
| Sunday Yellow   | `#FBBF24` | Competitor     |
| Old Yardstick   | `#F5C842` | Retired — too close to Sunday |
| Harvest Gold    | `#C88E22` | New Yardstick CTA |

### Color Rules

**✓ DO:**

- Use `#C88E22` (Harvest Gold) exclusively for primary CTA buttons and active nav
- Always put dark `#1E1A14` (Soil) text on gold buttons — never white
- Use `#FDF4E0` (Gold Light) for badge fills, icon backgrounds, and alert tints
- Use clay only for warnings and destructive/overdue states
- Use rgba tinted backgrounds for alert fills (never full opacity)

**✕ DON’T:**

- Don’t use old yellow `#F5C842` — it has been retired (too close to Sunday’s brand)
- Don’t use straw `#D4A843` — it has been retired along with `--straw`
- Don’t use clay as a general accent — it’s reserved for danger states only
- Don’t place white text on gold buttons
- Don’t mix card styles or use non-parchment card backgrounds

-----

## 5. Logo & Wordmark

The Yardstick logo is a pure SVG wordmark. It consists of:

- **Bitter 900** text in the appropriate color for the surface
- A **yellow ruler underline** (`#F5C842`) directly below the text
- **Tick marks** on the ruler at regular intervals (semi-transparent `#1E1A14`, ~20–25% opacity)

**The ruler is not decorative.** It directly references the brand name and must always be included with the wordmark.

### Wordmark Variants

|Variant          |Text Fill|Ruler    |Background            |
|-----------------|---------|---------|----------------------|
|Light / Parchment|`#1D5C38`|`#C88E22`|`#F7F3EC` or `#EDE8DE`|
|On Forest Green  |`#F7F3EC`|`#C88E22`|`#1D5C38`             |
|On Soil / Footer |`#F7F3EC`|`#C88E22`|`#1E1A14`             |
|On Turf Green    |`#F7F3EC`|`#C88E22`|`#2E7A44`             |

### SVG Code — Wordmark (On Light / Parchment)

```svg
<svg viewBox="0 0 280 52" xmlns="http://www.w3.org/2000/svg" aria-label="Yardstick">
  <text x="0" y="40"
    font-family="Bitter, Georgia, serif"
    font-weight="900"
    font-size="44"
    fill="#1D5C38"
    letter-spacing="-0.5">Yardstick</text>
  <rect x="0" y="45" width="272" height="5" rx="1" fill="#C88E22"/>
  <!-- Tick marks -->
  <rect x="30" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="60" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="91" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="121" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="151" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="181" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="212" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
  <rect x="242" y="45" width="1.5" height="5" fill="#1E1A14" opacity="0.2"/>
</svg>
```

### SVG Code — Wordmark (On Dark)

Change only `fill="#F7F3EC"` on the text element. Ruler (#C88E22) and tick marks stay the same.

### SVG Code — Badge / App Icon (YS)

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="Yardstick">
  <circle cx="50" cy="50" r="48" fill="#1D5C38"/>
  <circle cx="50" cy="50" r="44" fill="none" stroke="#C88E22" stroke-width="3.5"/>
  <text x="50" y="64"
    font-family="Bitter, Georgia, serif"
    font-weight="900"
    font-size="38"
    fill="#F7F3EC"
    text-anchor="middle"
    letter-spacing="-1">YS</text>
  <!-- Ruler bar -->
  <rect x="16" y="75" width="68" height="3.5" rx="1" fill="#C88E22"/>
  <rect x="28" y="75" width="1" height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="40" y="75" width="1" height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="52" y="75" width="1" height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="64" y="75" width="1" height="3.5" fill="#1E1A14" opacity="0.3"/>
  <rect x="76" y="75" width="1" height="3.5" fill="#1E1A14" opacity="0.3"/>
</svg>
```

### Logo Sizing Guidelines

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

**✓ DO:**

- Always include the ruler underline with the wordmark — it’s not optional
- Scale via `height: Xpx; width: auto` — never manually set both dimensions
- Use SVG only — never use a rasterized PNG if SVG is available
- Match the variant to the surface (dark on light, cream on dark)
- Use the YS badge variant for PWA icons and favicons only

**✕ DON’T:**

- Never use the wordmark without the ruler underline
- Never stretch or skew the SVG
- Never place the light wordmark on a light background (or dark on dark)
- Never use the YS badge in the main app header

-----

## 6. Components — Buttons

Four button types. Each has a locked role. Gold is always primary. One primary button per section maximum. All buttons use Nunito font.

### Primary CTA — Harvest Gold

```css
.btn-primary {
  background: #C88E22;      /* --gold */
  color: #1E1A14;           /* dark text — always, never white */
  font-family: var(--ff-body);  /* Nunito */
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 7px;
  border: none;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all 0.18s;
}
.btn-primary:hover {
  background: #A87018;      /* --gold-dark */
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(200,142,34,0.35);
}
```

### Floating Full-Width CTA (Dashboard)

```css
.btn-cta-floating {
  background: #C88E22;      /* --gold */
  color: #1E1A14;
  font-family: var(--ff-body);  /* Nunito */
  font-weight: 700;
  font-size: 0.86rem;
  padding: 13px;
  border-radius: 7px;
  text-align: center;
  width: 100%;
  box-shadow: 0 2px 8px rgba(200,142,34,0.3);
}
```

### Secondary — Dark Green (Confirms & Saves)

```css
.btn-green {
  background: #1D5C38;      /* --green-dark */
  color: #FFFFFF;
  font-family: var(--ff-body);  /* Nunito */
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 7px;
  border: none;
}
.btn-green:hover { background: #2E7A44; }  /* --green */
```

### Outline / Tertiary (Cancel, Export)

```css
.btn-ghost {
  background: transparent;
  color: #1D5C38;           /* --green-dark */
  font-family: var(--ff-body);  /* Nunito */
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 7px;
  border: 1.5px solid #1D5C38;
}
.btn-ghost:hover { background: rgba(29,92,56,0.06); }
```

### Destructive / Warning (Delete, Reset, Overdue)

```css
.btn-clay {
  background: #FAE8E0;      /* --clay-light */
  color: #C05A2C;           /* --clay */
  font-family: var(--ff-body);  /* Nunito */
  font-weight: 700;
  font-size: 0.86rem;
  padding: 10px 22px;
  border-radius: 7px;
  border: 1px solid rgba(192,90,44,0.33);
}
.btn-clay:hover { background: rgba(192,90,44,0.18); }
```

### Small Variant

Add `.btn-sm` to any button type: `padding: 7px 14px; font-size: 0.78rem;`

### Button Rules

**✓ DO:**

- Gold (`btn-primary`) = the one main action per screen
- Dark Green (`btn-green`) = confirmations and saves
- Outline = always the least important action in a group
- Clay = only destructive or overdue/warning states
- Always use Soil text on gold buttons

**✕ DON’T:**

- Don’t use more than one primary (gold) button per section
- Don’t use outline for primary or important actions
- Don’t use old yellow `#F5C842` or straw `#D4A843` for any button
- Don’t put white text on gold buttons
- Don’t use clay for neutral or secondary actions

-----

## 7. Components — Cards

**Locked style: Style F — Parchment Inset.** All content cards use a single consistent treatment. No mixing of card styles within a view.

### Base Card

```css
.card {
  background: var(--cream);         /* #F7F3EC */
  border-radius: 5px;
  padding: 20px;
  box-shadow:
    inset 0 0 0 1px rgba(30,26,20,0.12),  /* inner border */
    0 3px 14px rgba(30,26,20,0.09);        /* soft drop shadow */
}
```

### Card Anatomy

```
┌─────────────────────────────────────┐  ← inset 1px border
│  EYEBROW LABEL (Nunito 800, caps)   │
│  Card Title (Bitter 700)            │
│  Body copy paragraph (Nunito 500)   │
│─────────────────────────────────────│  ← 1px dashed divider
│  Source label            Action →   │
└─────────────────────────────────────┘
```

### Card CSS Classes

```css
.card-eyebrow  { font-family: var(--ff-body); font-size: 0.6rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: var(--stone-light); margin-bottom: 4px; }
.card-title    { font-family: var(--ff-display); font-size: 1.05rem; font-weight: 700; color: var(--green-dark); margin-bottom: 8px; }
.card-body     { font-family: var(--ff-body); font-size: 0.83rem; font-weight: 500; color: var(--stone); line-height: 1.55; }
.card-footer   { margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(30,26,20,0.12); display: flex; justify-content: space-between; align-items: center; }
.card-source   { font-family: var(--ff-body); font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--stone-light); }
.card-action   { font-family: var(--ff-body); font-size: 0.78rem; font-weight: 700; color: var(--green); }
```

### Coach Card Variant

Used for the primary research-backed coaching message on the dashboard. Has a dark forest header.

```css
.card-coach {
  background: var(--cream);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(30,26,20,0.12), 0 3px 14px rgba(30,26,20,0.09);
}
.card-coach-header {
  background: var(--green-dark);
  background-image: radial-gradient(ellipse at 90% 0%, rgba(78,158,64,0.2), transparent 60%);
  padding: 14px 18px;
  border-bottom: 2px solid rgba(200,142,34,0.4);  /* --gold */
}
.card-coach-header .card-eyebrow { color: var(--gold); }
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
.card-stat-val { font-family: var(--ff-display); font-size: 2rem; font-weight: 700; color: var(--green-dark); }
.card-stat-lbl { font-family: var(--ff-body); font-size: 0.58rem; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--stone-light); }
```

*Note: Overdue stat values use `color: var(--clay)` instead of `--green-dark`.*

### Activity Log Items

```css
.log-item       { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(30,26,20,0.08); }
.log-item:last-child { border-bottom: none; padding-bottom: 0; }
.log-dot        { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.log-label      { font-family: var(--ff-body); font-size: 0.84rem; font-weight: 600; color: var(--soil); }
.log-date       { font-family: var(--ff-body); font-size: 0.62rem; font-weight: 500; color: var(--stone-light); }
```

### Log Dot Colors by Activity Type

|Activity   |Dot Color  |Hex      |
|-----------|-----------|---------|
|Mowing     |Green      |`#367C2B`|
|Fertilizer |Straw      |`#D4A843`|
|Watering   |Blue       |`#3B82F6`|
|Seeding    |Clay       |`#C05A2C`|
|Aeration   |Stone      |`#6B6560`|
|Trimming   |Green Light|`#4E9E40`|
|Maintenance|Dark Amber |`#7A5410`|

-----

## 8. Components — Alerts

**Locked style: Filled (rgba tint).** Three semantic alert types. All use a lightly tinted background with a matching border. No solid/inverted alerts in the app.

### Warning Alert (Clay) — Overdue, Risk, Missed Timing

```css
.alert-warn {
  background: rgba(192,90,44,0.10);
  border: 1px solid rgba(192,90,44,0.22);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-warn .alert-title { color: var(--clay); font-weight: 700; }
.alert-warn .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-warn .alert-meta  { color: rgba(192,90,44,0.6); font-family: var(--ff-body); font-size: 0.58rem; font-weight: 700; }
```

### Tip / Info Alert (Gold) — Coaching Tips, Seasonal Windows

```css
.alert-tip {
  background: var(--gold-light);            /* #FDF4E0 */
  border: 1px solid rgba(200,142,34,0.28);  /* --gold */
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-tip .alert-title { color: var(--gold-dark); font-weight: 700; }  /* #A87018 */
.alert-tip .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-tip .alert-meta  { color: rgba(168,112,24,0.65); font-family: var(--ff-body); font-size: 0.58rem; font-weight: 700; }
```

### Success Alert (Green) — Logged, Saved, Reset

```css
.alert-success {
  background: rgba(46,122,68,0.10);         /* --green */
  border: 1px solid rgba(46,122,68,0.22);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-success .alert-title { color: var(--green-dark); font-weight: 700; }
.alert-success .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-success .alert-meta  { color: rgba(46,122,68,0.65); font-family: var(--ff-body); font-size: 0.58rem; font-weight: 700; }
```

### Shared Alert Structure

```css
.alert        { display: flex; align-items: flex-start; gap: 12px; }
.alert-icon   { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
.alert-content { flex: 1; }
.alert-title  { display: block; margin-bottom: 2px; font-family: var(--ff-body); font-weight: 700; }
.alert-text   { display: block; line-height: 1.5; font-family: var(--ff-body); font-weight: 500; }
.alert-meta   { display: block; margin-top: 7px; letter-spacing: 0.08em; text-transform: uppercase; }
```

### Progress Bar Alert Variant (My Garage)

```css
.alert-progress {
  background: rgba(192,90,44,0.08);
  border: 1px solid rgba(192,90,44,0.20);
  border-radius: 5px;
  padding: 14px 16px;
}
.progress-track { height: 6px; background: rgba(30,26,20,0.1); border-radius: 3px; overflow: hidden; }
.progress-fill  { height: 100%; border-radius: 3px; background: linear-gradient(to right, #D4A843, #C05A2C); }
```

Progress fill width set dynamically: `style="width: {(hoursUsed / threshold) * 100}%"` — capped visually at 100%.

-----

## 9. Components — Badges

**Locked style: Outlined.** Activity type badges use transparent background with a colored border and matching text. No filled/solid badges. Badges are display-only labels — never interactive.

### Badge Base

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 5px;
  font-family: var(--ff-body);  /* Nunito */
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  background: transparent;
}
/* Compact mobile variant */
.badge-sm { font-size: 0.64rem; padding: 2px 7px; }
```

### Badge Variants by Activity Type

```css
.badge-mow    { border: 1.5px solid #2E7A44; color: #1D5C38; }  /* ✂ Mowing */
.badge-fert   { border: 1.5px solid #C88E22; color: #A87018; }  /* ⬡ Fertilizer — now gold */
.badge-water  { border: 1.5px solid #3B82F6; color: #1D4ED8; }  /* Watering */
.badge-seed   { border: 1.5px solid #C05A2C; color: #C05A2C; }  /* ◎ Seeding */
.badge-aerate { border: 1.5px solid #6B6560; color: #6B6560; }  /* ⊕ Aeration */
.badge-maint  { border: 1.5px solid #6B6560; color: #6B6560; }  /* Maintenance */
.badge-trim   { border: 1.5px solid #4E9E40; color: #1D5C38; }  /* Trimming */
```

### Zone / Data Badges

```css
/* Use gold-light bg for zone/grass data chips */
.badge-zone  { background: var(--gold-light); border: 1px solid rgba(200,142,34,0.33); color: var(--stone); }
.badge-grass { background: rgba(46,122,68,0.10); border: 1px solid rgba(46,122,68,0.27); color: var(--stone); }
```

### Badge Icons

Use these characters to prefix badge labels: `✂ Mowing` · `⬡ Fertilizer` · `💧 Watering` · `◎ Seeding` · `⊕ Aeration` · `🔧 Maintenance` · `Trimming`

-----

## 10. Layout & Spacing

### App Shell Structure

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
│  5 tabs: Home / History /        │
│  Garage / My Yard / Settings     │
└──────────────────────────────────┘
```

### Spacing Scale

|Token|Value  |Use                                           |
|-----|-------|----------------------------------------------|
|xs   |4px    |Badge padding, micro-gaps                     |
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
.card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px; }

/* Badge row — flex wrap */
.badge-row { display: flex; flex-wrap: wrap; gap: 7px; }
```

-----

## 11. Mobile-First Rules

Yardstick is a mobile-first application. All components are designed for 375px screens first.

### Breakpoints

```css
/* Base: mobile (< 640px) — primary design target */
/* Tablet+: 640px+ */
@media (min-width: 640px) { /* wider content grids */ }
/* Desktop: 1040px — max-width container */
.page-wrap { max-width: 1040px; margin: 0 auto; }
```

### Mobile-First Checklist (for New Features / Content)

- Does it work at 375px width before anything else?
- Is the primary action reachable by thumb (bottom 60% of screen)?
- Are tap targets at least 44px tall?
- Does text remain readable at base size without zooming?
- Are secondary/detail sections collapsible (accordion) on mobile?
- Is the floating CTA button (+ Log Activity) still visible?
- Does the bottom nav remain unobscured?

### Information Hierarchy on Mobile

1. **Always visible:** Coach tip (if active), warning alerts, stat row
1. **One scroll:** Activity log, tip alerts, CTA button
1. **Behind tap/accordion:** Details, historical data, settings, research sources
1. **Never auto-expand on mobile:** Long lists, full program details, export options

-----

## 12. CSS Variables (Design Tokens)

Copy this `:root` block into any new stylesheet, component, or AI-generated code. All values are locked — do not modify without updating this document.

```css
/* ── Yardstick Design Tokens · v3.0 ── */
/* Domain: yardstick.diy · Visual Rebrand 2026 */

:root {
  /* ── Fonts (updated: Courier Prime removed, Cabin replaced by Nunito) ── */
  --ff-display: 'Bitter', Georgia, serif;   /* display headlines · logo · section titles */
  --ff-body:    'Nunito', sans-serif;       /* body copy · buttons · labels · badges · data · everything else */
  /* --ff-mono removed — Courier Prime is no longer part of the system */

  /* ── Greens ── */
  --green:       #2E7A44;   /* primary interactive, success states */
  --green-dark:  #1D5C38;   /* hero bg · headers · logo fill · coach card bg */
  --green-light: #4E9E40;   /* hover accent · decorative gradient ONLY */

  /* ── Gold (replaces #F5C842 yellow — Sunday conflict) ── */
  --gold:       #C88E22;   /* CTA buttons · active nav · ruler underline */
  --gold-dark:  #A87018;   /* gold hover state */
  --gold-light: #FDF4E0;   /* badge fill · alert bg · icon bg */

  /* ── Warning ── */
  --clay:       #C05A2C;   /* warnings · overdue · destructive — unchanged */
  --clay-light: #FAE8E0;   /* clay-tinted alert backgrounds */

  /* ── Surfaces (unchanged) ── */
  --cream: #F7F3EC;    /* card surface (Style F) */
  --bg:    #EDE8DE;    /* app body / page background */
  --white: #FFFFFF;    /* select inputs, swatch panels */

  /*
   * App implementation note: the live app (index.html) uses --ys-* prefixed
   * aliases for these tokens: --ys-cream (#F7F3EC) and --ys-canvas (#EDE8DE).
   * Always apply surfaces via inline style props — never Tailwind bg-* classes —
   * because Tailwind runtime classes have higher specificity than :root variables.
   *   ✓  style={{background:'var(--ys-cream)'}}
   *   ✕  className="bg-white"
   */

  /* ── Text (unchanged) ── */
  --soil:        #1E1A14;   /* primary text, button text on gold */
  --stone:       #6B6560;   /* secondary text, card body */
  --stone-light: #B8B2AC;   /* timestamps, citations, disabled */
}
```

-----

## 13. Do / Don’t Quick Reference

### Typography

|✓ DO                                                     |✕ DON’T                                              |
|---------------------------------------------------------|-----------------------------------------------------|
|Bitter for all display headlines and the logo            |Bitter for body copy or UI labels                    |
|Nunito for all buttons, body text, labels, and badges    |Courier Prime — removed from the system              |
|Nunito for all data, stats, timestamps, and eyebrows     |Cabin — replaced by Nunito                           |
|Nunito 800 + uppercase + letter-spacing 0.1em for eyebrows|Add a third font — the system is complete at two    |
|Bitter italic for emphasis within display headlines      |System fonts (Arial, Helvetica) for any visible UI   |

### Color

|✓ DO                                              |✕ DON’T                                              |
|--------------------------------------------------|-----------------------------------------------------|
|`#C88E22` (Harvest Gold) for all primary CTAs     |Old yellow `#F5C842` — retired, too close to Sunday  |
|Dark `#1E1A14` (Soil) text on all gold buttons    |Straw `#D4A843` — retired along with `--straw`       |
|`#FDF4E0` (Gold Light) for badge fills / icon bgs |White text on gold buttons                           |
|Clay only for warnings and destructive states     |Clay as a general accent color                       |
|rgba tinted backgrounds for all alert fills       |Solid fills for alert backgrounds                    |

### Logo

|✓ DO                                         |✕ DON’T                             |
|---------------------------------------------|------------------------------------|
|Always include the ruler underline           |Wordmark without the ruler underline|
|Scale via `height: Xpx; width: auto`         |Stretch or skew the SVG             |
|Use SVG, never rasterized PNG of the wordmark|Light wordmark on a light background|
|YS badge variant for icons/favicons only     |YS badge in the main app header     |

### Cards & Alerts

|✓ DO                                                    |✕ DON’T                                          |
|--------------------------------------------------------|-------------------------------------------------|
|Parchment inset shadow for all cards                    |Mix card styles within a single view             |
|`style={{background:’var(--ys-cream)’}}` for card bg    |`className="bg-white"` — Tailwind overrides tokens|
|`style={{background:’var(--ys-canvas)’}}` for page bg   |`className="bg-gray-50"` — same reason            |
|rgba tinted backgrounds for all alerts                  |Solid/inverted alert fills                       |
|Always include a university source citation             |Coach content without a university reference     |
|Clay progress bars for overdue maintenance              |Green progress bars for overdue states           |

### Buttons

|✓ DO                                           |✕ DON’T                                 |
|-----------------------------------------------|----------------------------------------|
|Gold (`btn-primary`) for the one main action   |More than one primary button per section|
|Outline for cancel / least important action    |Outline for primary or important actions|
|Clay only for destructive/warning actions      |Clay for neutral or secondary actions   |
|Soil text on gold buttons                      |White text on gold buttons              |

### Copy & Voice

|✓ DO                                        |✕ DON’T                                            |
|--------------------------------------------|---------------------------------------------------|
|Reference university extension as the source|Legacy names: “Easy Green”, “Lawn Care Tracker”    |
|Use approved taglines verbatim              |Hype language: amazing, revolutionary, game-changer|
|Lead with user outcomes, not feature lists  |Exclamation marks in app UI copy                   |
|Sentence case for all headlines             |Promise specific outcomes (“perfect lawn”)         |

-----

## Changelog

|Version|Date|Changes                                                                                                                                                                                                                                                   |
|-------|----|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|v1.0   |2025|Initial locked system — Bitter/Cabin/Courier Prime, Parchment theme, Style F cards, filled alerts, outlined badges, SVG wordmark, yellow CTA                                                                                                              |
|v2.0   |2026|Consolidated brand book — merged design system and brand book into single AI-ready reference. Added complete SVG code, full CSS component library, mobile-first checklist, activity log dot colors, progress bar variant. Updated domain to yardstick.diy.|
|v2.1   |2026|Copy update — removed “no account required” / “no login” framing across all approved copy. Updated Long Description and Short Description to lead with free account creation. Added explicit DON’T rule against no-login language.                        |
|v2.2   |2026|Surface color enforcement — documented that app implementation uses `--ys-cream` / `--ys-canvas` aliases for `--cream` / `--bg`. Added rule: always use `style={{background:’var(--ys-cream)’}}` inline props for card surfaces, never Tailwind `bg-white` (Tailwind runtime classes have higher CSS specificity than `:root` variables and silently override tokens). Updated Cards & Alerts Do/Don’t table. Removed all `bg-white` / `bg-gray-50` from 4 component files.|
|v3.0   |2026|Visual Rebrand 2026 — **Font system:** Cabin removed, Nunito replaces it as the body/UI font. Courier Prime removed entirely. System now has two fonts only: Bitter (display) + Nunito (everything else). **Colors:** `--green-dark` updated to `#1D5C38`, `--green` updated to `#2E7A44`. `--yellow` (#F5C842) and `--straw` (#D4A843) retired — too close to Sunday’s brand palette. New gold system added: `--gold` (#C88E22, Harvest Gold), `--gold-dark` (#A87018), `--gold-light` (#FDF4E0). `--clay-light` (#FAE8E0) added. **Logo:** Ruler and badge ring updated to `#C88E22`. Wordmark green updated to `#1D5C38`. **Components:** All `--ff-mono` references migrated to `--ff-body`. Card eyebrows, stat labels, log dates, alert meta all use Nunito. Tip alert updated from straw to gold palette. Fertilizer badge updated from straw to gold. New zone/grass badge variants added.|

-----

*Add new entries to the changelog whenever design decisions are updated. Increment the version for significant changes (new component patterns, palette additions).*

**Yardstick · yardstick.diy · Field & Soil · Parchment Theme · v3.0**
