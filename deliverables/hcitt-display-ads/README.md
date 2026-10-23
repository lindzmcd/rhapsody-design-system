# Rhapsody x Healthcare IT Today — display ads

Animated GIF creative for the Healthcare IT Today header and sidebar placements,
built to the 2026 design system (`brand-design-system-2026`) with copy per
`rhapsody-brand`. Angle: the Rhapsody Axon™ agentic story, with Teddie Mercury as
the face of the assistant.

## Files to send the publisher

| Placement | File | Size | Weight |
|---|---|---|---|
| Header display ad | `rhapsody-hcitt-500x80.gif` | 500 × 80 | 92 KB |
| Sidebar display ad | `rhapsody-hcitt-300x250.gif` | 300 × 250 | 178 KB |

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

The Rhapsody logo, Teddie and the Rhapsody Blue CTA pill are on screen the whole
time, so the ad is clickable and attributable at every moment of the loop.

- **Loop:** 9.44s, played 3 times, then holds on the Rhapsody Axon™ + CTA frame.
  Total motion ≈ 28s. The `-loop` files run continuously instead.
- **Cross-fade:** 480ms, ease-in-out sine. No flashing, no strobing, no hard cuts.
- Aurora is delivered as the **still** soft wash. It is the approved register for a
  layout this small, and it keeps the files light. (A drifting Aurora re-encodes the
  whole gradient on every frame and pushes the sidebar unit past 260 KB for motion
  that is imperceptible at 300 × 250.)
- Teddie is **static**. The mascot card allows animating him only from the approved
  animation files, and the only art available here is a still.

## Copy

**500 × 80 header**
1. More interfaces. *Same team.*
2. The first healthcare integration agent.
3. **Rhapsody Axon™** · CTA: See how →

**300 × 250 sidebar**
1. Your interface queue keeps growing. *Your team hasn't.*
2. The first healthcare integration agent.
3. **Rhapsody Axon™** / Built into Rhapsody and Corepoint · CTA: See how it works →

Beat 1 leads with the reader's reality before any product mention, per the
audience-first rule. *Italics* above mark the light-blue half of the two-tone headline.

There is no eyebrow on either unit. The earlier `AGENT-READY` label was the website's
"Agent-ready interoperability" eyebrow truncated to fit, and it read as a fragment.
Teddie now holds that slot, which is a better use of it than a shortened label.

## Teddie Mercury placement

Per the mascot card, he is the friendly face of the Rhapsody Axon assistant, so this
is the right asset for an Axon-led ad. The usage rules are met:

- **Beside the copy, never in it.** Top-right on the sidebar, after the logo on the
  header. He is not in a headline, a capability statement, or a product lockup.
- **Subordinate to the message.** 50px on the sidebar, 32px on the header, against a
  22–29px headline. He accents, he does not lead.
- **Clear of the logo.** At least 20px of separation, against a required clear space of
  X (the height of the R, ~16px at the delivered logo width). Not merged into a lockup.
- **Navy ground, soft Aurora glow**, which the card names as his habitat on the website.
- **No dot devices.** One Teddie per asset. Not recolored, re-posed or given props.

## Brand check

- Ground navy `#0B2C47`, CTA pill Rhapsody Blue `#1A81F4`, light blue `#B4D8FF` as the
  one secondary accent. Navy-dominant. Teal `#23C5BF` appears only inside the Aurora
  glow and on Teddie's antenna, both of which carry their own sanctioned palettes.
- Aurora on navy only; glow runs teal → blue → purple, never orange. One device per ad.
- Poppins Regular for copy, Medium for the product name and the CTA. No mono type
  remains now that the eyebrow is gone.
- One-color white logo on the dark ground, 108px wide (the on-screen minimum), with
  clear space ≥ the height of the R on every side.
- Light blue 5.4–8.6:1, white 8.0–13.4:1, measured per pixel against the actual
  rendered Aurora background rather than a flat navy assumption.
- Rhapsody Axon™ carries the ™ on its first and most prominent use, and never
  appears as "Axon" alone. No "integration engine", no em dashes, no end periods on
  the single-sentence beats.
- Copy was shortened to fit, never tracked or scaled down.

## Rebuilding

Source and tooling live in the session scratchpad, not in this repo. To regenerate:
`src/ad.html` renders any frame of either unit from `?unit=side|hdr&t=<ms>`, with
`&teddie=0` for a mascot-free version and `&chip=1` for the header's arrow-chip CTA;
`render.js` screenshots the frame plan with headless Chromium at 3x; `build_gif.py`
downsamples, dithers the shared background once and composites crisp type over it.

## Open items

- **Teddie needs a brand sign-off for this placement.** The mascot card lists his
  approved homes as the homepage hero, Rhapsody Axon AI feature bands, and culture,
  event and swag moments. A paid display ad is none of those, though it is an Axon AI
  message on navy over Aurora, which is the band case in all but placement. The brand
  guide's rule is to leave him out unless the requester asks, and the requester asked.
- **Teddie should be re-mastered from the isolated character file.** The only art in
  this repo is `assets/figures/teddie-hero-frame.png`, the homepage hero still, where
  he sits at the centre of the dot constellation. He was isolated from it losslessly by
  connected component, at native resolution, with no redraw, recolor, re-pose or
  rescale of the character itself, and every constellation dot dropped. That is still
  an extraction from a composite rather than the master, so swap in the isolated file
  from the brand package before these go out.
- Healthcare IT Today publishes no maximum file weight for these slots. Both units
  are under 200 KB, which clears the common 200 KB publisher cap. Confirm with the rep.
- If the rep enforces the legacy 15-second animation cap, drop to 2 loops and
  shorten the dwells; the timing constants are at the top of `src/ad.html`.
- Aurora is rendered here as an in-system CSS wash, the same way the Light devices
  card renders it in HTML. If brand would rather these ship against the official
  AuroraGlow master art, swap the background plate and re-run the build.
