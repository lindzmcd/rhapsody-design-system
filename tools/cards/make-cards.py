#!/usr/bin/env python3
"""
Rhapsody business cards -- batch producer.

Reads a CSV of employees and writes one press-ready PDF per person, front on
page 1 and back on page 2, at trim plus bleed. Regenerates each person's QR
codes from their own email and LinkedIn handle on the way through, and refuses
to finish quietly if a code comes out below the printable module floor.

    pip install segno playwright
    python3 make-cards.py employees.csv

CSV columns: name, title, email, linkedin, phone
  linkedin is the vanity handle only, not the full URL. Strip any
  ?utm_source=... a profile link copied out of the phone app carries.

Output, in out/:
  <slug>.pdf          2 pages, 3.75 x 2.25in (3.5 x 2in trim + 0.125in bleed)
  <slug>-*.svg        the codes, in case a printer wants them separately

Colour: this writes RGB. Rhapsody Blue must be set as CMYK 100 50 0 0 on
press, so hand the printer these PDFs for position and content and agree the
blue as a named swatch, or have them convert with that value pinned. Do not
let a layout program auto-convert the hex; see the card component for why.
"""
import csv, sys, re, os, glob, base64, importlib.util, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent.parent
OUT = HERE / "out"

# reuse the card component's own QR renderer rather than a second copy of it
_spec = importlib.util.spec_from_file_location("qrgen", ROOT / "assets/qr/make-card-qr.py")
qrgen = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(qrgen)

TRIM_W, TRIM_H, BLEED = 3.5, 2.0, 0.125
PAGE_W, PAGE_H = TRIM_W + 2 * BLEED, TRIM_H + 2 * BLEED
SAFE = 0.22                      # inset from trim
INSET_EM = (BLEED + SAFE) * 10   # 1em == 0.1in at trim scale

DEVICE = """<circle cx="334.6" cy="208.5" r="102.1" fill="#1A81F4"/>
<circle cx="230.8" cy="95.9" r="28.3" fill="#FFFFFF"/>
<circle cx="303.8" cy="111.5" r="18.6" fill="#B4D8FF"/>
<circle cx="272.2" cy="170.7" r="8.1" fill="#23C5BF"/>"""

TOKENS = {"navy": "#0B2C47", "blue": "#1A81F4", "lblue": "#B4D8FF",
          "teal": "#23C5BF", "dgray": "#7E858C"}


