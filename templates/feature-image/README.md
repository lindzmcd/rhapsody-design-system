# Website feature image

The 1200×630 feature image for rhapsody.health pages, exported at 2× (2400×1260 PNG).
Rules and examples: the **Website feature image** card (`components/feature-image.html`).

## Claude Design

`FeatureImage.dc.html` is registered in the Rhapsody Design System project as the
**Website Feature Image** template. Fill the eyebrow, headline, emphasis, and lockup in the
Tweaks panel, choose a headline size in Setup, and capture the artboard at 2×. The template
glues the last two words of the headline and lockup so no line ends on a single word.
`support.js` and `ds-base.js` are the Claude Design runtime; don't edit them.

## Code

`source/` holds the HTML template and a render + QA script.

```
cd templates/feature-image/source
cp feature-image-template.html my-page-feature.html   # fill the four ✏️ slots
node render-feature.mjs my-page-feature.html
```

The script blocks Google Fonts and injects `fonts/local-fonts.css` (Poppins and IBM Plex Mono,
embedded), so it renders the same with or without network access. It fails if Poppins didn't
load or a headline, eyebrow, or lockup line is a single word. On success it writes
`<name>-image.png` (2400×1260) and `<name>-motif.png`; inspect the motif crop for stray or
overlapping lines before shipping the image.
