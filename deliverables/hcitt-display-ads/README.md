# Rhapsody x Healthcare IT Today — display ads

Animated GIF creative for the Healthcare IT Today header and sidebar placements,
built to the 2026 design system (`brand-design-system-2026`) with copy per
`rhapsody-brand`. Angle: the Rhapsody Axon™ agentic story.

## Files to send the publisher

| Placement | File | Size | Weight |
|---|---|---|---|
| Header display ad | `rhapsody-hcitt-500x80.gif` | 500 × 80 | 93 KB |
| Sidebar display ad | `rhapsody-hcitt-300x250.gif` | 300 × 250 | 180 KB |

**Click URL (both units):** `https://rhapsody.health/solutions/axon-ai-interoperability/`
Append the tracking parameters before handoff. Healthcare IT Today accepts tracking links.

## Alternates in this folder

| File | When to use |
|---|---|
| `*-loop.gif` | Identical creative set to loop continuously instead of stopping |
| `*-static.png` / `*-static.jpg` | Non-animated fallback, if a slot rejects GIF. Shows the closing frame |

## Animation

Three message beats, cross-faded, over a still Aurora soft wash on navy.

1. The problem, in the reader's words
2. The category claim
3. **Rhapsody Axon™** + the CTA, which is where the ad comes to rest

The Rhapsody logo, the mono eyebrow and the Rhapsody Blue CTA pill are on screen
the whole time, so the ad is clickable and attributable at every moment of the loop.

- **Loop:** 9.44s, played 3 times, then holds on the Rhapsody Axon™ + CTA frame.
  Total motion ≈ 28s. The `-loop` files run continuously instead.
- **Cross-fade:** 480ms, ease-in-out sine. No flashing, no strobing, no hard cuts.
- Aurora is delivered as the **still** soft wash. It is the approved register for a
  layout this small, and it keeps the files light. (A drifting Aurora re-encodes the
  whole gradient on every frame and pushes the sidebar unit past 260 KB for motion
  that is imperceptible at 300 × 250.)

## Copy

**500 × 80 header**
1. More interfaces. *Same team.*
2. The first healthcare integration agent.
3. **Rhapsody Axon™** · CTA: See how →

**300 × 250 sidebar** — light-blue mono eyebrow `AGENT-READY` throughout
1. Your interface queue keeps growing. *Your team hasn't.*
2. The first healthcare integration agent.
3. **Rhapsody Axon™** / Built into Rhapsody and Corepoint · CTA: See how it works →

Beat 1 leads with the reader's reality before any product mention, per the
audience-first rule. *Italics* above mark the light-blue half of the two-tone headline.

## Brand check

- Ground navy `#0B2C47`, CTA pill Rhapsody Blue `#1A81F4`, light blue `#B4D8FF` as the one
  secondary accent. Three brand colors, navy-dominant. Teal `#23C5BF` appears only inside the
  Aurora glow, which carries its own sanctioned teal/blue/purple palette.
- Aurora on navy only; glow runs teal → blue → purple, never orange. One device per ad.
- Poppins Regular for copy, Medium for the product name and the CTA; IBM Plex Mono
  for the eyebrow only.
- One-color white logo on the dark ground, 108px wide (the on-screen minimum), with
  clear space ≥ the height of the R on every side.
- Light blue 5.4–9.1:1, white 8.0–13.5:1, measured per pixel against the actual rendered
  Aurora background rather than a flat navy assumption.
- Rhapsody Axon™ carries the ™ on its first and most prominent use, and never
  appears as "Axon" alone. No "integration engine", no em dashes, no end periods on
  the single-sentence beats.
- Copy was shortened to fit, never tracked or scaled down.

## Rebuilding

Source and tooling live in the session scratchpad, not in this repo. To regenerate:
`src/ad.html` renders any frame of either unit from `?unit=side|hdr&t=<ms>`;
`render.js` screenshots the frame plan with headless Chromium at 3x; `build_gif.py`
downsamples, dithers the shared background once and composites crisp type over it.

## Open items

- Healthcare IT Today publishes no maximum file weight for these slots. Both units
  are under 200 KB, which clears the common 200 KB publisher cap. Confirm with the rep.
- If the rep enforces the legacy 15-second animation cap, drop to 2 loops and
  shorten the dwells; the timing constants are at the top of `src/ad.html`.
- Aurora is rendered here as an in-system CSS wash, the same way the Light devices
  card renders it in HTML. If brand would rather these ship against the official
  AuroraGlow master art, swap the background plate and re-run the build.
