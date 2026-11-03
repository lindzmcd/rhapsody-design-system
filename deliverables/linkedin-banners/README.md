# LinkedIn employee banners (redrawn, November 2026)

On-brand redraws of the four approved employee LinkedIn cover images. They're meant to replace the files in
SharePoint > Brand Package FY27 > Social Media Cover Images. Each one is 4752×1188 PNG, which is LinkedIn's 1584×396 at 3×.

| File | What changed from the original |
|---|---|
| `rhapsody-linkedin-banner-blue-wave.png` | End period removed; headline in Poppins Medium; wave and wordmark kept |
| `rhapsody-linkedin-banner-navy-harmony.png` | End period removed; the custom glow is replaced with the approved Aurora master (navy) |
| `rhapsody-linkedin-banner-navy-aurora.png` | End period removed; the custom teal gradient is replaced with the approved Aurora master; headline in Poppins Medium |
| `rhapsody-linkedin-banner-blue-dots.png` | End period removed; the dots are traced from the fluid-dot master and set as Rhapsody Blue #1A81F4 with white dots (the master file is #3D7FED with light-gray dots); headline in Poppins Medium |

The wave cut-out is approved for these banners only. It isn't a device in the Rhapsody system.

## Rebuild

`source/` holds one HTML composition per banner (1584×396 CSS px). To rebuild them, run
`node source/render.mjs "$PWD/source" 3`, which uses Playwright and writes `out-<name>@3x.png` next to the HTML.
Fonts come from `templates/feature-image/source/fonts/local-fonts.css`.
