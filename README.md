# Rhapsody Design System

The Rhapsody rebrand identity, in code. This repository is the source of truth for the
brand's visual system and is structured to sync with **Claude Design**
(claude.ai/design) via `/design-sync`, where each file below appears as a component card.

It is a code version of the approved *Rhapsody Brand VisID Guide*
(current standard, 2026). Company name is always **Rhapsody**, never "Rhapsody Health".

Latest guide update folded in: light blue refreshed to `#B4D8FF`; all headings set in
Poppins Regular (400); logo is navy-bar + blue wordmark on light and blue-bar + white
wordmark on dark (`logo-inv`); the graduated dot field is retired (uniform scattered field
only); light devices are Aurora, Aurora ribbon, Burst, and Plexus (Pulse retired); and the
Color card adds contrast pairings, per-color caveats, and a "text on teal" rule.

## Structure

```
tokens.css            Shared design tokens (color, type) + reusable classes + logo image classes
assets/               Tight-cropped logo/monogram rasters used inline by the component cards
brand/                Downloadable logo master files (vector + raster), organized by color
components/           One preview file per component/section — each a card in Claude Design
```

> **`assets/` vs `brand/`** — `assets/` holds tightly-cropped marks the preview cards
> reference inline. `brand/` holds the full logo package (with clear space) for real use:
> `.svg` + `.eps` vector masters plus `-300` (300 dpi) / `-72` (72 dpi) PNG and JPG.
> This is the FY26 navy set (former black recolored to Rhapsody Navy `#0B2C47`, blue
> unchanged); it mirrors the SharePoint Brand Package folder structure. See
> `brand/README-navy-update.txt`.

Each file in `components/` is a standalone HTML preview whose **first line** carries a
`<!-- @dsCard group="…" name="…" subtitle="…" -->` marker. Claude Design reads these markers
to build the Design System pane, grouping cards by `group`. Every component links
`../tokens.css`, and logo/monogram artwork resolves from `assets/`.

## Cards

| Group | File | What it covers |
|---|---|---|
| Foundations | `components/colors.html` | Palette (primary/secondary/tertiary/neutral), text color, accessibility |
| Foundations | `components/typography.html` | Type scale, eyebrows, mono annotations, dates & name lockups, min sizes |
| Foundations | `components/spacing.html` | Clear margin, teal separator, module accent line |
| Foundations | `components/pathways.html` | Build (blue) vs Automate (teal) color coding + wayfinding directive |
| Brand | `components/logo.html` | Primary, variations, monogram, clear space, product & co-brand lockups, restrictions |
| Graphic devices | `components/dots.html` | Graduated field, scattered field, dot-row accent |
| Graphic devices | `components/light-devices.html` | Pulse, Aurora, Burst glows + rules |
| Iconography | `components/icons.html` | Reference set, drawing spec, icon tile, functional marks |
| Imagery | `components/photography.html` | Photo direction + portrait treatments |
| Components | `components/buttons.html` | Pill buttons, primary/secondary, text links + CTA arrow |
| Components | `components/quotes.html` | Quote card, testimonial, customer quote card |
| Components | `components/stats.html` | Number-led stat cards |
| Components | `components/tables.html` | Navy header, alternating rows, blue result column |
| Components | `components/charts.html` | Bar, line, stacked bar, donut |
| Components | `components/partner-logos.html` | Bracket treatment for partner logo walls |
| Patterns | `components/email.html` | Navy header + glow, teal seam, single CTA |
| Patterns | `components/social.html` | 1:1 posts, one device per post |
| Patterns | `components/hero.html` | Light & dark hero layouts |
| Reference | `components/corrections.html` | Direction confirmed, superseding earlier drafts |

## Design tokens

Colors are defined as CSS custom properties in `tokens.css`:

| Token | Value | Role |
|---|---|---|
| `--blue` | `#1A81F4` | Rhapsody Blue (primary) |
| `--navy` | `#0B2C47` | Rhapsody Navy (primary) |
| `--lblue` | `#90C5FF` | Light blue (secondary) |
| `--teal` | `#23C5BF` | Teal (secondary) |
| `--purple` | `#7340E4` | Purple (tertiary accent) |
| `--orange` | `#FA7E2E` | Orange (tertiary accent) |
| `--black` | `#050F19` | Black (neutral) |
| `--dgray` | `#7E858C` | Dark gray (neutral) |
| `--lgray` | `#D9DFE6` | Light gray (neutral) |
| `--grayblue` | `#E8EDF2` | Gray-blue background fill |
| `--tile` | `#E9EEF4` | Icon-tile background |
| `--mono` | `"IBM Plex Mono", monospace` | Technical / eyebrow type |

Typefaces load from Google Fonts: **Poppins** (300/400/500/600) for headlines and body,
**IBM Plex Mono** (400/500) for eyebrows and technical annotations.

## Working locally

Because components use relative references to `tokens.css` and `assets/`, preview them
over a static server rather than opening files directly:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/components/colors.html
```

## Syncing to Claude Design

Use the `/design-sync` skill (or the DesignSync tooling) to push these files to the
**Rhapsody Design System** project. Sync is incremental: edit a component, re-sync that
file, and its card updates in place. The `@dsCard` markers keep the pane organized without
manual registration.
