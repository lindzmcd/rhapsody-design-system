import re, os, json, base64, sys

REPO="/home/user/rhapsody-design-system"
SCR="/tmp/claude-0/-home-user-rhapsody-design-system/47735526-4992-5771-a7d6-e16dade8eb40/scratchpad"
DATE="August 2026"

MIME={".svg":"image/svg+xml",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",
      ".woff2":"font/woff2",".ttf":"font/ttf"}

def datauri(path):
    ext=os.path.splitext(path)[1].lower()
    b=open(path,"rb").read()
    return f"data:{MIME.get(ext,'application/octet-stream')};base64,"+base64.b64encode(b).decode()

# ---- fonts.css from downloaded latin woff2 ----
flist=json.load(open(f"{SCR}/fonts/list.json"))
font_faces=[]
for fam,w,st,fn in flist:
    uri=datauri(f"{SCR}/{fn}")
    font_faces.append(f"@font-face{{font-family:{fam};font-style:{st};font-weight:{w};font-display:swap;src:url({uri}) format('woff2');}}")
fonts_css="\n".join(font_faces)

# ---- tokens.css with assets -> data URIs ----
tokens=open(f"{REPO}/tokens.css").read()
def repl_tok(m):
    rel=m.group(1)
    return f"url({datauri(os.path.join(REPO,rel))})"
tokens=re.sub(r"url\((assets/[^)]+)\)", repl_tok, tokens)

# ---- manifest order ----
man=json.load(open(f"{REPO}/_ds_manifest.json"))
cards=man["cards"]

# group ordering preserved by manifest order; build TOC groups
from collections import OrderedDict
groups=OrderedDict()
for c in cards:
    groups.setdefault(c["group"],[]).append(c)

def slug(name):
    return re.sub(r"[^a-z0-9]+","-",name.lower()).strip("-")

# ---- extract each card's wrap, rewrite ../assets -> data URIs ----
asset_re=re.compile(r"\.\./(assets/[^\"')]+)")
def embed_assets(html):
    def r(m):
        return datauri(os.path.join(REPO,m.group(1)))
    return asset_re.sub(r, html)

# ---- de-link internal SharePoint URLs for the external package ----
INPKG="included in this package (<code>rhapsody-brand-assets/dot-devices</code>)"
ONREQ="available on request from Rhapsody"
SP_MAP={
    "product logo library": f"product logo library ({ONREQ})",
    "Rhapsody logos": "Rhapsody logos are included in this package",
    "Product logos": f"product logos are {ONREQ}",
    "Rhapsody icon library": f"Rhapsody icon library ({ONREQ})",
    "Light Devices": ONREQ,
    "Brand devices": INPKG,
    "Scattered Dots": INPKG,
}
sp_re=re.compile(r'<a href="https://rhapsodyhealth\.sharepoint\.com/[^"]*">([^<]*)</a>')
def delink_sp(html):
    return sp_re.sub(lambda m: SP_MAP.get(m.group(1), m.group(1)), html)

sections=[]
for c in cards:
    p=os.path.join(REPO,c["path"])
    raw=open(p,encoding="utf-8").read()
    body=raw[raw.index("<body>")+6: raw.index("</body>")]
    body=embed_assets(body)
    body=delink_sp(body)
    sid=slug(c["name"])
    sections.append(f'<section class="ds-section" id="{sid}" data-group="{c["group"]}">\n{body}\n</section>')

# ---- TOC ----
toc_html=['<nav class="toc"><h2 class="toc-h">Contents</h2>']
for g,items in groups.items():
    toc_html.append(f'<div class="toc-g"><div class="toc-gl">{g}</div><ul>')
    for c in items:
        toc_html.append(f'<li><a href="#{slug(c["name"])}">{c["name"]}</a><span class="toc-sub">{c.get("subtitle","")}</span></li>')
    toc_html.append("</ul></div>")
toc_html.append("</nav>")
toc_html="\n".join(toc_html)

logo_white=datauri(os.path.join(REPO,"assets/logo-white.png"))

