# Component & pattern catalog

Exact treatment per card in the Rhapsody Design System (September 2026). Each corresponds to a
`components/*.html` file in the repo. When you're in the repo, open that file for the live markup and
reusable classes; otherwise use these specs. All items link `tokens.css` and pull logo art from
`assets/`.

## Contents
- Foundations: Brand expression · Color · Typography · Layout & spacing · Pathways · Corners & shape
- Brand: Logo & wordmark
- Components: Buttons · Charts · Partner logos · Quotes · Stats · Tables · Dot accents
- Graphic devices: Devices at a glance · Dots · Scattered dot field · Big dot · Light devices
- Iconography: Icon library
- Imagery: Illustration · Photography & portraits
- Patterns: Hero · Email · Email signature · Social · Product launch · Name lockup · Display ads · PowerPoint
- Reference: Quick corrections log

---

## Foundations

**Brand expression.** Visual principles, AI direction, and the decision hierarchy. Start here for the
"why": engineered but human. Dots are precise and rational; light devices are warm and atmospheric.
Restraint is the house style — clean, confident, few colors, lots of air.

**Color.** See SKILL.md §1. Default hierarchy White/Navy + Rhapsody Blue + one optional accent; ≤3
brand colors. Tertiary (purple/orange) restricted to accent/emphasis/data-viz. No text on teal. No
custom gradients. Blue-on-navy for large elements only.

**Typography.** See SKILL.md §2. Poppins Regular body/headings, Medium hero; IBM Plex Mono eyebrows
only. Two-tone (white + light blue) headline on navy. `strong` = Medium. Shorten copy rather than
crush type. Date and name lockups use the mono for the small label line.

**Layout & spacing.** Keep a **clear margin** of ~6–7% of the shorter side around a composition. The
**teal seam** (a thin teal rule, often on a bottom or dividing edge) is the signature separator. The
**module accent line** marks the top or side of a content module. Generous whitespace; align to a
consistent grid; don't crowd.

**Pathways.** Color-code journeys/paths consistently. Example coding: **Build = blue**, **Automate =
teal**. Pathways use the **same color order as charts** (navy → blue → teal → purple → orange → light
blue). Keep a path's color stable wherever it recurs (wayfinding).

**Corners & shape.** Square the top two corners, round the bottom two (≈12px) on module/content frames.
Pills are CTA-only. Keep the corner treatment consistent across a page/deck.

## Brand

**Logo & wordmark.** See SKILL.md §3. Primary = navy bar + blue wordmark (light grounds). Dark grounds
= blue wordmark + white line (large) or one-color white. Monogram for tight spaces only. Clear space =
the "R" mark on all sides. Product & co-brand lockups keep "Rhapsody" on the mark. Never modify,
recolor, rotate, or overlay.

## Components

**Buttons & CTAs.** **Pill** shape (fully rounded). **Primary** = Rhapsody Blue fill, white label.
**Secondary** = outline (blue or navy stroke) on light, or white/blue outline on dark. **Text link +
arrow** for tertiary actions (label + "→"). One primary action per view. Verb-led labels.

**Charts & graphs.** Flat, no gradients, minimal gridlines. Series color order: navy → Rhapsody Blue →
teal → purple → orange → light blue, then neutrals. This is the one place purple/orange appear freely.
Same order feeds pathways. Label directly where possible; keep to as few series as the story needs.
Types shown: bar, line, stacked bar, donut.

**Partner logos (brackets).** Present partner/customer logo walls inside a **bracket treatment** —
thin brackets frame the set. Keep partner logos monochrome/neutral where possible so they sit evenly.

**Quotes & testimonials.** Quote card, testimonial, and customer-quote card variants. Large quote in
Poppins; attribution via the name lockup (name, title, company). On navy, Plexus is the appropriate
backing device for a testimonial. Keep quotes to 1–2 sentences.

**Stats.** Number-led stat cards — large numeral (Poppins Medium), short descriptor beneath. Numbers
only in the big slot; keep descriptors short. Group in rows; align baselines.

**Tables.** **Navy header** row (white text), alternating white / gray-blue (`--grayblue`) body rows,
an optional **blue result column** for the key figure, and small **status tags** (pill chips). Thin
`--lgray` hairlines. Squared-top/rounded-bottom frame.

