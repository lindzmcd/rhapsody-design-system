# design-sync notes — Rhapsody Design System

This project is **hand-authored**, outside the /design-sync converter's envelope
(there is no `package.json`, `dist/`, or Storybook). The HTML preview cards are
already in the format the Claude Design app consumes.

## How syncing works here
- Each `components/*.html` starts with a `<!-- @dsCard group="..." name="..."
  subtitle="..." width height -->` marker.
- The app builds its component index from `_ds_manifest.json` (`cards[]`).
  `register_assets` is legacy and does NOT update that file — do not rely on it.
- To sync: push the changed `components/*.html` + `tokens.css`, then regenerate
  `_ds_manifest.json` `cards[]` from the `@dsCard` markers and push it too.
  Keep the group/subtitle in the manifest identical to the file markers so an
  app-side self-check recompile produces the same grouping.
- Group order in the pane follows the numeric prefix: 1 Foundations, 2 Brand,
  3 Components, 4 Graphic devices, 5 Iconography, 6 Imagery, 7 Patterns,
  8 Reference.

## Gotcha fixed 2026-08-02
Remote HTML `@dsCard` headers and `_ds_manifest.json` had drifted from local
(Patterns numbered "6" on remote vs "7" locally; new dot cards + product-launch
missing from the manifest). Full parity re-push of all 28 cards + tokens.css +
regenerated manifest fixed it. When editing groups, always re-push BOTH the
HTML files and the manifest together.

## Sync 2026-10-03 — teal ruling + Aurora-only
Parity push of all 32 cards + tokens.css (teal immutability ruling in
colors/buttons/corrections/tokens; Aurora-only light-device retirement in
device-overview/light-devices/product-launch/social). Deleted the remote
orphans assets/dupimg1.png and dupimg3.png (removed from git by the
Aurora commit; no card or tokens.css references remain). No manifest
pushed, per the 09-07 rule below — sentinel re-armed so the app recompiles
cards[] and templates[] from the files. Remote uploads/ still holds the
GUI-uploaded Burst/Plexus masters; left alone (not git-managed) — tell the
app owner they can tidy them from the GUI if wanted.

## Gotcha fixed 2026-09-07 — templates gallery wiped
The "Choose a template" gallery (Email signature + Axon Connect pitch deck)
went empty because a hand-uploaded `_ds_manifest.json` carried `"templates": []`,
overwriting the app-compiled template registry. The template FILES were never
lost (they live under `templates/email-signature/` and
`templates/axon-connect-pitch-deck/`, each with a `.thumbnail`) — only the
registry pointing at them.

**The `templates` array is app-compiled — do NOT set it by hand.** It was never
in git (the templates were created via the Claude Design GUI "save as template"
flow, which writes both the folder and the registry). To restore it, let the app
recompile: write the `_ds_needs_recompile` sentinel and re-open the project. The
app rebuilds `_ds_manifest.json` from the files present — `cards[]` from the
`@dsCard` markers and `templates[]` from the `templates/*/` folders.

**Rule:** never push a locally-built `_ds_manifest.json` that has `templates: []`
while template folders exist remotely — it clobbers the gallery. If you must push
a manifest, either omit the `templates` key or leave the app to compile it.

Also cleaned up 6 stale orphan card files this run — the old numbered graphic-
device duplicates `components/gd-0-device-overview.html` … `gd-5-light-devices.html`
(superseded by `device-overview/photography/dots/dot-field/big-dot/light-devices`).
They weren't in `cards[]`, but would have re-appeared as duplicate cards on the
recompile, so they were deleted.

## Sync 2026-10-23 — Business card pattern
Added `components/business-card.html` (group "7 · Patterns"), bringing the
pane to 29 cards. Parity re-push of all 29 cards + `tokens.css` rather than
the single new file: uploads read from disk and never enter model context, so
a full push costs nothing and closes the drift risk this file keeps recording.
No manifest pushed (per the 09-07 rule); sentinel re-armed so the app
recompiles `cards[]` and `templates[]`. No deletes — every remote card still
exists locally, and `assets/dupimg0.jpg` (remote + local, referenced by
`tokens.css`) was left alone.

Pre-push check: remote `tokens.css` already carried the accessible status
colors from c0a44f0, confirming remote was current before this run.

