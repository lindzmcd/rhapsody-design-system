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
