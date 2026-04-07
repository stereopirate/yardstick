# Yardstick — Brand Book

**Version 2.0 · 2026 · yardstick.diy**
**Theme: Field & Soil · Parchment**

> The canonical visual and brand reference for Yardstick. Every design decision, color, font, component, and copy rule lives here. When creating any visual content — app UI, social graphics, marketing materials, or AI-generated assets — consult this document first.

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

Three fonts. Three distinct roles. Never swap them, never add a fourth. The system is complete as-is.

### Font Stack

|Role           |Font         |Weights             |Use For                                                                    |
|---------------|-------------|--------------------|---------------------------------------------------------------------------|
|**Display**    |Bitter       |700, 900, 900 italic|Headlines, logo wordmark, coach card titles, section headers               |
|**Body / UI**  |Cabin        |400, 500, 600, 700  |All UI copy, body text, buttons, labels, navigation                        |
|**Data / Mono**|Courier Prime|400, 700            |Data readouts, stat labels, source citations, timestamps, zone/grass labels|

### Google Fonts Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,600;0,700;0,900;1,700&family=Cabin:wght@400;500;600;700&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
```

### CSS Variables

```css
--ff-display: 'Bitter', Georgia, serif;
--ff-body: 'Cabin', sans-serif;
--ff-mono: 'Courier Prime', monospace;
```

### Type Scale

|Class             |Font         |Size                    |Weight|Use                     |
|------------------|-------------|------------------------|------|------------------------|
|`.type-display`   |Bitter       |clamp(2rem, 5vw, 3.5rem)|900   |Hero headlines          |
|`.type-display-sm`|Bitter       |clamp(1.4rem, 3vw, 2rem)|700   |Section headers         |
|`.type-display-it`|Bitter italic|inherited               |700   |Emphasis in headers     |
|`.type-ui-heading`|Cabin        |1.05–1.2rem             |700   |Card titles, subsections|
|`.type-body`      |Cabin        |0.86–0.92rem            |400   |Body copy               |
|`.type-label`     |Cabin        |0.72–0.82rem            |600   |UI labels, badges       |
|`.type-mono-data` |Courier Prime|0.82–0.86rem            |400   |Data readouts           |
|`.type-mono-label`|Courier Prime|0.56–0.66rem            |400   |Eyebrows, timestamps    |

### Typography Rules

**✓ DO:**

- Use Bitter for all headers and the logo wordmark
- Use Cabin for every button, label, and body paragraph
- Use Courier Prime for data, stats, zones, and timestamps
- Pair Courier Prime labels with `letter-spacing: 0.14em+` and `text-transform: uppercase`

**✕ DON’T:**

- Don’t use Bitter for body copy or UI labels
- Don’t use Courier Prime for body paragraphs
- Don’t add a fourth font — the system is complete
- Don’t use system fonts (Arial, Helvetica) for any visible UI text
- Don’t use Courier Prime in mixed-case for labels

-----

## 4. Color Palette

**Theme name:** Field & Soil · Parchment

All colors are used at full opacity in their assigned roles. Tints (rgba) are used for alert backgrounds and badge fills only. Every color has a locked role — do not reassign them.

### Primary Colors

|Name             |Hex      |CSS Variable   |Role                                                  |
|-----------------|---------|---------------|------------------------------------------------------|
|**Forest Dark**  |`#1E4D18`|`--green-dark` |App header bg, coach card header, logo fill on light  |
|**Turf Green**   |`#367C2B`|`--green`      |Primary interactive, success states, log dots         |
|**Spring**       |`#4E9E40`|`--green-light`|Hover accent, decorative gradients ONLY               |
|**Bright Yellow**|`#F5C842`|`--yellow`     |CTA buttons, active nav, ruler underline, temp display|
|**Warm Straw**   |`#D4A843`|`--straw`      |Fertilizer badge borders, tip alert borders ONLY      |
|**Brick Clay**   |`#C05A2C`|`--clay`       |Warnings, overdue states, destructive actions ONLY    |

### Surface Colors

|Name         |Hex      |CSS Variable|Role                                              |
|-------------|---------|------------|--------------------------------------------------|
|**Parchment**|`#F7F3EC`|`--cream`   |Card surface (Style F), coach card body, log cards|
|**Canvas**   |`#EDE8DE`|`--bg`      |App body background, page background              |
|**White**    |`#FFFFFF`|`--white`   |Select inputs, swatch info panels                 |

### Text Colors

