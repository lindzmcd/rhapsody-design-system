# Rhapsody technical document templates (Word)

Three Word templates built from the approved eMudhra customer security advisories
(`examples/technical-documents/`). All three share one style set.

| File | Use for | Eyebrow |
|---|---|---|
| `Rhapsody-Security-Advisory-Template.dotx` | Customer security advisories | Customer security advisory |
| `Rhapsody-Release-Notes-Template.dotx` | Release notes | Release notes |
| `Rhapsody-White-Paper-Template.dotx` | White papers | White paper |

## Adding them to Microsoft templates

Upload the three `.dotx` files to your organization's template library, for example the SharePoint
organization assets library that feeds **File > New** in Word. Each person can also save one to
`%AppData%\Microsoft\Templates` to see it under **File > New > Personal**.

## Fonts

The templates use **Poppins** (Regular and Medium) and **IBM Plex Mono** (Regular and Medium). Both
are free from Google Fonts. They have to be installed on the machine, or Word substitutes another
font. The fonts aren't embedded in the templates.

## Using them

- Replace the bracketed placeholders. Delete the sections and components you don't need.
- Apply the named styles, not manual formatting. Paragraph styles: Title, Subtitle, Eyebrow,
  Document Title, Section Label, Heading 1–3, Callout, Code Label, Code Block, Panel Label,
  Panel Text, Rating, Table Header, Table Text, Contents Item, Bullet List, Step List, Meta
  Label, Meta Value. Character styles: Accent (Rhapsody Blue), Lead-in, Code Inline, Heading Number.
- **Two-tone title:** select the highlight phrase and apply **Accent (Rhapsody Blue)**. Use it once per title.
- **Section labels:** copy an existing one (the blue rule is a small inline image) and change the number.
- **Contents box:** static text that you edit by hand to match the section headings.
- **Panels and cards:** they're tables. Copy one and keep its shading and rules.
- **Header and footer:** edit the header label (document type and version) and the footer line
  (product, title, date and version) on page 2. They repeat on every page after the cover.

## Rebuilding

```
NODE_PATH=/opt/node-tools/node_modules node build.js <outDir>
```

`build.js` writes a `.docx` and `.dotx` for each template. `art/` holds the logo, the cover dots and
the section rule. The cover dots are the white-ground fluid dot master traced and set in Rhapsody
Blue #1A81F4 (`art/fd-white-trace.svg`); the master file itself is #3D7FED.
