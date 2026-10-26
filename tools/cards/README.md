# Business cards — batch production

Produces press-ready PDFs for the standard two-code business card, one per
employee, from a CSV. Each person's QR codes are regenerated from their own
email and LinkedIn handle as part of the run, so the codes and the printed
details can never drift apart.

## Run it

```bash
pip install segno playwright
python3 make-cards.py employees.csv
```

Output lands in `out/`:

| File | What it is |
|---|---|
| `<slug>.pdf` | 2 pages — front, then back — at 3.75 × 2.25 in |
| `<slug>-*.svg` | that person's codes, if a printer wants them separately |

`out/` is generated and git-ignored. Delete it and re-run whenever details change.

## The CSV

```csv
name,title,email,linkedin,phone
Michelle Blackmer,Chief Marketing Officer,Michelle.Blackmer@rhapsody.health,michelle-blackmer,+1 555 012 7890
```

`linkedin` is the **vanity handle only**, not the full URL. A profile link
copied out of the LinkedIn phone app arrives as
`https://www.linkedin.com/in/some-handle?utm_source=share_via&utm_content=profile&utm_medium=member_ios`
— take `some-handle`. The script stops with an error if it finds a URL in that
column, because those tracking parameters would otherwise be baked into a
printed code and tag every scan as an app share.

Titles come from the directory and are never abbreviated to fit. If one is too
long for the card, shorten nothing: raise it, since the card is laid out so
nothing wraps.

## What the run checks for you

Each code is reported with its version, error-correction level and **printed
module size**. Anything under the 0.6 mm floor is flagged inline *and* repeated
as a summary at the end, naming the person — a code below the floor still
decodes on a good phone but gives up its margin for print gain, camera shake and
older scanners.

The usual cause is a long LinkedIn vanity URL. LinkedIn's auto-generated handles
carry a random suffix (`michelle-blackmer-1961aa2`); claiming a custom URL
shortens the string enough to drop a version and clear the floor. That is a
one-minute change on LinkedIn and the better fix.

## Handing off to a printer

- **Page size is trim plus bleed.** 3.5 × 2 in trim, 0.125 in bleed on all four
  sides, no crop marks — most printers impose their own. Ask first; if yours
  wants marks, say so and they can be added.
- **Everything holds 0.22 in from trim.** Nothing is set to wrap, so an overlong
  line pushes toward the trim rather than reflowing where you would see it.
  That is what the module and column checks above are guarding.
- **Colour needs a conversation.** These PDFs are RGB, because they come out of
  a browser. Rhapsody Blue must be **CMYK 100 50 0 0** on press; letting a
  layout program auto-convert `#1A81F4` gives a muddy blue. Agree the blue as a
  named swatch with the printer, or have them convert with that value pinned.
  For a large run, this is the one step worth doing in the printer's own
  prepress rather than here.
- **The codes are vector** in the PDF. Keep them that way: never flatten a code
  to JPG, and never let a printer re-trace or "optimise" one.
- **Scan the physical proof** — every code, both phones, ordinary indoor light —
  before the run is approved. The codes decode from the generated PDF, which is
  not the same as decoding off paper under a gloss laminate.

## Scope

This produces the **standard** card. The speaker card with the NFC tap pad is a
different back and depends on a per-person profile page existing first; see the
Business card component for that variant.
