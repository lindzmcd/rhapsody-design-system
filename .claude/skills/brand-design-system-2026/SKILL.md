---
name: brand-design-system-2026
description: "The Rhapsody visual design system — the 2026 code-based brand identity (Rhapsody Brand VisID Guide, September 2026). Load this whenever you DESIGN or PRODUCE a visual Rhapsody asset: web/landing pages, HTML mockups, heroes, email templates and signatures, social graphics, display/banner ads, slide/PowerPoint visuals, white papers, release notes, security advisories and other technical documents (including Word templates), charts and data viz, icons, or any layout that must look on-brand. Also load when applying Rhapsody colors, typography, the logo, the dots device, the Aurora light device (glow), portrait treatments, or component styling, and when someone says 'make this on-brand,' 'use the design system,' 'use Rhapsody colors/fonts,' 'brand this layout,' 'build a landing page,' 'design an ad,' or wants to sync the design system in Claude Design (design-sync). This governs VISUAL output; for voice, copywriting, and product-naming/trademark rules use rhapsody-brand alongside it. When in doubt on anything visual and Rhapsody, use this skill."
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
templates/            Claude Design canvas templates (e.g. feature-image/FeatureImage.dc.html)
deliverables/         Shareable, self-contained outputs (brand guideline HTML/PDF, signature package)
```

`assets/tokens.css` is bundled with this skill as a portable copy of the tokens. When you build a
standalone on-brand HTML asset, either link the repo's `tokens.css` (if you're in the repo) or copy
the `:root` variables from `assets/tokens.css` into your file. Logo art is bundled in `assets/`.

**A full component-by-component catalog lives in `references/components.md`.** Read it when you need
the exact treatment for a specific component or pattern (email, social, hero, tables, quotes, etc.).

**Website work: also read `../../../references/web-style.md`** (repo root `references/web-style.md`)
— the record of web usage patterns decided for the October 2026 Solutions redesign: page template
anatomy, hero tiers and the trust ticker, the clickable-affordance rule, the product-media showcase
pattern, FAQ placement, the CTA dot field, SEO working practice, and web claims guardrails. Follow
it for any rhapsody.health page so patterns stay consistent.

## The design system in Claude

Claude Design moved into Claude. The team's design system is now the Claude design system
**"Rhapsody Design System - Master"** (claude.ai/artifact/HZExMiNnfussfoDeDHnMB2), shared with the
org. The standalone claude.ai/design project is read-only and closes December 14, 2026, so
`/design-sync` no longer updates anything the team uses.

- The repo stays the master copy. To update the Claude design system, edit the repo, then ask Claude
  to update it; Claude publishes the changed files to it with the Artifact tool.
- Each card becomes `project/components/<Name>/preview.html` (the card HTML with paths rewritten to
  `../../tokens.css`, `../bundle.css` and `../../assets/`) plus a written guideline at
  `project/components/<Name>/README.md`. Tokens live in `project/tokens.json` (compiled to
  `project/tokens.css`); the card classes in `project/components/bundle.css`.
- The Claude design system has no template gallery. Templates sit under `project/templates/` as files
  that Claude uses when asked.
- See `.design-sync/NOTES.md` (2026-11-03) for the card-to-folder map and what was removed.

---

## 1. Color

Tokens (from `tokens.css` — these exact hex values are the standard):

| Token | Hex | Tier | Role |
|---|---|---|---|
| `--blue` | `#1A81F4` | Primary | Rhapsody Blue — the dominant brand color: panels, CTAs, links, brand moments |
| `--navy` | `#0B2C47` | Primary | Rhapsody Navy — page/section grounds, dark headers, the only ground for light devices |
| `--lblue` | `#B4D8FF` | Secondary | Light blue — the text accent on navy (two-tone highlight, stat numerals) |
| `--teal` | `#23C5BF` | Secondary | Teal — separator seam, "automate" pathway, one optional accent |
| `--purple` | `#7340E4` | Tertiary | Accent only |
| `--orange` | `#FA7E2E` | Tertiary | Accent only |
| `--black` | `#050F19` | Neutral | Text/ink |
| `--dgray` | `#7E858C` | Neutral | Secondary text, captions |
| `--lgray` | `#D9DFE6` | Neutral | Hairlines, borders |
| `--grayblue` | `#E8EDF2` | Neutral | Section background fill |
| `--tile` | `#E9EDF2` | Neutral | Icon-tile background (FY27 icon library) |

