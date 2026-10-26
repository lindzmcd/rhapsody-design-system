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