def find_chromium():
    """Playwright's own browser if it is installed, otherwise a system/preinstalled one."""
    env = os.environ.get("CHROMIUM_PATH")
    if env and pathlib.Path(env).exists():
        return env
    for pat in ("/opt/pw-browsers/chromium-*/chrome-linux/chrome",
                "/usr/bin/chromium", "/usr/bin/chromium-browser",
                "/usr/bin/google-chrome"):
        hits = sorted(glob.glob(pat))
        if hits:
            return hits[-1]
    return None          # let Playwright fall back to its own download


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def page_html(front_svg, logo_uri, person, qr_li, qr_em):
    t = TOKENS
    # viewBox origin is shifted by the bleed so the device keeps its trim-space
    # composition and simply runs off the page edge into the bleed
    vb = f"{-BLEED*100} {-BLEED*100} {PAGE_W*100} {PAGE_H*100}"
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
@page {{ size: {PAGE_W}in {PAGE_H}in; margin: 0; }}
*{{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
.pg{{width:{PAGE_W}in;height:{PAGE_H}in;font-size:.1in;font-family:'Poppins',Arial,sans-serif;
  line-height:1.3;position:relative;overflow:hidden;page-break-after:always;}}
.pg:last-child{{page-break-after:auto;}}
.in{{position:relative;height:100%;padding:{INSET_EM}em;display:flex;flex-direction:column;
  justify-content:space-between;}}
.front{{background:{t['navy']};}}
.dev{{position:absolute;inset:0;width:100%;height:100%;}}
.logo{{width:15em;display:block;}}
.name{{font-size:1.4em;font-weight:500;color:#fff;letter-spacing:.005em;}}
.role{{font-size:1em;color:{t['lblue']};margin-top:.25em;}}
.back{{background:#fff;}}
.top{{display:flex;justify-content:space-between;align-items:flex-start;gap:1.4em;}}
.qrs{{display:flex;gap:1.6em;}}
.qrbox{{width:8.5em;height:8.5em;}}
.qrbox svg{{width:100%;height:100%;display:block;}}
.qrlab{{display:flex;align-items:center;gap:.7em;margin-top:.9em;font-family:'IBM Plex Mono',monospace;
  font-size:.9em;font-weight:500;letter-spacing:.17em;text-transform:uppercase;color:{t['navy']};}}
.qrlab i{{width:1.6em;height:.3em;background:{t['teal']};flex:none;}}
.cue{{font-family:'IBM Plex Mono',monospace;font-size:.82em;font-weight:500;letter-spacing:.17em;
  text-transform:uppercase;color:{t['blue']};text-align:right;white-space:nowrap;}}
.foot{{display:flex;justify-content:flex-end;}}
.contact{{text-align:right;font-size:.95em;line-height:1.25;}}
.tel,.mail{{color:{t['navy']};white-space:nowrap;}}
.mail{{margin-top:.1em;}}
.web{{color:{t['blue']};font-weight:500;white-space:nowrap;margin-top:.15em;}}
</style></head><body>
<div class="pg front">
  <svg class="dev" viewBox="{vb}" preserveAspectRatio="none" aria-hidden="true">{front_svg}</svg>
  <div class="in">
    <img class="logo" src="{logo_uri}" alt="Rhapsody">
    <div>
      <div class="name">{person['name']}</div>
      <div class="role">{person['title']}</div>
    </div>
  </div>
</div>
<div class="pg back">
  <div class="in">
    <div class="top">
      <div class="qrs">
        <div><div class="qrbox">{qr_li}</div><div class="qrlab"><i></i>LinkedIn</div></div>
        <div><div class="qrbox">{qr_em}</div><div class="qrlab"><i></i>Email</div></div>
      </div>
      <div class="cue">Scan to connect</div>
    </div>
    <div class="foot"><div class="contact">
      <div class="tel">{person['phone']}</div>
      <div class="mail">{person['email']}</div>
      <div class="web">rhapsody.health &rarr;</div>
    </div></div>
  </div>
</div>
</body></html>"""


def main(csv_path):
    from playwright.sync_api import sync_playwright
    OUT.mkdir(exist_ok=True)
    logo_uri = "data:image/png;base64," + base64.b64encode(
        (ROOT / "assets/logo-white.png").read_bytes()).decode()

    rows = list(csv.DictReader(open(csv_path)))
    required = {"name", "title", "email", "linkedin", "phone"}
    missing = required - set(rows[0] if rows else {})
    if missing:
        sys.exit(f"CSV is missing column(s): {', '.join(sorted(missing))}")

    warnings, made = [], []
    with sync_playwright() as p:
        exe = find_chromium()
        browser = p.chromium.launch(args=["--no-sandbox"],
                                    **({"executable_path": exe} if exe else {}))
        for row in rows:
            row = {k: (v or "").strip() for k, v in row.items()}
            slug = slugify(row["name"])
            if "linkedin.com" in row["linkedin"]:
                sys.exit(f"{row['name']}: put the handle in the CSV, not the full URL "
                         f"({row['linkedin']})")
            print(f"\n{row['name']}  <{row['email']}>")

            # regenerate this person's codes, capturing any floor warning
            import io, contextlib
            buf = io.StringIO()
            with contextlib.redirect_stdout(buf):
                qrgen.make(slug, row["email"], row["linkedin"], outdir=str(OUT))
            report = buf.getvalue()
            print(report, end="")
            if "UNDER THE" in report:
                warnings.append(row["name"])

            qr_li = (OUT / f"{slug}-linkedin.svg").read_text()
            qr_em = (OUT / f"{slug}-email.svg").read_text()
            html = page_html(DEVICE, logo_uri, row, qr_li, qr_em)
            tmp = OUT / f"{slug}.html"
            tmp.write_text(html)

            pg = browser.new_page()
            pg.goto(tmp.as_uri())
            pg.wait_for_timeout(1800)          # let the webfonts land before printing
            pg.pdf(path=str(OUT / f"{slug}.pdf"), width=f"{PAGE_W}in",
                   height=f"{PAGE_H}in", print_background=True,
                   margin={"top": "0", "bottom": "0", "left": "0", "right": "0"})
            pg.close()
            tmp.unlink()
            made.append(f"{slug}.pdf")
        browser.close()

    print(f"\n{len(made)} card file(s) in {OUT}")
    if warnings:
        print("\nBEFORE PRINTING, note these codes fell below the module floor:")
        for w in warnings:
            print(f"  - {w}")
        print("  Shorten the LinkedIn vanity URL, or scan-test these on the proof.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