# ---- doc shell CSS ----
shell_css=f"""
:root{{color-scheme:light;}}
body{{background:#eef2f6;margin:0;color:var(--navy);font-family:'Poppins',Arial,sans-serif;}}
.doc{{max-width:1000px;margin:0 auto;padding:0 0 60px;}}
.cover{{background:var(--navy);color:#fff;padding:72px 60px 64px;}}
.cover img.mark{{width:210px;height:auto;display:block;margin-bottom:40px;}}
.cover h1{{font-weight:500;font-size:44px;line-height:1.1;margin:0 0 10px;color:#fff;}}
.cover .sub{{font-size:18px;color:#B4D8FF;font-weight:400;margin:0 0 28px;}}
.cover .meta{{font-family:var(--mono);font-size:12.5px;letter-spacing:.13em;text-transform:uppercase;color:#8Fb7d8;}}
.intro{{background:#fff;padding:34px 60px;border-bottom:1px solid var(--lgray);}}
.intro h2{{font-weight:500;font-size:20px;margin:0 0 10px;}}
.intro p{{font-size:14.5px;color:#334;max-width:74ch;margin:0 0 10px;}}
.intro .note{{background:#EAF1F8;border-left:3px solid var(--blue);border-radius:0 8px 8px 0;padding:14px 18px;font-size:13.5px;color:#20364a;margin-top:14px;}}
.toc{{background:#fff;padding:30px 60px 40px;border-bottom:1px solid var(--lgray);}}
.toc-h{{font-weight:500;font-size:20px;margin:0 0 18px;}}
.toc-g{{margin-bottom:18px;}}
.toc-gl{{font-family:var(--mono);font-size:11.5px;letter-spacing:.13em;text-transform:uppercase;color:var(--blue);margin-bottom:7px;}}
.toc ul{{list-style:none;margin:0;padding:0;columns:1;}}
.toc li{{padding:3px 0;font-size:14px;border-bottom:1px solid #eef1f4;}}
.toc li a{{color:var(--navy);text-decoration:none;font-weight:500;}}
.toc li a:hover{{color:var(--blue);}}
.toc-sub{{display:block;font-size:12px;color:var(--dgray);font-weight:400;}}
.ds-section{{background:#fff;margin:0;border-bottom:14px solid #eef2f6;}}
.ds-section .wrap{{max-width:none;padding:34px 60px 46px;}}
@media print{{
  body{{background:#fff;}}
  .doc{{max-width:none;}}
  .cover{{padding:90px 70px;}}
  .toc,.intro{{padding-left:70px;padding-right:70px;}}
  .ds-section{{border-bottom:none;page-break-before:always;}}
  .ds-section .wrap{{padding:40px 70px;}}
  a{{color:inherit;text-decoration:none;}}
}}
"""

cover=f"""
<div class="cover">
  <img class="mark" src="{logo_white}" alt="Rhapsody">
  <h1>Brand &amp; Design Guideline</h1>
  <p class="sub">Visual quick reference for partners, vendors &amp; contractors</p>
  <p class="meta">Rhapsody &middot; {DATE} &middot; For approved external use</p>
</div>
"""

intro=f"""
<div class="intro">
  <h2>How to use this guide</h2>
  <p>This is Rhapsody's visual system: logo, color, type, graphic devices (the dots and light glows), photography, buttons, and the common layout patterns — with the rules and correct examples for each. Work from these pages when producing anything that carries the Rhapsody brand.</p>
  <p>Every example here is live HTML rendered from the real design tokens, so colors, type, and spacing are exact. Use the Contents below to jump to a section.</p>
  <div class="note"><strong>Master art is included with this package.</strong> The approved logos, monograms, big-dot and scattered-dot device files are provided as separate SVG/PNG files in the accompanying <code>rhapsody-brand-assets</code> folder — use those masters as-is (never rebuild or restyle them). Anything not in the asset folder is available on request from your Rhapsody contact.</div>
</div>
"""

html=f"""<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Rhapsody Brand &amp; Design Guideline</title>
<style>
{fonts_css}
{tokens}
{shell_css}
</style>
</head><body>
<div class="doc">
{cover}
{intro}
{toc_html}
{''.join(sections)}
</div>
</body></html>"""

os.makedirs(f"{REPO}/deliverables/brand-guideline", exist_ok=True)
outp=f"{REPO}/deliverables/brand-guideline/Rhapsody-Brand-Guideline.html"
open(outp,"w",encoding="utf-8").write(html)
print("wrote",outp, f"{len(html.encode())/1024/1024:.2f} MB", "sections:",len(sections))

# also write an artifact-body variant (no html/head/body wrappers; style inline in body)
art=f"""<style>
{fonts_css}
{tokens}
{shell_css}
</style>
<div class="doc">
{cover}
{intro}
{toc_html}
{''.join(sections)}
</div>"""
open(f"{SCR}/artifact-body.html","w",encoding="utf-8").write(art)
print("wrote artifact body", f"{len(art.encode())/1024/1024:.2f} MB")
