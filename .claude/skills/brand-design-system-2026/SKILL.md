---
name: brand-design-system-2026
description: "The Rhapsody visual design system — the 2026 code-based brand identity (Rhapsody Brand VisID Guide, September 2026). Load this whenever you DESIGN or PRODUCE a visual Rhapsody asset: web/landing pages, HTML mockups, heroes, email templates and signatures, social graphics, display/banner ads, slide/PowerPoint visuals, charts and data viz, icons, or any layout that must look on-brand. Also load when applying Rhapsody colors, typography, the logo, the dots device, the light devices (Aurora, Burst, Plexus), portrait treatments, or component styling, and when someone says 'make this on-brand,' 'use the design system,' 'use Rhapsody colors/fonts,' 'brand this layout,' 'build a landing page,' 'design an ad,' or wants to sync the design system in Claude Design (design-sync). This governs VISUAL output; for voice, copywriting, and product-naming/trademark rules use rhapsody-brand alongside it. When in doubt on anything visual and Rhapsody, use this skill."
---

# Rhapsody Brand Design System 2026

The visual identity of Rhapsody, in code. This is the design half of the brand: color, type,
logo, graphic devices, components, and layout patterns. It is the September 2026 standard of the
*Rhapsody Brand VisID Guide*.

**Company name is always "Rhapsody" — never "Rhapsody Health."**

## What this skill is, and how it relates to `rhapsody-brand`

- **This skill (`brand-design-system-2026`)** governs how Rhapsody **looks** — anything you design
  or lay out. Reach for it whenever pixels are involved.
- **`rhapsody-brand`** governs how Rhapsody **reads** — voice, messaging, positioning, and the
  **Rhapsody Axon™ product-naming and trademark rules**. Load it alongside this one for any asset
  that also carries copy (which is nearly all of them). The trademark rules there are mandatory in
  every asset; do not restate or override them here — follow them.

When both are loaded, this skill wins on visual decisions (color, type, logo, devices, layout) and
`rhapsody-brand` wins on words. They do not conflict; they cover different surfaces.

## Source of truth: the code-based design system

The canonical system is a git repository that syncs to a **Claude Design** project so each file
appears as a component card. When working inside that repo (`rhapsody-design-system`), the repo
files are the source of truth and override anything below if they ever drift:

```
tokens.css            Design tokens (color, type) + reusable classes + logo image classes
assets/               Tightly-cropped logo/monogram rasters the cards reference inline
brand/                Full downloadable logo package (SVG + EPS vectors, 300/72 dpi PNG/JPG)
components/           One HTML preview per component/pattern — each becomes a card in Claude Design
downloads/            Ready-to-use masters (e.g. the 2026 PowerPoint template .pptx)
templates/            Claude Design canvas templates (e.g. display-ads/DisplayAds.dc.html)
deliverables/         Shareable, self-contained outputs (brand guideline HTML/PDF, signature package)
```

`assets/tokens.css` is bundled with this skill as a portable copy of the tokens. When you build a
standalone on-brand HTML asset, either link the repo's `tokens.css` (if you're in the repo) or copy
the `:root` variables from `assets/tokens.css` into your file. Logo art is bundled in `assets/`.

**A full component-by-component catalog lives in `references/components.md`.** Read it when you need
the exact treatment for a specific component or pattern (email, social, hero, tables, quotes, etc.).

## Syncing to Claude Design (`/design-sync`)

The design system is pushed to the **Rhapsody Design System** project in Claude Design with the
`design-sync` skill. **This skill is invoked by the user only** — you cannot trigger it. When the
user wants to add or update a card, tell them to type `/design-sync` themselves, choose the
**Rhapsody Design System** project, and review the plan before approving.

- Sync is **incremental**: edit one `components/*.html` file, re-sync, and its card updates in place.
- Each card's identity comes from its **first line** marker:
  `<!-- @dsCard group="…" name="…" subtitle="…" width="…" height="…" -->`. Claude Design reads these
  to build and group the pane.
- **Never hand-edit or upload `_ds_manifest.json`.** The app compiles it (including the `templates`
  registry that powers the "Choose a template" gallery). Uploading your own copy can wipe registered
  templates. Add cards by adding `components/*.html` files with `@dsCard` markers, then let the user
  run `/design-sync`.
- **Watch every plan for deletions** before the user approves — a delete can remove a card or a
  registered template.

---

## 1. Color

Tokens (from `tokens.css` — these exact hex values are the standard):