**Dot accents.** Small dot-based accents: framing/diagram shapes and the **dot-row accent** (a short
run of dots as a divider or emphasis mark). A restrained way to bring the dots device into a component
without a full field.

## Graphic devices

**Devices at a glance.** The master overview: each device, its meaning, its color lead, and when to
use it. Consult it to choose between dots and a light device — and remember, only one per layout.

**Dots overview.** What the dots mean, dot field vs. big dot, and approved backgrounds/dot colors.
Structured field only (graduated grid retired). White-on-blue and multicolor are both on-brand.

**Scattered dot field.** The uniform field — equal-size dots, densest at an edge, thinning inward.
Structured dispersion with defined anchors. Do: keep density purposeful and directional. Don't:
random scatter, or graduated sizing.

**Big dot.** A closed, approved family — one per background/placement/format plus three variants, as
transparent SVG + 2× PNG. Use as-is, flipped, or rotated 90°. Never hand-build or restyle. Anchor +
companion colors are fixed by the background; the anchor is never the background hue.

**Light devices.** Aurora (teal-led wash), Aurora ribbon (motion/large scale), Burst (purple-led rays,
breakthrough), Plexus (blue-led network, connectivity). **Navy grounds only.** Glow = teal/blue/purple,
never orange, ≤3 colors. Offset into open space; copy on the calm side. Approved masters, not effects.

## Iconography

**Icon library.** Single outline family: stroke-only, 1.7 weight, `currentColor`. Feature icons on a
44px gray tile (`--tile`) with a blue glyph. Functional check/cross at weight 3. One color per icon;
no shadows/outlines/effects. Two-color line icons and icon-on-circle art are retired.

## Imagery

**Illustration.** Legacy line-art, spot illustration, and character/cartoon scenes are retired. Use
photography, product/interface imagery, diagrams, data viz, or the abstract devices instead.

**Photography & portraits.** Bright, natural-lit, tech-forward, faces-forward, inclusive. Avoid
tech-noir, blur, harsh flare, backs-to-camera, staged/stiff poses. Portrait treatments: thin ring, arc
accent, rounded-rectangle card, editorial split — brand-colored, never a thick ring or white outline.

## Patterns

**Hero.** Three registers: **light** (white ground, navy/blue type), **dark** (navy ground, white +
light-blue two-tone headline, optional light device), and **photography** (image with copy on the calm
side). Structure: eyebrow (mono) → headline → subhead → single CTA. Keep one graphic device.

**Email template.** Header banner options: Aurora glow, big dot, or photo. Teal seam under the header.
Single CTA. Body in Poppins Regular. Notes for Pardot/marketing-automation build included in the card.

**Email signature.** Employee signature: wordmark, teal divider, name lockup, and certifications row.
Deliverable package (HTML + IT/employee setup) lives in `deliverables/signature-package/`.

**Social posts.** 1:1 square posts plus a quote banner. One device per post (dots or a light device).
Logo present; copy short and legible; keep blue backgrounds readable (bump type weight/size, not clutter).

**Product launch announcement.** Launch unit: product name, **Burst** glow on navy, one CTA. Use for a
breakthrough/announcement moment.

**Name lockup.** Attribution block: name, title, company. Rules for logo vs. written company name, and
pairing with a portrait treatment. Small label line often set in mono.

**Display ads (blue-first).** Rhapsody Blue ground by default (navy occasionally), **logo always
prominent**, **very few large words** (billboard style), **one clear action**. Covers every IAB size.
Canvas template: `templates/display-ads/DisplayAds.dc.html`. This pattern is intentionally louder and
simpler than the rest of the system — resist adding detail.

**PowerPoint deck template.** Official 2026 master: `downloads/Rhapsody-PowerPoint-Template-2026.pptx`.
Blue-first (Rhapsody Blue default ground, navy occasional, logo always prominent, few large words). Use
it as the starting point for any deck. For deck-editing mechanics load the `pptx` skill; for slide copy
and Rhapsody Axon™ naming load `rhapsody-brand`.

## Reference

**Quick corrections log.** The running list of retired elements and confirmed direction. Retired: busy
circle/photo/icon-overlay montages; legacy line-art and cartoon scenes; two-tone icons; thick color
rings on portraits; squiggle-line-with-dots. Confirmed: multicolor dots approved; dots always
structured; bright natural-lit photography; single outline icon family; new approved treatments
(bracket logos, dot-row accent, white + light-blue headline on dark, teal separator).
