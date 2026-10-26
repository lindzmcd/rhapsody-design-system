# Rhapsody x Healthcare IT Today — display ads

Animated GIF creative for the Healthcare IT Today header and sidebar placements,
built to the 2026 design system (`brand-design-system-2026`) with copy per
`rhapsody-brand`. Angle: the Rhapsody Axon agentic story.

> ⚠️ **One blocker before these run: the lockup carries no ™.** See Open items.

## Files to send the publisher

| Placement | File | Size | Weight |
|---|---|---|---|
| Header display ad | `rhapsody-hcitt-500x80.gif` | 500 × 80 | 62 KB |
| Sidebar display ad | `rhapsody-hcitt-300x250.gif` | 300 × 250 | 127 KB |

**Click URL (both units):** `https://rhapsody.health/solutions/axon-ai-interoperability/`
Append the tracking parameters before handoff. Healthcare IT Today accepts tracking links.

## Alternates in this folder

| File | When to use |
|---|---|
| `*-loop.gif` | Identical creative set to loop continuously instead of stopping |
| `*-static.png` / `*-static.jpg` | Non-animated fallback, if a slot rejects GIF. Shows the closing frame |
| `source/` | The Rhapsody Axon lockup as supplied, plus the name-only derivative the ads use |

## The mark

The **Rhapsody Axon lockup replaces the plain Rhapsody wordmark** on both units.
Because the lockup carries the product name permanently, the name comes out of the
copy, which is what buys the extra room.

- Sidebar: lockup at 240px, so RHAPSODY inside it measures 151px, well over the
  108px on-screen floor and noticeably larger than the 108px plain wordmark it replaced.
- Header: lockup at 172px, which puts RHAPSODY at 108px, exactly the floor. That is
  the smallest this lockup can legally go.
- **The tagline is dropped.** "Your AI agent for integration." only clears the 13px
  floor at a lockup width of about 272px, which is wider than the sidebar's 264px
  content area. At the widths that fit it renders around 8–10px. The ads use the
  name-only derivative in `source/axon-lockup-name-only.svg`.

The supplied lockup's RHAPSODY is the genuine official wordmark: its path data is
byte-identical to `brand/Rhapsody logo - blue-white/Rhapsody_logo_blue-white.svg`
under a uniform `scale(4.2918)`, and its ink box is 232.22 × 24.00, aspect 9.6758,
matching all three official vectors exactly. Nothing is stretched or recolored.

## Animation

Two message beats, cross-faded, over a still Aurora soft wash on navy.

1. The problem, in the reader's words
2. The claim, which is where the ad comes to rest, with the CTA

- **Loop:** 6.76s, played 3 times, then holds on the claim frame. Total motion ≈ 20s.
  The `-loop` files run continuously instead.
- **Cross-fade:** 480ms, ease-in-out sine. No flashing, no strobing, no hard cuts.
- Aurora is the **still** soft wash, the approved register at this size, and it keeps
  the files light. The Axon mark is **static**; only a still of it is available here.

## Copy

**500 × 80 header**
1. More interfaces. *Same team.*
2. Healthcare's first *integration agent.*

**300 × 250 sidebar**
1. Your interface queue keeps growing. *Your team hasn't.*
2. The first healthcare *integration agent.*

Beat 1 leads with the reader's reality before any product mention, per the
audience-first rule. *Italics* mark the light-blue half of the two-tone headline.
The header says "Healthcare's first" rather than "The first healthcare" purely to
break over two lines in the 159px the lockup leaves; the claim is the same.

No eyebrow on either unit, and no mono type anywhere now. "Axon" never appears alone
in the copy because it never appears in the copy at all. The lockup carries the name,
and it reads "RHAPSODY AXON", satisfying the rule that the mark never stands as "Axon".

## The Rhapsody Axon mark

The robot character. **Sidebar only**, bottom-right beside the CTA at 40px. The header
cannot take it: the lockup, two lines of copy and a labelled pill already use the full
500px, and adding it drops the copy column to 126px, about 15 characters a line.