|Name           |Hex      |CSS Variable   |Role                                         |
|---------------|---------|---------------|---------------------------------------------|
|**Rich Soil**  |`#1E1A14`|`--soil`       |Primary text, button text on yellow          |
|**Fieldstone** |`#6B6560`|`--stone`      |Secondary text, card body copy, alert body   |
|**Stone Light**|`#B8B2AC`|`--stone-light`|Timestamps, source citations, disabled states|

### Color Rules

**✓ DO:**

- Use `#F5C842` (yellow) exclusively for primary CTA buttons
- Always put dark `#1E1A14` text on yellow buttons — never white
- Use clay only for warnings and destructive/overdue states
- Use rgba tinted backgrounds for all alert fills (never full opacity)

**✕ DON’T:**

- Don’t use straw (`#D4A843`) for any interactive element — insufficient contrast against cream
- Don’t use clay as a general accent — it’s reserved for danger states only
- Don’t place white text on yellow buttons
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
|Light / Parchment|`#1E4D18`|`#F5C842`|`#F7F3EC` or `#EDE8DE`|
|On Forest Green  |`#F7F3EC`|`#F5C842`|`#1E4D18`             |
|On Soil / Footer |`#F7F3EC`|`#F5C842`|`#1E1A14`             |
|On Turf Green    |`#F7F3EC`|`#F5C842`|`#367C2B`             |

### SVG Code — Wordmark (On Light / Parchment)

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

Change only `fill="#F7F3EC"` on the text element. Ruler and tick marks stay the same.

### SVG Code — Badge / App Icon (YS)

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

Four button types. Each has a locked role. Yellow is always primary. One primary button per section maximum.

### Primary CTA — Bright Yellow