**Print color.** HEX/RGB are for digital. For **print**, Rhapsody Blue is **CMYK 100 50 0 0** — set the
swatch explicitly (`C100 M50 Y0 K0`); don't let the layout program auto-convert the hex, which comes
out muddy. Other colors use their CMYK/Pantone equivalents in print.

**Default palette hierarchy.** Most layouts should be **White or Navy + Rhapsody Blue**, with **one**
optional secondary accent (Light Blue or Teal) only when needed. **No more than three brand colors
per layout**, and reaching three is not a goal.

**Tertiary colors are restricted.** Purple and Orange are reserved for controlled accents,
exceptional emphasis, and **data visualization**. Never use either as a general section color,
headline color, CTA color, background theme, pathway color, or decorative fill. They do **not** count
as a freely available third color — use them only where a rule explicitly authorizes them (e.g. the
multicolor fluid dot pattern, chart series).

**No custom gradients.** Flat brand colors only. Two sanctioned exceptions, no others: the Aurora
glow (Section 5, approved masters; also the web hero background), and a navy scrim
graded across the type side of a photo for legibility.

**Functional (status) colors** — UI state only (status tags, validation, pass/fail), never decoration:
success `#157A4B` (white text), warning `#FA7E2E` (navy text), error `#C0392B` (white text) — all ≥4.5:1; always with a text label.

**Text color**
- Navy (`--navy`) or black ink on white/light grounds; Rhapsody Blue for links and small emphasis.
- White on navy or Rhapsody Blue grounds. **Never set text on teal, purple, or orange grounds.**
- Two-tone headline: one phrase in **light blue on navy**, **Rhapsody Blue on white** (matches the
  website). Navy or white grounds only — never on a Rhapsody Blue ground (set those in one color).

**Accessibility & pairings**
- Maintain readable contrast; favor the approved pairings (white on navy/blue, navy on white/gray-blue).
- **Do not set text on teal.** Even though black on teal passes contrast, it isn't visually right —
  omit it. (This supersedes any older "text on teal" allowance.)
- **Teal is immutable (Oct 2026).** One teal, `#23C5BF` — never darken, tint, or theme-convert it to
  pass a contrast check; a "fixed" teal is an off-brand color. Teal reads 6.7:1 on navy (passes at any
  size) and 2.1:1 on white (fails at any size), so the ground decides the role: **teal type (eyebrows,
  labels, actionlinks, small icons) sits on navy only.** On white or gray-blue, teal never sets type —
  the automation cue is an accent (the module accent line, the teal seam, or the **teal tick**: a
  16×3px teal bar before a navy mono label), links stay Rhapsody Blue, and meaningful teal graphics
  get direct navy labels. If a teal application fails contrast, change the ground or the role — never
  the hex. The teal-filled pill is retired (its label sat on teal).
- On navy, text is **white with light-blue accents at every size** (two-tone highlight, stat numerals, large quotes, labels). **Rhapsody Blue on navy is graphics only** — bars, blocks, big dots, the primary pill — never text.

**Color order** (one order, shared by charts and pathways):
Rhapsody Blue → Teal → Purple → Orange → Light blue → Navy; gray `#D9DFE6` for the remainder.
**Two-series charts: Rhapsody Blue + navy.** Add colors only as the data needs; charts and the dot
devices are exempt from the three-color rule.

**Color in composition** (indicative): neutral ground ~60%, Rhapsody Blue ~25%, secondary ~10%,
tertiary under 5% (most layouts none).