| Token | Hex | Tier | Role |
|---|---|---|---|
| `--blue` | `#1A81F4` | Primary | Rhapsody Blue — the dominant brand color: panels, CTAs, links, brand moments |
| `--navy` | `#0B2C47` | Primary | Rhapsody Navy — page/section grounds, dark headers, the only ground for light devices |
| `--lblue` | `#B4D8FF` | Secondary | Light blue — accent on dark grounds, second tone in two-tone headlines |
| `--teal` | `#23C5BF` | Secondary | Teal — separator seam, "automate" pathway, one optional accent |
| `--purple` | `#7340E4` | Tertiary | Accent only |
| `--orange` | `#FA7E2E` | Tertiary | Accent only |
| `--black` | `#050F19` | Neutral | Text/ink |
| `--dgray` | `#7E858C` | Neutral | Secondary text, captions |
| `--lgray` | `#D9DFE6` | Neutral | Hairlines, borders |
| `--grayblue` | `#E8EDF2` | Neutral | Section background fill |
| `--tile` | `#E9EEF4` | Neutral | Icon-tile background |

**Default palette hierarchy.** Most layouts should be **White or Navy + Rhapsody Blue**, with **one**
optional secondary accent (Light Blue or Teal) only when needed. **No more than three brand colors
per layout**, and reaching three is not a goal.

**Tertiary colors are restricted.** Purple and Orange are reserved for controlled accents,
exceptional emphasis, and **data visualization**. Never use either as a general section color,
headline color, CTA color, background theme, pathway color, or decorative fill. They do **not** count
as a freely available third color — use them only where a rule explicitly authorizes them (e.g. the
multicolor dot field, chart series).

**No custom gradients.** Flat brand colors only. The light devices (Section 5) are the only glow/blend
element, and they are approved masters — not gradients you build.

**Text color**
- Navy (`--navy`) or black ink on white/light grounds; Rhapsody Blue for links and small emphasis.
- White on navy, blue, teal, purple, or orange grounds.
- On navy, a white + **light-blue** two-tone headline is the signature treatment.

**Accessibility & pairings**
- Maintain readable contrast; favor the approved pairings (white on navy/blue, navy on white/gray-blue).
- **Do not set text on teal.** Even though black on teal passes contrast, it isn't visually right —
  omit it. (This supersedes any older "text on teal" allowance.)
- Rhapsody Blue on navy is fine for **large** elements and accents, not for long body copy.

**Charts / data viz color order** (same order is used for pathways):
Navy → Rhapsody Blue → Teal → Purple → Orange → Light blue, then neutrals. Keep series minimal;
this is the one place Purple and Orange appear freely.

---

## 2. Typography

- **Poppins** for headlines and body — weights **300/400/500/600**. Body and most headings are
  **Regular (400)**; the hero/H1 steps up to **Medium (500)**. Fallback: Arial only if Poppins is
  unavailable. Never Calibri or Helvetica.
- **IBM Plex Mono** (`--mono`, 400/500) for **eyebrows** and technical annotations only — the small
  uppercase, letter-spaced label above a headline. It is an accent typeface, never body copy.

Type scale (from `tokens.css`):

| Style | Weight | Size |
|---|---|---|
| H1 / hero | Poppins Medium (500) | 38px |
| H2 | Poppins Regular (400) | 27px |
| H3 | Poppins Regular (400), blue | 18px |
| H4 / label | Poppins Regular (400), uppercase, tracked, gray | 13px |
| Body (`p`) | Poppins Regular (400) | 15px |
| Eyebrow | IBM Plex Mono Medium (500), uppercase, `0.17em` tracking, blue | 12px |

Rules that matter:
- **Two-tone headline**: on navy, lead white and finish the key phrase in **light blue** (`--lblue`).
- **`strong` is Medium (500)**, not bold — emphasis stays quiet.
- **If content doesn't fit, change the copy — don't crush the type.** Never tighten tracking/leading
  or shrink below the minimums to force a fit. Rewrite shorter instead.
- Eyebrows are short and functional (e.g. `PLATFORM`, `CUSTOMER STORY`), set in mono.

---

## 3. Logo

