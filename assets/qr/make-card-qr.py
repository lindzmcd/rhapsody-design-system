#!/usr/bin/env python3
"""
Rhapsody business card — QR generator.

Renders the two card QR codes (LinkedIn + email) as print-ready SVG in Rhapsody
Navy, using rounded "beaded" modules so the code reads as part of the brand's dot
language without costing scan reliability.

    pip install segno
    python3 make-card-qr.py "Firstname Lastname" first.last@rhapsody.health linkedin-handle
    python3 make-card-qr.py "Firstname Lastname" first.last@rhapsody.health linkedin-handle \
        https://rhapsody.health/c/firstname-lastname

The optional fourth argument is the profile-page URL used by the speaker card,
whose single code and NFC tap both resolve to the same page. Keep that URL short:
it shares the 0.85in tile with everything else, and a longer string costs modules.

Module geometry was decode-tested with zxing-cpp (phone-grade) and OpenCV across
resolutions and blur. RADIUS 0.50 keeps modules tangent: it scores full marks on
zxing and tracks the plain-square control on OpenCV. Smaller radii look airier but
fail on weaker scanner apps -- do not reduce RADIUS without re-running that test.
"""
import sys, re, os, segno

NAVY = "#0B2C47"
RADIUS = 0.50        # tangent modules. see note above before changing
QUIET = 2            # modules drawn in-file; the card tile padding supplies the rest
MIN_MODULE_MM = 0.60 # printed module floor; drives the ECC choice


def render(data, path, width_in=0.85, square=False):
    chosen = None
    for err in ("q", "m"):
        qr = segno.make(data, error=err, micro=False)
        n = len(qr.matrix)
        mm = (width_in * 25.4) / (n + 2 * QUIET)
        if mm >= MIN_MODULE_MM:
            chosen = (qr, n, err, mm)
            break
    if chosen is None:
        qr = segno.make(data, error="m", micro=False)
        n = len(qr.matrix)
        chosen = (qr, n, "m", (width_in * 25.4) / (n + 2 * QUIET))
    qr, n, err, mm = chosen
    m, size = qr.matrix, n + 2 * QUIET

    def is_finder(r, c):
        return any(br <= r < br + 7 and bc <= c < bc + 7
                   for br, bc in ((0, 0), (0, n - 7), (n - 7, 0)))

    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
           f'shape-rendering="geometricPrecision" role="img" aria-label="QR code">',
           f'<rect width="{size}" height="{size}" fill="#fff"/>', f'<g fill="{NAVY}">']
    for y in range(n):
        for x in range(n):
            if not m[y][x]:
                continue
            if square:
                out.append(f'<rect x="{x+QUIET}" y="{y+QUIET}" width="1" height="1"/>')
            elif is_finder(y, x):
                continue
            elif y == 6 or x == 6:                      # timing patterns stay solid
                out.append(f'<rect x="{x+QUIET}" y="{y+QUIET}" width="1" height="1"/>')
            else:
                out.append(f'<circle cx="{x+QUIET+.5}" cy="{y+QUIET+.5}" r="{RADIUS}"/>')
    if not square:                                      # finder eyes: rounded, solid
        for br, bc in ((0, 0), (0, n - 7), (n - 7, 0)):
            X, Y = bc + QUIET, br + QUIET
            out.append(f'<rect x="{X+0.5}" y="{Y+0.5}" width="6" height="6" rx="0.6" '
                       f'fill="none" stroke="{NAVY}" stroke-width="1"/>')
            out.append(f'<rect x="{X+2}" y="{Y+2}" width="3" height="3" rx="0.9"/>')
    open(path, "w").write("".join(out) + "</g></svg>")
    flag = "" if mm >= MIN_MODULE_MM else f"  <-- UNDER THE {MIN_MODULE_MM}mm FLOOR"
    print(f"  {path.split('/')[-1]:38s} v{qr.version} ECC-{err.upper()} "
          f"{n}x{n}  {mm:.2f}mm/module at {width_in}in{flag}")
    if mm < MIN_MODULE_MM:
        print(f"      The encoded string is {len(data)} characters, which needs {n}x{n} modules.")
        print( "      Shorten it (a custom LinkedIn vanity URL is the usual culprit) or print this")
        print( "      code larger. Do not ship it at this size without a scan test on the proof.")


def make(slug, email, handle, profile=None, outdir="."):
    targets = [("linkedin", f"https://linkedin.com/in/{handle}"),
               ("email", f"mailto:{email}")]
    if profile:
        targets.append(("profile", profile))
    for label, data in targets:
        # the speaker card prints its single code larger than the two-code card does
        w = 0.90 if label == "profile" else 0.85
        render(data, f"{outdir}/{slug}-{label}.svg", width_in=w)
        render(data, f"{outdir}/{slug}-{label}-square.svg", width_in=w, square=True)


if __name__ == "__main__":
    if len(sys.argv) not in (4, 5):
        sys.exit(__doc__)
    name, email, handle = sys.argv[1:4]
    profile = sys.argv[4] if len(sys.argv) == 5 else None
    slug = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    print(f"{name} <{email}>  linkedin.com/in/{handle}")
    make(slug, email, handle, profile, outdir=os.path.dirname(os.path.abspath(__file__)))