### Finding — `templates/display-ads/` is local-only
`templates/display-ads/` (`DisplayAds.dc.html`, `README.md`, `assets/`) is in
git but NOT in the project, and unlike the two remote templates it has no
`.thumbnail`. It was deliberately NOT pushed this run. Template folders pair
with an app-compiled registry, and the 09-07 entry records how easily that
gallery breaks; a hand-pushed folder with no thumbnail risks a broken entry.
To publish it, use the Claude Design GUI "save as template" flow, which writes
both the folder and the registry. Decide before the next sync.

### Not synced, by design
`assets/qr/` and `tools/cards/` are print-production files for the business
card (QR generator, CSV batch producer, PDF output). They are not design-system
card assets, no card references them, and they stay out of the project.

## Sync 2026-10-23 — Website feature image card + template
Added `components/feature-image.html` (group "7 · Patterns", 30 cards) and the
first template pushed from git: `templates/feature-image/` (`FeatureImage.dc.html`
with a `@template name="Website Feature Image"` marker, `support.js` and
`ds-base.js` copied verbatim from `templates/email-signature/`, a README, and a
`.thumbnail`). The `.thumbnail` matches the app-captured ones: a 640×432 WebP of
the template page, encoded through a Chromium canvas. Parity push of all cards +
`tokens.css`. No manifest pushed (per the 09-07 rule); sentinel re-armed so the app
recompiles `cards[]` and `templates[]`. No deletes.

**Verify on next open:** the "Choose a template" gallery should list Website
Feature Image alongside Email Signature Banner and Axon Connect Pitch Deck. If the
entry is missing or broken, re-save it through the GUI "save as template" flow
(the 10-23 business-card note explains why that flow is the safe fallback).

`templates/feature-image/source/` (the HTML template, `render-feature.mjs`, and
embedded local fonts) is code-production tooling and stays out of the project.

## Sync 2026-10-26 — feature image examples, mascot correction
Feature image card: shipped guide image (`feature-image-guide.webp`) and a
webpage example rebuilt from the template (`feature-image-integration.png`)
replace the payers and platform examples. Mascot card corrected (the homepage
robot is the Rhapsody Axon mark, not Teddie) and its art
(`teddie-hero-frame.png`) removed. Deleted the three retired images remotely.

**Finding — the in-Claude design system is a stale snapshot.** Claude Design moved
into Claude; the migrated "Rhapsody Design System - Master" artifact
(claude.ai/artifact/HZExMiNnfussfoDeDHnMB2) is a frozen 2026-10-13 copy, private to
its owner, and its Design System page shows no templates at all. DesignSync only
updates this standalone project, which closes 2026-12-14. Updating the in-Claude
system needs the Artifact tool, not DesignSync.

## Sync 2026-10-26 — /design-sync parity run
Pinned project confirmed (PROJECT_TYPE_DESIGN_SYSTEM, canEdit). Remote already
matched local by name (30 cards + `templates/feature-image/`). Parity push of all
30 cards, `tokens.css`, and the feature-image template folder, fenced by the
sentinel before and after. No manifest, no deletes. This updates the standalone
project only; see the 10-26 finding above about the in-Claude copy.

## 2026-10-26 — Pitch deck template removed (owner request)
Removed the pitch deck template from the gallery at the owner's request. It had
been renamed in the GUI minutes earlier from `templates/axon-connect-pitch-deck/`
to `templates/axon-broadcast-pitch-deck/` ("Axon Broadcast Pitch Deck"); the owner
confirmed removing the renamed folder. All 6 files deleted, sentinel re-armed.
Gallery now: Email Signature Banner, Website Feature Image. The original upload
`uploads/Rhapsody Axon Connect Pitch Deck.dc.html` was kept as a fallback. The
template was never in git, so the uploads copy is the only remaining source.
Lesson: re-list right before a delete; GUI renames move template folders.

## 2026-10-27 — Portrait ring sync BLOCKED (write permission)
Local change: portraits default to a single Rhapsody Blue ring (2–3px small,
4–6px feature); the navy-and-blue ring is the website hero badge only. Cards
changed: photography, quotes, name-lockup, corrections (+ web-pages, country
count 33, from the 10-26 merge). Plan finalized, but `write_files` returned
HTTP 403 "cannot edit this project" twice. `list_projects` still shows the
project as owned; `get_project` no longer reports `canEdit`. Remote last
updated 2026-10-26 14:44Z, so the 10-26 country-count change never reached
it either. Nothing was written. The standalone project appears to be read-only
now that Claude Design lives in Claude. Pending: push these five cards once
edit access returns, or move the system to the in-Claude artifact.
- 2026-10-27 20:55Z: /design-sync retry. Fresh plan finalized; the first write
  (the sentinel) still returned HTTP 403 "cannot edit this project". Stopped
  before any content write. Remote unchanged since 2026-10-26 14:44Z.