Bundled art (in this skill's `assets/`, mirrored from the repo):

| File | Use on |
|---|---|
| `logo-primary.png` / `logo-primary.svg` | Light backgrounds — navy bar + blue wordmark (the primary lockup) |
| `logo-blueline.png` | Dark/navy backgrounds — blue wordmark + white line (large sizes only) |
| `logo-white.png` | Dark backgrounds where one-color white is needed |
| `logo-black.png` | One-color navy/black on light backgrounds |
| `monogram-blue-navy.png` | The "R" monogram — small spaces only (favicon, avatar, merch) |

In HTML the repo also exposes these as background classes via `tokens.css`: `.logo-i` plus
`.logo-bb` (primary), `.logo-blk`, `.logo-wht`, `.logo-blw` (blue wordmark + white line, dark).

Rules:
- **Light ground → navy-bar + blue wordmark.** **Dark/navy ground → blue wordmark + white line**
  (large) or one-color white. Never place the light-ground lockup on a dark ground or vice versa.
- Wordmark always reads **RHAPSODY** in all caps. Keep clear space equal to the "R" mark on all sides.
- Minimum size: 108px on screen / 1.5in in print. Monogram only when the full logo won't fit.
- **Never** recolor, stretch, rotate, add shadow/outline/effects, tilt, or lay content over the logo.
- Product lockups follow the copy rule — the mark reads "Rhapsody Axon," never "Axon" alone (see
  `rhapsody-brand` for the full Axon™ trademark rules).

---

## 4. Corners & shape

- **Square the top, round the bottom.** For framing modules and content blocks, square the top two
  corners and round the bottom two (≈12px). "Engineered at the top, settled at the base." This is the
  default frame; keep it consistent across a page or deck.
- **Pills are for CTAs only.** Fully rounded pill shapes are reserved for buttons/CTAs — don't use
  pill framing for content cards, images, or panels.

---

## 5. Graphic devices

**Use exactly one graphic device per layout** — dots *or* a light device, never both, and never
stacked with heavy photography treatments.

### Dots (primary device)
- **Structured only.** Use the **uniform scattered field** — equal-size dots, densest at one edge and
  thinning inward. Never a random scatter. **The size-graduated grid is retired.**
- Two registers are equally on-brand: **white dots on Rhapsody Blue**, and the **multicolor field**.
  (An earlier draft wrongly called multicolor off-brand — it is approved.)
- **Big dot**: a closed, approved family (one per background/placement/format, plus three variants),
  shipped as transparent SVG + 2× PNG. Use one **as-is, flipped, or rotated 90°** — never hand-build
  or restyle it. Anchor color and companions are set by the background and are not interchangeable;
  the anchor is never the background hue.
- Dots belong on blue or navy grounds (or as the multicolor field) — not scattered on plain white as
  filler.

### Light devices (navy grounds only)
Four soft light-based devices carry atmosphere for photo-free digital moments (heroes, social, slides):

| Device | Meaning | Color lead |
|---|---|---|
| **Aurora** | A soft blended wash — harmony across the system | Teal-led |
| **Aurora ribbon** | A flowing band of light — motion & large-scale (video, animated headers, big heroes) | Runs through all three |
| **Burst** | Soft rays from a core, fading out — breakthrough moments | Purple-led |
| **Plexus** | A connected network of points — connectivity/interoperability moments (testimonials, platform sections) | Blue-led |

Light-device rules:
- **Navy ground only.** Never on blue, white, or photography. On those, use dots or photography.
- **Glows use teal, blue, and purple only — never orange.** Keep each glow within three colors and
  within its recommended lead.
- **Offset the glow into open space** so copy sits on the calm side, never on the brightest point.
- Reserve **Plexus** for connection moments and the **Aurora ribbon** for motion/large scale; use the
  plain **Aurora** wash for everyday layouts where text sits close.
- These are approved masters, not effects you build.

---

## 6. Iconography

- **Single outline family**: stroke-only, **1.7 weight**, `currentColor`. (Adopted from the homepage
  prototype, July 2026 — the old two-color / icon-on-circle line icons are retired.)
- Feature icons sit on a **44px gray tile** (`--tile`, `#E9EEF4`); the glyph is Rhapsody Blue.
- Functional marks (check / cross) at **weight 3**.
- One color per icon. Never add outlines, shadows, or color effects.

---

## 7. Photography & portraits

- **Bright, natural-lit, authentic.** People facing camera or each other, eye contact, real
  discussion; inclusive teams (IT, clinicians, admins); modern workspaces with visible data/screens.
- **Favor tech-focused imagery** (screens, dashboards, command centers, code) — increasingly preferred
  over purely clinical/healthcare scenes.
- **Avoid** dark "tech-noir" imagery, blur, harsh flare, backs-to-camera, tight huddles turned away,
  staged handshakes, and generic stock.
- **Portrait treatments** (modern set — the thick color ring is retired): **thin ring**, **arc
  accent**, **rounded-rectangle card**, or **editorial split**. Rings/arcs use brand colors (blue,
  teal, orange, purple) — never a thick ring, never white or thin white outlines.

## 8. Illustration

- Legacy line-art, spot illustrations, character/cartoon scenes, and the busy circle/photo/icon-overlay
  montages are **retired for all new work**. Replace with real photography, product/interface imagery,
  diagrams, data visualization, or the approved abstract devices (dots, light devices).

---

## 9. Component & pattern catalog

Each item below is a card in the design system. For the exact treatment of any one, read
`references/components.md`.

**Foundations** — Brand expression · Color · Typography · Layout & spacing · Pathways · Corners & shape
**Brand** — Logo & wordmark
**Components** — Buttons & CTAs · Charts & graphs · Partner logos (brackets) · Quotes & testimonials ·
Stats · Tables · Dot accents
**Graphic devices** — Devices at a glance · Dots overview · Scattered dot field · Big dot · Light devices
**Iconography** — Icon library
**Imagery** — Illustration · Photography & portraits
**Patterns** — Hero · Email template · Email signature · Social posts · Product launch announcement ·
Name lockup · **Display ads (blue-first)** · **PowerPoint deck template (downloadable .pptx master)**
**Reference** — Quick corrections log

Notable patterns:
- **Display ads** are **blue-first**: Rhapsody Blue ground by default, logo always prominent, very few
  large words (billboard style), one clear action. Covers every IAB placement. Canvas template lives at
  `templates/display-ads/DisplayAds.dc.html`.
- **PowerPoint**: the official 2026 deck master is `downloads/Rhapsody-PowerPoint-Template-2026.pptx`.
  It is **blue-first** (Rhapsody Blue default ground, navy occasional, logo always prominent). For the
  mechanics of editing decks, also load the `pptx` skill; for slide copy and the Axon™ rules, load
  `rhapsody-brand`.

---

## 10. September 2026 changes (what's current vs. retired)

Fold these in — they supersede earlier drafts and the older `rhapsody-brand` PPT-era visual notes:

- **Navy is `#0B2C47`** (the former near-black `#080C47` is superseded).
- **Headings in Poppins Regular (400)**; hero steps to Medium (500). (Older "Poppins Light only"
  guidance is superseded for the design system.)
- **Light blue refreshed to `#B4D8FF`.**
- **Tertiary tightened**: Purple and Orange are accents / emphasis / data-viz only.
- **"Text on teal" removed** — omit it.
- **Graduated dot grid retired** → uniform scattered field only. Multicolor dots are approved.
- **Light devices** are Aurora, Aurora ribbon, Burst, Plexus (Pulse retired).
- **Icons** → single outline family (stroke-only, 1.7 weight, `currentColor`, 44px gray tile).
- **Portraits** → thin ring / arc / card / editorial split (thick color ring retired).
- **Illustration** legacy styles retired.
- New sections added: **Brand Expression** and **Illustration**.
- Rule: **if copy doesn't fit, shorten the copy — don't crush the type.**

---

## 11. Compliance self-check (run before delivering any visual asset)

```
□ Ground + primary is White/Navy + Rhapsody Blue; ≤ 3 brand colors; three is not a target
□ Purple/Orange only as accent, emphasis, or data viz — never section/headline/CTA/background
□ No custom gradients (light devices are the only glow, and they're approved masters)
□ Navy is #0B2C47; Rhapsody Blue is #1A81F4; light blue is #B4D8FF
□ Poppins Regular for body/headings, Medium for hero; IBM Plex Mono for eyebrows only
□ No text set on teal
□ Two-tone headline on navy = white + light blue
□ If it didn't fit, the copy was shortened — the type was not crushed
□ Logo: navy-bar/blue on light, blue-wordmark/white-line on dark; RHAPSODY all caps; clear space kept
□ Logo not recolored, stretched, rotated, shadowed, or overlaid
□ Corners: squared top, rounded bottom on modules; pills reserved for CTAs
□ Exactly one graphic device in the layout (dots OR a light device — never both)
□ Dots are the uniform scattered field (not graduated, not random); big dot used as-is/flipped/90°
□ Light devices on navy only; glow is teal/blue/purple (never orange); offset into open space
□ Icons: single outline family, 1.7 weight, currentColor, 44px gray tile
□ Photography: bright, natural-lit, tech-forward, faces-forward, inclusive; no tech-noir/blur
□ Portraits use thin ring / arc / card / editorial split — no thick ring
□ No retired illustration styles
□ Copy follows rhapsody-brand voice; Rhapsody Axon™ naming/trademark rules applied (that skill)
□ Company name is "Rhapsody," never "Rhapsody Health"
```