```css
.btn-primary {
  background: #F5C842;
  color: #1E1A14;           /* dark text — always, never white */
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

### Floating Full-Width CTA (Dashboard)

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

### Secondary — Green (Confirms & Saves)

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

### Ghost / Tertiary (Cancel, Export)

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

### Destructive / Warning (Delete, Reset, Overdue)

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

**✓ DO:**

- Yellow (`btn-primary`) = the one main action per screen
- Green (`btn-green`) = confirmations and saves
- Ghost = always the least important action in a group
- Clay = only destructive or overdue/warning states

**✕ DON’T:**

- Don’t use more than one primary (yellow) button per section
- Don’t use ghost for primary or important actions
- Don’t use straw (`#D4A843`) for any button
- Don’t put white text on yellow buttons
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
│  EYEBROW LABEL (Courier Prime, sm)  │
│  Card Title (Bitter 700)            │
│  Body copy paragraph (Cabin 400)    │
│─────────────────────────────────────│  ← 1px dashed divider
│  Source label            Action →   │
└─────────────────────────────────────┘
```

### Card CSS Classes

```css
.card-eyebrow  { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: var(--stone-light); margin-bottom: 4px; }
.card-title    { font-family: var(--ff-display); font-size: 1.05rem; font-weight: 700; color: var(--green-dark); margin-bottom: 8px; }
.card-body     { font-family: var(--ff-body); font-size: 0.83rem; color: var(--stone); line-height: 1.55; }
.card-footer   { margin-top: 14px; padding-top: 12px; border-top: 1px dashed rgba(30,26,20,0.12); display: flex; justify-content: space-between; align-items: center; }
.card-source   { font-family: var(--ff-mono); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--stone-light); }
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
  border-bottom: 2px solid rgba(245,200,66,0.4);
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
.card-stat-val { font-family: var(--ff-display); font-size: 2rem; font-weight: 700; color: var(--green-dark); }
.card-stat-lbl { font-family: var(--ff-mono); font-size: 0.58rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--stone-light); }
```

*Note: Overdue stat values use `color: var(--clay)` instead of `--green-dark`.*

### Activity Log Items

```css
.log-item       { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(30,26,20,0.08); }
.log-item:last-child { border-bottom: none; padding-bottom: 0; }
.log-dot        { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.log-label      { font-family: var(--ff-body); font-size: 0.84rem; font-weight: 600; color: var(--soil); }
.log-date       { font-family: var(--ff-mono); font-size: 0.62rem; color: var(--stone-light); }
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
.alert-warn .alert-meta  { color: rgba(192,90,44,0.6); font-family: var(--ff-mono); font-size: 0.58rem; }
```

### Tip / Info Alert (Straw) — Coaching Tips, Seasonal Windows

```css
.alert-tip {
  background: rgba(212,168,67,0.12);
  border: 1px solid rgba(212,168,67,0.28);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-tip .alert-title { color: #7A5410; font-weight: 700; }
.alert-tip .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-tip .alert-meta  { color: rgba(122,84,16,0.55); font-family: var(--ff-mono); font-size: 0.58rem; }
```

### Success Alert (Green) — Logged, Saved, Reset

```css
.alert-success {
  background: rgba(54,124,43,0.10);
  border: 1px solid rgba(54,124,43,0.22);
  border-radius: 5px;
  padding: 14px 16px;
}
.alert-success .alert-title { color: var(--green-dark); font-weight: 700; }
.alert-success .alert-text  { color: var(--soil); font-size: 0.8rem; }
.alert-success .alert-meta  { color: rgba(54,124,43,0.55); font-family: var(--ff-mono); font-size: 0.58rem; }
```

### Shared Alert Structure

```css
.alert        { display: flex; align-items: flex-start; gap: 12px; }
.alert-icon   { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
.alert-content { flex: 1; }
.alert-title  { display: block; margin-bottom: 2px; font-family: var(--ff-body); }
.alert-text   { display: block; line-height: 1.5; font-family: var(--ff-body); }
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
  padding: 3px 10px;
  border-radius: 3px;
  font-family: var(--ff-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  background: transparent;
}
/* Compact mobile variant */
.badge-sm { font-size: 0.64rem; padding: 2px 7px; }
```

### Badge Variants by Activity Type

```css
.badge-mow    { border: 1.5px solid #367C2B; color: #1E4D18; }  /* ✂ Mowing */
.badge-fert   { border: 1.5px solid #D4A843; color: #7A5410; }  /* ⬡ Fertilizer */
.badge-water  { border: 1.5px solid #3B82F6; color: #1D4ED8; }  /* Watering */
.badge-seed   { border: 1.5px solid #C05A2C; color: #C05A2C; }  /* ◎ Seeding */
.badge-aerate { border: 1.5px solid #6B6560; color: #6B6560; }  /* ⊕ Aeration */
.badge-maint  { border: 1.5px solid #7A5410; color: #7A5410; }  /* Maintenance */
.badge-trim   { border: 1.5px solid #4E9E40; color: #1E4D18; }  /* Trimming */
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
/* ── Yardstick Design Tokens · v2.0 ── */
/* Domain: yardstick.diy */

:root {
  /* ── Fonts ── */
  --ff-display: 'Bitter', Georgia, serif;
  --ff-body:    'Cabin', sans-serif;
  --ff-mono:    'Courier Prime', monospace;

  /* ── Greens ── */
  --green:       #367C2B;   /* primary interactive, success states */
  --green-dark:  #1E4D18;   /* headers, coach card bg, logo fill on light */
  --green-light: #4E9E40;   /* hover accent / decorative gradient ONLY */

  /* ── Yellows / Ambers ── */
  --yellow: #F5C842;   /* CTA buttons, active nav, ruler underline */
  --straw:  #D4A843;   /* fert badge border & tip alert border ONLY */

  /* ── Warning ── */
  --clay: #C05A2C;     /* warnings, overdue states, destructive actions */

  /* ── Surfaces ── */
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

  /* ── Text ── */
  --soil:        #1E1A14;   /* primary text, button text on yellow */
  --stone:       #6B6560;   /* secondary text, card body */
  --stone-light: #B8B2AC;   /* timestamps, citations, disabled */
}
```

-----

## 13. Do / Don’t Quick Reference

### Typography

|✓ DO                                             |✕ DON’T                                       |
|-------------------------------------------------|----------------------------------------------|
|Bitter for all display headlines and the logo    |Bitter for body copy or UI labels             |
|Cabin for all buttons, body text, and UI labels  |Courier Prime for body paragraphs             |
|Courier Prime for all data, stats, timestamps    |System fonts (Arial, Helvetica) for visible UI|
|Courier Prime: uppercase + letter-spacing 0.14em+|Add a fourth font — the system is complete    |

### Color

|✓ DO                                         |✕ DON’T                                      |
|---------------------------------------------|---------------------------------------------|
|`#F5C842` yellow exclusively for primary CTA |Straw (`#D4A843`) for any interactive element|
|Dark (`#1E1A14`) text on all yellow buttons  |White text on yellow buttons                 |
|Clay only for warnings and destructive states|Clay as a general accent color               |
|rgba tinted backgrounds for all alert fills  |Solid fills for alert backgrounds            |

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

|✓ DO                                          |✕ DON’T                                 |
|----------------------------------------------|----------------------------------------|
|Yellow (`btn-primary`) for the one main action|More than one primary button per section|
|Ghost for cancel / least important action     |Ghost for primary or important actions  |
|Clay only for destructive/warning actions     |Clay for neutral or secondary actions   |

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

-----

*Add new entries to the changelog whenever design decisions are updated. Increment the version for significant changes (new component patterns, palette additions).*

**Yardstick · yardstick.diy · Field & Soil · Parchment Theme**