## 2026-11-03 — Moved to the Claude design system (owner request)
The standalone project is read-only (writes return 403) and closes 2026-12-14, so
the team's design system is now the Claude design system "Rhapsody Design System -
Master" (claude.ai/artifact/HZExMiNnfussfoDeDHnMB2, shared with the org). It was
the 2026-10-13 migration snapshot; the owner ran "Finish setting up" on 10-26.
Refreshed it from this repo with the Artifact tool, in two publishes (content,
then the index `project/design-system.json` last):

- **Cards:** all 30 (the 29 guide cards + Business card) as
  `project/components/<Name>/preview.html`, paths rewritten to `../../tokens.css`,
  `../bundle.css`, `../../assets/`; marker `group height width subtitle`. Each card
  also got `README.md` guidelines converted from its text. Folder names: kebab →
  PascalCase (powerpoint-template → PowerPointTemplate).
- **Tokens:** `project/tokens.json` updated (usage notes for blue/lblue/teal per the
  website rules; status-success/-warning/-error; live web type scale: hero 48,
  stat-number 40, h2 24, card-title 20, p1 16, p2 14, small 12, eyebrow 13 at
  0.17em, annotation 12). `project/tokens.css` regenerated in the page's layout.
  `project/components/bundle.css` = repo `tokens.css` minus `:root`.
- **Added:** fluid-dots masters, big-dots/eco set, new figures, dupimg2.png,
  `templates/feature-image/` (template, README, source HTML + render script).
- **Removed (84 files):** retired cards (DisplayAds, Email, Hero, Social,
  ProductLaunch, Dots, Frameworks), the migration's 32 flat `components/*.html`
  copies, `templates/axon-connect-pitch-deck/`, retired assets (dot-fields,
  old bd-*.svg, dots-*.png, display-ads, unreferenced figures), stale
  `manifest.json` and `_ds_manifest.json`. Kept: `uploads/` (incl. the pitch deck
  original), email-signature template, light-devices masters, brand/, fonts/.
- The Claude design system shows no template gallery; templates are files there.
- Going forward: edit the repo, then republish changed files to that artifact.
- 2026-11-03: Cover (`project/components/Cover/preview.html`) redone at the owner's
  request. The old top band had hand-placed white dots imitating the retired
  scattered dot field. Now 12 square-top, round-bottom module tiles (light-blue
  outlines, two blue fills, one teal) on the navy band. Dot devices on the cover
  must be approved masters, and the cover allows no images, so it uses no dots.
- 2026-11-03: FY27 icon library. Icon library card rewritten to direct everyone to
  the official library (SharePoint: Marketing > Public > _Rhapsody Brand Materials >
  Brand Package FY27 > Icon Library; 271 icons x 4 versions, SVG + PNG). 20 sample
  tiles copied from the library's PNG folders into `assets/icons/` (library file
  names). The SVGs can't be read through the SharePoint connector, so the stroke was
  measured from the 184px PNG masters (about 4-5px, lighter than the old 1.7): the
  rules say "lighter than 1.7, keep as drawn" with no exact number until the SVGs
  are checked. Published to the Claude design system (Icons, WebPages, Corrections,
  README, assets/icons, index group "icons"). build_guide.py now keeps SharePoint
  links in the internal guide page and de-links them only in the external HTML.
- 2026-11-03: Mascot (Teddie Mercury) rules finalized at the owner's direction:
  internal, culture, and Connect Developer Conference only; other uses need
  marketing approval; never a primary device or template fixture. Card links to
  SharePoint Brand Package FY27 > Character Library > Teddie Mercury, but that
  folder was NOT on SharePoint yet when checked (FY27 has only Icon Library,
  Office TVs, Social Media Cover Images); re-check the link once it syncs. No
  Teddie art in the system yet. Published to the Claude design system (Mascot,
  Corrections, README).