---

## 2. Typography

- **Poppins** for headlines and body — weights **300/400/500/600**. Body and most headings are
  **Regular (400)**; the hero/H1 steps up to **Medium (500)**. Fallback: Arial only if Poppins is
  unavailable. Never Calibri or Helvetica.
- **IBM Plex Mono** (`--mono`, 400/500) for **eyebrows** and technical annotations only — the small
  uppercase, letter-spaced label above a headline. It is an accent typeface, never body copy.

Type scale — the live website values, the same at every screen width (the `tokens.css` heading
sizes are documentation chrome, not this scale):

| Style | Spec |
|---|---|
| Hero / H1 | Poppins Medium (500), 48px / 60px line |
| Stat number | Poppins Medium (500), 40px; Rhapsody Blue on light, light blue on navy |
| H2 (section) | Poppins Regular (400), 24px / 30px |
| Card title | Poppins Medium (500), 20px / 30px |
| Body (P1) | Poppins Regular (400), 16px / 24px |
| Supporting (P2) | Poppins Regular (400), 14px / 21px |
| Caption | Poppins Regular (400), 12px minimum |
| Eyebrow | IBM Plex Mono Medium (500), 13px, uppercase, 0.17em tracking (hero eyebrow and group labels: Regular 14px) |
| Button | Poppins Medium (500), 15px in a 44px pill (compact: 14px, 40px) |

Floors (web): body 16px, supporting text 14px, captions and labels 12px, legal 11px only where
unavoidable. Copy caps: hero headline ≤40 characters, supporting line ≤110, quote ≤60, testimonial
≤120. Sentence case everywhere except the mono eyebrow. **No end period on headlines** (or
subheads, card titles, buttons, labels): one sentence, no period; two or more short sentences for
impact ("Integrate. Govern. Automate."), a period after each. Questions keep "?", "!" only for
confirmation moments, quotes keep their own punctuation, body copy punctuates normally.

Rules that matter:
- **Two-tone headline**: color one phrase — **light blue on navy, Rhapsody Blue on white**; the rest stays white (navy) or navy (white). Navy or white grounds only; one highlight per headline, used sparingly.
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
| `logo-white.png` | **Navy, Aurora over navy, and Rhapsody Blue backgrounds — always the all-white logo** |
| `logo-blueline.png` | Blue wordmark + white line — **not used on navy or Aurora** (Nov 2026) |
| `logo-black.png` | One-color navy/black on light backgrounds |
| `monogram-blue-navy.png` | The "R" monogram on light — small spaces only (favicon, avatar, merch) |
| `brand/Rhapsody Monograms/white monogram R.svg` (repo) | The R monogram on navy, Aurora over navy, and Rhapsody Blue — always all white |

In HTML the repo also exposes these as background classes via `tokens.css`: `.logo-i` plus
`.logo-bb` (primary), `.logo-blk`, `.logo-wht` (all white: navy, Aurora, Rhapsody Blue), `.logo-blw` (not for navy or Aurora).

Rules:
- **Light ground → navy-bar + blue wordmark.** **Navy, Aurora glow over navy, or Rhapsody Blue → the
  all-white logo, at every size.** Never use a blue-wordmark version (including blue wordmark + white
  line) on navy or Aurora, and never the light-ground lockup on a dark ground or vice versa.
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
- **One rounded-bottom container per page** (slide, document page, or screen), for the single
  element that should stand out (a key stat, quote, summary, or CTA). Fit the layout to the
  content instead of forcing containers: lists are plain bullets or numbered steps, never a stack
  of boxes; comparisons and specs go in tables; repeated items go in rows with hairlines or open
  columns.
- **Pills are for CTAs only.** Fully rounded pill shapes are reserved for buttons/CTAs — don't use
  pill framing for content cards, images, or panels.

---

## 5. Graphic devices

**Use exactly one graphic device per layout** — dots *or* a light device, never both, and never
stacked with heavy photography treatments.