It sits beside the copy and never in it, subordinate to the headline, clear of the
lockup's clear space, not merged into the lockup, one per asset, not recolored,
re-posed or cropped.

> **Note on the source.** This character is **Rhapsody Axon**, not the Teddie Mercury
> mascot. The repo currently mislabels it: the art lives at
> `assets/figures/teddie-hero-frame.png` and the `components/mascot.html` card captions
> that same image "Teddie at the center of the constellation". That card carries a
> "Draft for review, confirm before treating these as final" banner, so the mislabel
> looks like a drafting error. Worth fixing at the source, because anyone else building
> from the design system will inherit it.

## Brand check

- Ground navy `#0B2C47`, CTA pill Rhapsody Blue `#1A81F4`, light blue `#B4D8FF` as the
  one secondary accent. Navy-dominant. Teal `#23C5BF` appears only inside the Aurora
  glow and on the Axon mark's antenna, both of which carry their own sanctioned palettes.
- Aurora on navy only; glow runs teal → blue → purple, never orange. One device per ad.
- Poppins Regular for copy, Medium for the CTA.
- Light blue 5.4–9.2:1, white 8.0–13.5:1, measured per pixel against the actual
  rendered Aurora background rather than a flat navy assumption.
- No "integration engine", no em dashes, no end periods on the single-sentence beats.
- Copy was shortened to fit, never tracked or scaled down.

## Rebuilding

Source and tooling live in the session scratchpad, not in this repo. `src/ad.html`
renders any frame of either unit from `?unit=side|hdr&t=<ms>`, with `&mark=0` to drop
the Axon mark; `render.js` screenshots the frame plan with headless Chromium at
3x; `build_gif.py` downsamples, dithers the shared background once and composites
crisp type over it.

## Open items

- **The lockup carries no ™, and nothing else in the ad does either.** The brand rule
  is that ™ goes on the first and most prominent use of Rhapsody Axon in any asset.
  Until the name was in the copy, the typeset "Rhapsody Axon™" satisfied that; now the
  lockup is the only instance and it has no mark. A ™ cannot be added to a logo here,
  so **request the Rhapsody Axon lockup with ™ from brand and swap it in.** Treat this
  as required before the ads run, not as a nice-to-have.
- **A one-colour white lockup would be more correct at these sizes.** The supplied file
  is the blue-wordmark-plus-white-line variant, which the guide reserves for large
  sizes on dark grounds; below that it calls for one-colour white. The header's
  RHAPSODY sits exactly at the 108px floor, which is not "large". Recoloring the
  supplied file is not allowed, so this needs the white lockup from brand.
- **The Axon mark should be re-mastered from the isolated character file.** The only
  art in this repo is the homepage hero still, where the mark sits at the centre of the
  dot constellation. It was isolated from that losslessly by connected component, at
  native resolution, with no redraw, recolor, re-pose or rescale, and every constellation
  dot dropped. That is still an extraction from a composite rather than the master.
- **Confirm the Axon mark may sit over Aurora here.** `references/web-style.md` §2 says
  that on the Axon AI page "the animated Rhapsody Axon mark replaces the light device"
  and that "one visual element per layout always holds". These ads carry both Aurora and
  the mark. The homepage hero does combine them, which is where this still comes from, so
  the "replaces" rule reads as specific to that page template. If it is meant to apply to
  any Axon-led layout, the fix is to drop Aurora on the sidebar and let the mark carry the
  frame.
- **Fix the mislabelled mascot art in the design system.** See the note under The
  Rhapsody Axon mark above.
- Healthcare IT Today publishes no maximum file weight for these slots. Both units are
  well under 200 KB. Confirm with the rep.
- Aurora is rendered as an in-system CSS wash, the same way the Light devices card
  renders it in HTML. If brand would rather these ship against the official AuroraGlow
  master art, swap the background plate and re-run the build.