- 2026-11-03: Media added from owner uploads.
  - Icons: the four FY27 SVG folders are in the repo at assets/icons/svg/{blue,white,
    light-tile,dark-tile}/ (271 each) with a name index in assets/icons/README.md. Spec
    read from the files: 24x24 grid, stroke set per icon (mostly 0.85-0.9), tiles 44x44
    rx 11, light #E9EDF2 (the `tile` token now matches), dark white @10%, glyph 24px
    centered. QA for the designer: 19 icons use #2889F5 on some strokes, the White
    Patient-multiple-records has a blue stroke, 4 lack round caps, 35 have strokes
    1.1-1.4. Claude design system holds blue + white only (file cap).
  - Photos: 102 3:2 + 103 1:1 single-person photos as web masters (1200x800, 800x800,
    q82, metadata stripped) in assets/photos/. Originals: no public SharePoint folder
    found yet (nearest: Private/Graphic Design/Projects/Photo Library Sourcing-R2).
  - Teddie: 9 files (color, standing, navy, white, lightgray; SVG + PNG) in assets/mascot/.
  - LinkedIn employee banners: 4 files from SharePoint FY27 Social Media Cover Images in
    assets/banners/ (full res; the guide uses 1584px copies in assets/figures/). New card
    components/linkedin-banners.html. Off-system details flagged to the owner: periods on
    one-sentence headlines (all four), Blue Dots uses #3D7FED and light-gray dots, the
    wave cut-out isn't a documented device.
  - Claude design system is at 986 of its 1,008-file cap. Removed the 8 duplicate Aurora
    files in uploads/ to make room. Future media needs the asset store or a cleanup.
- 2026-11-03 (later): icon tiles dropped. Repo and Claude design system keep only the blue
  and white SVGs; the PNG tile samples (repo and the 20 in the design system) and the
  repo's light/dark tile SVG folders are removed. Tiles are now built to one recipe
  (44px, 11px corners, 24px glyph; `.icon-tile` / `.icon-tile.dark` + `.glyph` in tokens.css
  and bundle.css). Design system now 978 of 1,008 files.
  - Photo library: SharePoint FY27 Photo Library link added to the Photography card,
    skill and design system README.
  - Wave cut-out: approved for the LinkedIn banners only, stated on the banner card,
    skill and design system README; never a system device.
  - LinkedIn banners redrawn on brand (deliverables/linkedin-banners/, 4752x1188): no end
    periods, Poppins Medium, approved Aurora master (navy) on the two navy banners, fluid
    dots traced from fd-blue.jpg as white on #1A81F4. assets/banners/ and the 1584px
    figures now hold the redraws; the owner replaces the SharePoint files.
  - Guide artifact v35; design system v27 (files) + v28 (index).
- 2026-11-03: design system cover rebuilt on brand (the earlier tile-pattern cover was an
  invented device with four brand colors and no logo). Now: navy ground, the approved Aurora
  master (assets/light-devices/aurora-navy.jpg, flipped, left edge feathered into navy),
  one-color white logo, Poppins Medium 48px "Rhapsody Design System" with "Design System"
  in light blue, white 16px tagline. Source kept in .design-sync/cover/. Design system v29 + v30 (index).
- 2026-11-10: Technical documents. The two approved eMudhra customer security advisories
  (Rhapsody Engine and Rhapsody Identity) are saved as reference examples in
  examples/technical-documents/ and are the model for white papers, release notes and security
  advisories. New card components/technical-documents.html (anatomy, components, writing rules,
  what was settled between the two examples). Word templates (.dotx) for all three in
  templates/word-documents/ (build.js + art/; validated against the OOXML schema). The design
  system can't serve .dotx, so the card points to the repo and Word's File > New. Cover dots
  traced from fd-white.jpg and set in #1A81F4 (the master is #3D7FED). Guide v36/v37; design
  system v35 (files) + v36 (index).
- 2026-11-10 (later): brand corrections from the owner. (1) All-white logo on navy and on Aurora
  over navy, at every size; the blue wordmark + white line is no longer used there. (2) Multi-page
  documents: same header and footer from page 2 on, logo exactly once per page, compact interior
  header. (3) The rounded-bottom container is for one element per page; lists and specs use
  bullets, steps or tables. (4) Test every digital asset at phone width; touch targets at least
  44x44px, checklist rows tappable, checkboxes at least 24px. Updated: Logo, Corners, Technical
  documents, Web pages, Corrections cards; skill (logo, shape, documents, mobile, checklist);
  design system README. Guide v38; design system v37 (files) + v38 (index).