### Dots (primary device)
- **Fluid dot pattern** (the primary dot composition). A **half-tone dot grid** — identical dots on
  one grid that gather into a dense core at an edge/corner and **dissolve fluidly outward** (dense to
  sparse). Registers: **white on navy**, **white on Rhapsody Blue**, **dots on white**, and the
  **multicolor field** (blue/light-blue/teal/purple/white + up to 3 orange). It replaces the earlier
  scattered/structured dot field (retired Oct 2026). Use an approved master **as-is, flipped, or
  rotated 90°**; never hand-build or recolor.
- **Big dot ecosystem**: a closed, approved set — one dominant cropped circle (anchor) with 2–4
  companions, one set per ground (navy, blue, white) in three crops each. Use one **as-is, flipped,
  or rotated 90°** — never hand-build or restyle it. Anchor is never the background hue: navy ground →
  blue anchor (white/light-blue/teal companions); blue ground → navy/white/light-blue anchor
  (white/navy/light-blue/teal/purple companions); white ground → navy/blue anchor
  (blue/light-blue/teal/navy/purple companions). Purple/orange never on the anchor.
- One dot device per layout; dots belong on blue or navy grounds, or dots-on-white / the multicolor
  field — not scattered on plain white as filler.

### Aurora light device (navy grounds only)
Aurora is the **one** light device, and it carries atmosphere for photo-free digital moments (heroes,
social, slides, video). It is a single device with range — from a calm **soft wash** to a **flowing**
form — and **Aurora allows movement**, so the same device covers still and moving work. (There is no
separate "Aurora ribbon" register anymore; the flowing form is part of Aurora.)

> **Burst, Plexus, and the separate Aurora ribbon are retired (Oct 2026).** The light device is Aurora
> only. Anywhere Burst or Plexus once appeared (product launch, social quote banner), use Aurora.

Aurora rules:
- **Navy ground only.** Never on blue, white, or photography. On those, use dots or photography.
- **The glow uses teal, blue, and purple only — never orange.** Keep each glow within three colors;
  Aurora is teal-led.
- The **soft wash may sit behind copy** (as on the website hero) if white type holds contrast; keep the flowing form clear of copy.
- **Motion defaults (proposed):** 20–30s seamless loop (website hero: 26s); slow drift ≤10% of frame
  width, scale 95–105%, ease-in-out sine; colors stay teal/blue/purple; opacity 80–100%, no flashing;
  fade in 600–800ms; static soft-wash master for reduced motion; animate transform/opacity only.
- Lean into the **flowing** form for motion/video/large backdrops; keep to the calmer **wash** for
  everyday layouts where text sits close.
- These are approved masters, not effects you build.

---

## 6. Iconography

- **Use the official FY27 icon library only** (271 outline icons): SharePoint, Marketing > Public >
  _Rhapsody Brand Materials > Brand Package FY27 > Icon Library, open to everyone at Rhapsody. Never
  draw, redraw, or edit an icon, and never use another set (Lucide, Feather, Material, emoji). If
  nothing fits, use the closest library icon and ask the brand team for a new one.
- **Two versions** (SVG): Color (blue), the bare glyph for light grounds and the light tile; Color (White),
  for navy or blue grounds and the dark tile.
- **Stroke**: glyphs on a 24×24 grid with the stroke set per icon, mostly 0.85–0.9 (down from 1.7),
  round caps and joins. Keep it as drawn; scale the whole icon, never the stroke alone.
- Feature and benefit icons sit in a library tile: 44×44, 11px corners, 24px glyph centered; light tile
  `#E9EDF2` (`--tile`) with a `#1A81F4` glyph, dark tile white at 10% with a `#B4D8FF` glyph.
- **Build tiles, don't download them**: 44×44, 11px corners, 24px glyph centered (10px each side); light =
  `--tile` with the blue glyph; dark = white 10% with the white glyph masked to `#B4D8FF`. Other sizes keep
  glyph 24/44 and corners 1/4 of the tile. Use the `.icon-tile` / `.icon-tile.dark` + `.glyph` classes in
  `tokens.css`. Glyphs live in `assets/icons/svg/{blue,white}/`, indexed in `assets/icons/README.md`.
- Functional marks (check / cross) at **weight 3**, no tile.
- Blue family only (blue, light blue, white). Never add outlines, shadows, or color effects.

---

## 7. Photography & portraits

- **Bright, natural-lit, authentic.** People facing camera or each other, eye contact, real
  discussion; inclusive teams (IT, clinicians, admins); modern workspaces with visible data/screens.
- **Favor tech-focused imagery** (screens, dashboards, command centers, code) — increasingly preferred
  over purely clinical/healthcare scenes.
- **Avoid** dark "tech-noir" imagery, blur, harsh flare, backs-to-camera, tight huddles turned away,
  staged handshakes, and generic stock.
- **Portrait treatments**: the default is the **Rhapsody Blue ring**, one Rhapsody Blue line around a
  circular crop, no navy band: 2–3px on small avatars (≈96px and under — name lockups, quote cards),
  4–6px at feature scale. Always Rhapsody Blue; never purple, orange, white, or a second ring. The bold
  navy-and-blue ring is the website **hero badge** only, never an everyday headshot. Also **arc accent**,
  **rounded-rectangle card**, **editorial split**. The legacy thick single-color rings are retired.
- **Photo library first**: about 100 approved single-person photos (SharePoint: Brand Package FY27 > Photo Library;
  web copies in the repo at `assets/photos/3x2/` (cards, articles, slides, web photo slots) and `assets/photos/1x1/` (portraits,
  avatars, speaker graphics, the Rhapsody Blue ring)).
  Use the crop that matches the slot; no re-cropping through faces, flips, filters, or tints. **They are
  stock models: never present them as named customers, employees, speakers, or quote sources.**
- **LinkedIn employee banners**: four approved cover images (`assets/banners/`; SharePoint Brand
  Package FY27 > Social Media Cover Images), used as supplied. Finished art, not a model for new work;
  their wave cut-out is approved for those banners only and is never a device elsewhere.

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
**Graphic devices** — Devices at a glance · Fluid dot pattern · Big dot · Light devices
**Iconography** — Icon library
**Imagery** — Illustration · Photography & portraits
**Patterns** — Hero · Email template · Email signature · Social posts · Product launch announcement ·
Name lockup · **Display ads (blue-first)** · **PowerPoint deck template (downloadable .pptx master)** ·
**Technical documents (white papers, release notes, security advisories; Word .dotx templates)**
**Reference** — Quick corrections log

Notable patterns:
- **Display ads** are **blue-first**: Rhapsody Blue ground by default, logo always prominent, very few
  large words (billboard style), one clear action. Covers every IAB placement. Canvas template lives at
  `templates/display-ads/DisplayAds.dc.html`.
- **Ebooks** (reference: `examples/ebooks/`, Ebooks card): 816×1056 pages, padding 56 top / 60
  sides / 72 bottom, single flex column with the closing takeaway pinned to the bottom. Every interior
  page opens with the header stack: 44×3 blue rule → Plex Mono eyebrow (12px, 500, 0.17em, caps,
  blue) → H2 Poppins 400 36px/1.18 navy → intro 16px/1.6, max ~600px. Running footer 28px from the
  bottom: logo (108px; primary on light, all white on navy) + ebook title + two-digit page number,
  Plex Mono 10px caps 0.14em #7E858C. Cover and CTA full-bleed navy (logo white 170–180px, with
  "rhapsody.health" in light blue); proof pages may be navy (accents, eyebrow, footer → light blue).
  Components: cards (3px colored top border, radius 0 0 12px 12px, #D9DFE6 border, 13.5px body),
  image slots (260–330px, same radius), FY27 icon tiles, feature rows (44px tile | ~220px blue H3
  18px | description, hairlines), checklists (16px blue check, stroke 3, two columns), stats (Poppins
  500 52–64px; blue on light, light blue on navy; two-column grid with white-20% rules on navy),
  closing panels (navy or blue, white text; on navy the second half turns light blue), CTA pill
  (no arrow). At most ONE boxed element per page (a card grid counts as one); lists and feature rows
  stay open. Weights 400 (500 only for cover H1, CTA H2, stats). Page order: Cover → Introduction →
  Landscape → Challenge → Field guide → What to look for → How Rhapsody helps → Deployment choice →
  Proof → CTA. Each page ends on a blue-accented takeaway; eyebrows are functional section names;
  the campaign metaphor and campaign illustration/badges stay isolated (cover, CTA, one field-guide
  page, at most one or two fragments).
- **Webinar promo (social)**, 1200×627: navy; mono eyebrow (event type) top left in light blue
  and the date in white mono caps top right after the light-blue library calendar icon; Poppins
  Medium headline (≤2 lines, one light-blue phrase, sentence case); one-sentence description;
  1–3 speakers in the Rhapsody Blue ring (black-and-white headshots allowed for real speakers) with
  name + title; all-white logo bottom left; a fluid dot master bottom right bleeding off two edges.
  No button, no containers. Reference: `examples/social/`; see the Webinar promo card.
- **Technical documents** (white papers, release notes, customer security advisories) follow the
  approved eMudhra advisories (`examples/technical-documents/`): white cover with the logo top left,
  the white-ground fluid dots (Rhapsody Blue) top right, a mono eyebrow naming the type, a two-tone
  Poppins Medium title, a subtitle and a four-column meta row; then a running header (logo + mono
  label), an open contents list (no box), sections opened by a blue rule + "SECTION 01" mono label,
  numbered subsections ("3.1" in blue mono), callouts with a blue left rule, assessment panels
  (blue top rule, large blue value), audience cards, navy-header tables, and Plex Mono code on
  gray-blue. Start from the Word templates in `templates/word-documents/` (also in Word under
  File > New once published to Rhapsody's Microsoft templates): `Rhapsody-Security-Advisory-Template.dotx`, `Rhapsody-Release-Notes-Template.dotx`,
  `Rhapsody-White-Paper-Template.dotx`. For a .docx, apply their named styles (load the `docx`
  skill); for HTML or PDF, reproduce the same anatomy. See the Technical documents card.
- **Any multi-page document** (technical document, report, one-pager set, proposal): the **same
  header and footer on page 2 and every page after**; the **logo exactly once per page** (cover
  top left, then the header only, never also in the body or footer); keep interior headers compact
  (logo about 1.4in wide, band no deeper than about 0.75in) so editorial pages keep ample room for
  content.
- **Digital assets: test on mobile before finalizing.** Check at 375px (and 320px for critical
  pieces): no horizontal scroll, no clipped text, body 16px or more, columns stack. Touch targets at
  least 44×44px with about 8px between them; on interactive checklists the whole row is tappable and
  the checkbox itself is at least 24px (never the default 13px box). Buttons stay 44px pills.
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
- **Scattered dot field retired** → the **Fluid dot pattern** (half-tone grid, dense-to-sparse). Multicolor dots are approved.
- **Light device** is Aurora only — one glow, soft to flowing, movement allowed (Burst, Plexus, and the separate Aurora ribbon retired Oct 2026; Pulse earlier).
- **Icons** → the official FY27 icon library only (four versions, lighter stroke than the old 1.7); the hand-drawn reference set is retired.
- **Portraits** → Rhapsody Blue ring (default) / arc / card / editorial split; navy-and-blue ring is hero-badge only; legacy thick single-color rings retired.
- **Illustration** legacy styles retired.
- New sections added: **Brand Expression** and **Illustration**.
- Rule: **if copy doesn't fit, shorten the copy — don't crush the type.**

### Mascot — Teddie Mercury (character mark)

A character mark for limited appearances that add fun; **never a primary device** in the system.
Approved uses: internal communications, culture moments (team events, sales incentives, employee
swag), and Connect Developer Conference materials. **Any other use needs marketing team approval
first** (ask; leave him out until approved). Never in product, web, technical, credibility (clinical,
security, regulatory, legal, executive, PR, analyst, financial), proposal, contract, or customer-story
content; never beside a product claim or lockup; never a template fixture (slide masters, email
signatures, web chrome). One per asset, not on every piece in a set; he counts as the layout's one
graphic device (no dots or Aurora with him); outside the logo's clear space, never in a lockup.
Master art only, from SharePoint: Brand Package FY27 > Character Library > Teddie Mercury (also
in the repo at `assets/mascot/`: full color, full-color standing, and navy, white, and light gray
one-color versions; full color on light grounds, one-color for single-color production or dark grounds). Spelled
"Teddie" (never "Teddy"); "Teddie Mercury" on first mention.

**Not the Rhapsody Axon mark:** the robot character in the homepage hero and on the Rhapsody Axon AI
feature bands is the Rhapsody Axon mark, the product's own visual, not Teddie.

---

## 11. Compliance self-check (run before delivering any visual asset)

```
□ Ground + primary is White/Navy + Rhapsody Blue; ≤ 3 brand colors; three is not a target
□ Purple/Orange only as accent, emphasis, or data viz — never section/headline/CTA/background
□ No custom gradients (only Aurora masters, incl. the web hero, and photo scrims)
□ Navy is #0B2C47; Rhapsody Blue is #1A81F4; light blue is #B4D8FF
□ Poppins Regular for body/headings, Medium for hero; IBM Plex Mono for eyebrows only
□ No text set on teal
□ Teal is #23C5BF everywhere — nothing darkened to pass contrast; teal type on navy only; on light
  grounds teal appears only as an accent (tick / accent line / seam) beside navy text
□ Two-tone headline = light blue on navy / Rhapsody Blue on white; never on a blue ground; no Rhapsody Blue text on navy
□ If it didn't fit, the copy was shortened — the type was not crushed
□ Logo: navy-bar/blue on light; ALL WHITE on navy, Aurora over navy, and Rhapsody Blue; clear space = X (height of the R) on every side
□ Logo not recolored, stretched, rotated, shadowed, or overlaid
□ Corners: squared top, rounded bottom on modules; pills reserved for CTAs
□ At most ONE rounded-bottom container per page; lists/specs use bullets, steps, or tables, not boxes
□ Documents: same header + footer from page 2 on; logo exactly once per page; compact interior header
□ One lead visual: one dot device OR Aurora OR a photo; the only pairing is a dot device + photo
□ Dots are the fluid dot pattern (approved master, not hand-built); big dot used as-is/flipped/90°
□ Light devices on navy only; glow is teal/blue/purple (never orange); offset into open space
□ Icons: from the FY27 icon library, right version for the ground, stroke untouched, in a tile for features
□ Photography: bright, natural-lit, tech-forward, faces-forward, inclusive; no tech-noir/blur
□ Portraits: Rhapsody Blue ring by default (no navy band), or arc / card / editorial split
□ No retired illustration styles
□ Teddie Mercury only on internal, culture, or Connect Developer Conference pieces (else marketing approval); one per asset; never with dots or Aurora; the website robot is the Rhapsody Axon mark, not Teddie
□ Copy follows rhapsody-brand voice; Rhapsody Axon™ naming/trademark rules applied (that skill)
□ Company name is "Rhapsody," never "Rhapsody Health," never possessive ("Rhapsody's")
□ Body text ≥16px on web; nothing a reader needs below 12px
□ Digital: tested at 375px wide; no horizontal scroll; touch targets ≥44×44px; checkboxes ≥24px with the whole row tappable
□ No end period on one-sentence headlines; multi-sentence headlines punctuate every sentence
```
