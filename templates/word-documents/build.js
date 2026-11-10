// Rhapsody technical document templates for Word (.dotx).
// One style system, three starting points: security advisory, release notes, white paper.
// Built from the approved eMudhra customer security advisories (November 2026).
//
//   NODE_PATH=/opt/node-tools/node_modules node build.js [outDir]
//
// Writes a .docx and a .dotx (Word template) for each (see finish).
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const d = require("docx");
const {
  LineRuleType,
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat, PageNumber, TabStopType,
  HorizontalPositionRelativeFrom, VerticalPositionRelativeFrom, HorizontalPositionAlign,
  VerticalPositionAlign, TextWrappingType, ExternalHyperlink, HeadingLevel, VerticalAlign,
  TableLayoutType, PageBreak,
} = d;

const OUT = process.argv[2] || path.join(__dirname, "out");
const ART = path.join(__dirname, "art");
fs.mkdirSync(OUT, { recursive: true });

// ---------- tokens ----------
const C = { navy: "0B2C47", blue: "1A81F4", grayblue: "E8EDF2", lgray: "D9DFE6", dgray: "7E858C", white: "FFFFFF" };
const F = { body: "Poppins", medium: "Poppins Medium", mono: "IBM Plex Mono", monoMed: "IBM Plex Mono Medium" };
const PAGE_W = 12240, MARGIN = 1080, TEXT_W = PAGE_W - 2 * MARGIN; // Letter, 0.75in sides
const pt = (n) => Math.round(n * 2); // half-points

const img = (file) => fs.readFileSync(path.join(ART, file));
const NONE = { style: BorderStyle.NONE, size: 0, color: "auto" };
const NOBORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE, insideHorizontal: NONE, insideVertical: NONE };
const pad = (top, right, bottom, left) => ({ top, right, bottom, left });

// ---------- styles ----------
const styles = {
  default: {
    document: { run: { font: F.body, size: pt(10.5), color: C.navy }, paragraph: { spacing: { after: 160, line: 336 } } },
    title: { run: { font: F.medium, size: pt(40), color: C.navy }, paragraph: { spacing: { before: 0, after: 160, line: 920, lineRule: LineRuleType.AT_LEAST }, keepNext: true } },
    heading1: { run: { font: F.medium, size: pt(22), color: C.navy }, paragraph: { spacing: { before: 40, after: 140, line: 520, lineRule: LineRuleType.AT_LEAST }, keepNext: true, keepLines: true } },
    heading2: { run: { font: F.medium, size: pt(13.5), color: C.navy }, paragraph: { spacing: { before: 320, after: 120, line: 288 }, keepNext: true, keepLines: true } },
    heading3: { run: { font: F.medium, size: pt(12), color: C.navy }, paragraph: { spacing: { before: 280, after: 120, line: 300 }, keepNext: true, keepLines: true } },
    hyperlink: { run: { color: C.blue, underline: { type: "single", color: C.blue } } },
  },
  paragraphStyles: [
    { id: "Subtitle", name: "Subtitle", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: F.body, size: pt(15), color: C.navy }, paragraph: { spacing: { before: 0, after: 360, line: 300 } } },
    { id: "Eyebrow", name: "Eyebrow", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: F.monoMed, size: pt(8.5), color: C.navy, allCaps: true, characterSpacing: 40 }, paragraph: { spacing: { before: 0, after: 360 }, keepNext: true } },
    { id: "DocTitle", name: "Document Title", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: F.medium, size: pt(26), color: C.navy }, paragraph: { spacing: { before: 360, after: 280, line: 620, lineRule: LineRuleType.AT_LEAST }, keepNext: true } },
    { id: "MetaLabel", name: "Meta Label", basedOn: "Normal", next: "MetaValue", quickFormat: true,
      run: { font: F.monoMed, size: pt(7.5), color: C.blue, allCaps: true, characterSpacing: 30 }, paragraph: { spacing: { before: 0, after: 60 } } },
    { id: "MetaValue", name: "Meta Value", basedOn: "Normal", next: "MetaValue", quickFormat: true,
      run: { font: F.body, size: pt(9.5), color: C.navy }, paragraph: { spacing: { before: 0, after: 0, line: 300 } } },
    { id: "SectionLabel", name: "Section Label", basedOn: "Normal", next: "Heading1", quickFormat: true,
      run: { font: F.monoMed, size: pt(8.5), color: C.blue, allCaps: true, characterSpacing: 50 }, paragraph: { spacing: { before: 520, after: 100 }, keepNext: true } },
    { id: "PanelLabel", name: "Panel Label", basedOn: "Normal", next: "PanelText", quickFormat: true,
      run: { font: F.monoMed, size: pt(8), color: C.blue, allCaps: true, characterSpacing: 40 }, paragraph: { spacing: { before: 0, after: 120 }, keepNext: true } },
    { id: "PanelText", name: "Panel Text", basedOn: "Normal", next: "PanelText", quickFormat: true,
      run: { font: F.body, size: pt(10), color: C.navy }, paragraph: { spacing: { before: 0, after: 140, line: 324 } } },
    { id: "Rating", name: "Rating", basedOn: "Normal", next: "PanelText", quickFormat: true,
      run: { font: F.medium, size: pt(28), color: C.blue }, paragraph: { spacing: { before: 0, after: 0, line: 640, lineRule: LineRuleType.AT_LEAST } } },
    { id: "Callout", name: "Callout", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { font: F.body, size: pt(10), color: C.navy },
      paragraph: { spacing: { before: 160, after: 280, line: 324 }, indent: { left: 200, right: 200 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C.grayblue },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 8 },
                  left: { style: BorderStyle.SINGLE, size: 24, color: C.blue, space: 8 },
                  bottom: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 8 },
                  right: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 8 } } } },
    { id: "CodeBlock", name: "Code Block", basedOn: "Normal", next: "CodeBlock", quickFormat: true,
      run: { font: F.mono, size: pt(8), color: C.navy, noProof: true },
      paragraph: { spacing: { before: 0, after: 0, line: 276 }, indent: { left: 180, right: 180 },
        shading: { type: ShadingType.CLEAR, color: "auto", fill: C.grayblue },
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 6 },
                  left: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 8 },
                  bottom: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 6 },
                  right: { style: BorderStyle.SINGLE, size: 6, color: C.grayblue, space: 8 } } } },
    { id: "CodeLabel", name: "Code Label", basedOn: "CodeBlock", next: "CodeBlock", quickFormat: true,
      run: { font: F.mono, size: pt(7.5), color: C.dgray, allCaps: true, characterSpacing: 30 } },
    { id: "TableHeader", name: "Table Header", basedOn: "Normal", next: "TableText", quickFormat: true,
      run: { font: F.medium, size: pt(9), color: C.white }, paragraph: { spacing: { before: 0, after: 0, line: 276 } } },
    { id: "TableText", name: "Table Text", basedOn: "Normal", next: "TableText", quickFormat: true,
      run: { font: F.body, size: pt(9), color: C.navy }, paragraph: { spacing: { before: 0, after: 0, line: 288 } } },
    { id: "ContentsItem", name: "Contents Item", basedOn: "Normal", next: "ContentsItem", quickFormat: true,
      run: { font: F.body, size: pt(10), color: C.navy }, paragraph: { spacing: { before: 0, after: 80 } } },
    { id: "BulletList", name: "Bullet List", basedOn: "Normal", next: "BulletList", quickFormat: true,
      paragraph: { spacing: { after: 80 } } },
    { id: "StepList", name: "Step List", basedOn: "Normal", next: "StepList", quickFormat: true,
      paragraph: { spacing: { after: 140 } } },
    { id: "Rule", name: "Rule", basedOn: "Normal", next: "Normal",
      run: { size: 2 }, paragraph: { spacing: { before: 0, after: 200, line: 240 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.lgray, space: 1 } } } },
    { id: "FooterText", name: "Footer Text", basedOn: "Normal", next: "FooterText",
      run: { font: F.body, size: pt(7.5), color: C.dgray }, paragraph: { spacing: { before: 0, after: 0 } } },
  ],
  characterStyles: [
    { id: "Accent", name: "Accent (Rhapsody Blue)", basedOn: "DefaultParagraphFont", quickFormat: true, run: { color: C.blue } },
    { id: "LeadIn", name: "Lead-in", basedOn: "DefaultParagraphFont", quickFormat: true, run: { font: F.medium } },
    { id: "CodeInline", name: "Code Inline", basedOn: "DefaultParagraphFont", quickFormat: true,
      run: { font: F.mono, size: pt(8.5), noProof: true, shading: { type: ShadingType.CLEAR, color: "auto", fill: C.grayblue } } },
    { id: "Number", name: "Heading Number", basedOn: "DefaultParagraphFont", quickFormat: true,
      run: { font: F.mono, color: C.blue, size: pt(11.5) } },
  ],
};

const numbering = {
  config: [
    { reference: "bullets", levels: [
      { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 240 } }, run: { color: C.navy } } },
      { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 240 } } } } ] },
    { reference: "steps", levels: [
      { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 300 } }, run: { font: F.medium } } } ] },
  ],
};

// ---------- building blocks ----------
// inline text with light markup: **lead-in**, `code`, [[accent]]
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\[\[[^\]]+\]\])/g;
  let i = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > i) out.push(new TextRun({ text: text.slice(i, m.index), ...base }));
    const t = m[0];
    if (t.startsWith("**")) out.push(new TextRun({ text: t.slice(2, -2), style: "LeadIn", ...base }));
    else if (t.startsWith("`")) out.push(new TextRun({ text: " " + t.slice(1, -1) + " ", style: "CodeInline" }));
    else out.push(new TextRun({ text: t.slice(2, -2), style: "Accent", ...base }));
    i = m.index + t.length;
  }
  if (i < text.length) out.push(new TextRun({ text: text.slice(i), ...base }));
  return out;
}
const P = (text, opts = {}) => new Paragraph({ children: runs(text), ...opts });
const styled = (style, text, opts = {}) => new Paragraph({ style, children: runs(text), ...opts });
const bullets = (items) => items.map((t) => new Paragraph({ style: "BulletList", numbering: { reference: "bullets", level: 0 }, children: runs(t) }));
let stepInstance = 0;
const steps = (items) => { stepInstance += 1; return items.map((t) => new Paragraph({ style: "StepList", numbering: { reference: "steps", level: 0, instance: stepInstance }, children: runs(t) })); };
const code = (lines, label) => {
  const out = [];
  if (label) out.push(new Paragraph({ style: "CodeLabel", keepNext: true, children: [new TextRun(label)] }));
  lines.forEach((l, i) => out.push(new Paragraph({ style: "CodeBlock", keepNext: i < lines.length - 1, keepLines: true, children: [new TextRun(l)] })));
  out.push(new Paragraph({ spacing: { before: 0, after: 120 }, children: [] }));
  return out;
};
const callout = (lead, text) => new Paragraph({ style: "Callout", children: [new TextRun({ text: lead + " ", style: "LeadIn" }), ...runs(text)] });

function sectionLabel(text) {
  return new Paragraph({ style: "SectionLabel", children: [
    new ImageRun({ type: "png", data: img("section-line.png"), transformation: { width: 44, height: 8 } }),
    new TextRun({ text: "  " + text }) ] });
}
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: runs(text) });
const h2 = (num, text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [
  ...(num ? [new TextRun({ text: num + " ", style: "Number" })] : []), ...runs(text)] });
const h3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(text) });

function cell(children, { w, fill, borders, margins, valign } = {}) {
  return new TableCell({ width: { size: w, type: WidthType.DXA }, children,
    shading: fill ? { type: ShadingType.CLEAR, color: "auto", fill } : undefined,
    borders: borders || { top: NONE, bottom: NONE, left: NONE, right: NONE },
    margins: margins || pad(110, 160, 110, 160), verticalAlign: valign || VerticalAlign.TOP });
}

// Data table: navy header, alternating gray-blue rows, hairline under the last row
function dataTable(cols, header, rows) {
  const W = cols.reduce((a, b) => a + b, 0);
  const hair = { style: BorderStyle.SINGLE, size: 6, color: C.lgray };
  const head = new TableRow({ tableHeader: true, cantSplit: true, children: header.map((h, i) =>
    cell([new Paragraph({ style: "TableHeader", children: runs(h) })], { w: cols[i], fill: C.navy })) });
  const body = rows.map((r, ri) => new TableRow({ cantSplit: true, children: r.map((t, i) =>
    cell([new Paragraph({ style: "TableText", children: runs(t) })], { w: cols[i], fill: ri % 2 ? C.grayblue : C.white,
      borders: { top: NONE, left: NONE, right: NONE, bottom: ri === rows.length - 1 ? hair : NONE } })) }));
  return [new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, borders: NOBORDERS, rows: [head, ...body] }),
    new Paragraph({ spacing: { before: 0, after: 200 }, children: [] })];
}

// Key-value table: no header, hairline rules, Medium left column
function keyValueTable(rows, cols = [3000, TEXT_W - 3000]) {
  const hair = { style: BorderStyle.SINGLE, size: 6, color: C.lgray };
  return [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: cols, layout: TableLayoutType.FIXED, borders: NOBORDERS,
    rows: rows.map(([k, v]) => new TableRow({ cantSplit: true, children: [
      cell([new Paragraph({ style: "TableText", children: [new TextRun({ text: k, style: "LeadIn", size: pt(10) })] })], { w: cols[0], borders: { top: hair, bottom: hair, left: NONE, right: NONE }, margins: pad(130, 160, 130, 0) }),
      cell([new Paragraph({ style: "TableText", children: runs(v, { size: pt(10) }) })], { w: cols[1], borders: { top: hair, bottom: hair, left: NONE, right: NONE }, margins: pad(130, 0, 130, 160) }) ] })) }),
    new Paragraph({ spacing: { before: 0, after: 200 }, children: [] })];
}

// Shaded panel with a top rule (blue for an assessment or key figure, navy for a warning)
function panel(label, paras, { rule = C.blue, big } = {}) {
  const top = { style: BorderStyle.SINGLE, size: 18, color: rule };
  const body = paras.map((t) => new Paragraph({ style: "PanelText", children: runs(t) }));
  let row;
  if (big) {
    const L = 2300, R = TEXT_W - L;
    row = new TableRow({ cantSplit: true, children: [
      cell([new Paragraph({ style: "PanelLabel", children: [new TextRun({ text: label, color: C.navy })] }), new Paragraph({ style: "Rating", children: [new TextRun(big)] })],
        { w: L, fill: C.grayblue, borders: { top, bottom: NONE, left: NONE, right: NONE }, margins: pad(300, 120, 260, 300) }),
      cell(body, { w: R, fill: C.grayblue, borders: { top, bottom: NONE, left: NONE, right: NONE }, margins: pad(300, 300, 160, 120) }) ] });
    return [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [L, R], layout: TableLayoutType.FIXED, borders: NOBORDERS, rows: [row] }),
      new Paragraph({ spacing: { before: 0, after: 200 }, children: [] })];
  }
  row = new TableRow({ cantSplit: true, children: [cell([new Paragraph({ style: "PanelLabel", children: [new TextRun({ text: label, color: C.navy })] }), ...body],
    { w: TEXT_W, fill: C.grayblue, borders: { top, bottom: NONE, left: NONE, right: NONE }, margins: pad(300, 300, 160, 300) })] });
  return [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [TEXT_W], layout: TableLayoutType.FIXED, borders: NOBORDERS, rows: [row] }),
    new Paragraph({ spacing: { before: 0, after: 200 }, children: [] })];
}

// Two cards side by side (e.g. Rhapsody Cloud customers / customer-hosted customers)
function twoUp(a, b) {
  const gap = 240, w = (TEXT_W - gap) / 2;
  const line = { style: BorderStyle.SINGLE, size: 6, color: C.lgray };
  const box = { top: line, bottom: line, left: line, right: line };
  const card = ([label, text]) => cell([new Paragraph({ style: "PanelLabel", children: [new TextRun(label)] }), new Paragraph({ style: "PanelText", children: runs(text) })],
    { w, borders: box, margins: pad(260, 260, 140, 260) });
  return [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [w, gap, w], layout: TableLayoutType.FIXED, borders: NOBORDERS,
    rows: [new TableRow({ cantSplit: true, children: [card(a), cell([new Paragraph("")], { w: gap, margins: pad(0, 0, 0, 0) }), card(b)] })] }),
    new Paragraph({ spacing: { before: 0, after: 200 }, children: [] })];
}

// Contents box: shaded, two columns, blue mono numbers
function contents(items) {
  const half = Math.ceil(items.length / 2), L = items.slice(0, half), R = items.slice(half);
  const w = TEXT_W / 2;
  const entry = ([n, t]) => new Paragraph({ style: "ContentsItem", children: [new TextRun({ text: n, font: F.mono, color: C.blue }), new TextRun(" " + t)] });
  const colCell = (list, first) => cell(list.map(entry), { w, fill: C.grayblue, margins: pad(0, first ? 120 : 300, 220, first ? 300 : 120) });
  return [new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [w, w], layout: TableLayoutType.FIXED, borders: NOBORDERS, rows: [
    new TableRow({ children: [cell([new Paragraph({ style: "PanelLabel", children: [new TextRun("Contents")] })], { w, fill: C.grayblue, margins: pad(280, 120, 60, 300) }),
                             cell([new Paragraph("")], { w, fill: C.grayblue, margins: pad(280, 300, 60, 120) })] }),
    new TableRow({ children: [colCell(L, true), colCell(R, false)] }) ] }),
    new Paragraph({ spacing: { before: 0, after: 120 }, children: [] })];
}

const link = (text, url) => new ExternalHyperlink({ link: url, children: [new TextRun({ text, style: "Hyperlink" })] });
const refs = (items) => items.map(([label, url]) => new Paragraph({ style: "BulletList", numbering: { reference: "bullets", level: 0 },
  children: [new TextRun(label + ": "), link(url, url)] }));

// ---------- cover, header, footer ----------
function cover(doc) {
  const metaW = TEXT_W / 4;
  const meta = new Table({ width: { size: TEXT_W, type: WidthType.DXA }, columnWidths: [metaW, metaW, metaW, metaW], layout: TableLayoutType.FIXED, borders: NOBORDERS,
    rows: [new TableRow({ children: doc.meta.map(([k, v]) => cell([new Paragraph({ style: "MetaLabel", children: [new TextRun(k)] }),
      ...v.split("\n").map((line) => new Paragraph({ style: "MetaValue", children: [new TextRun(line)] }))], { w: metaW, margins: pad(0, 120, 0, 0) })) })] });
  return [
    new Paragraph({ style: "Eyebrow", spacing: { before: 7000, after: 360 }, children: [new TextRun(doc.eyebrow)] }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: runs(doc.title) }),
    new Paragraph({ style: "Subtitle", children: runs(doc.subtitle) }),
    new Paragraph({ style: "Rule", children: [] }),
    meta,
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function headers(doc) {
  const firstHeader = new Header({ children: [
    new Paragraph({ spacing: { after: 0 }, children: [
      new ImageRun({ type: "png", data: img("logo-primary.png"), transformation: { width: 188, height: 19 } }),
      new ImageRun({ type: "png", data: img("cover-dots.png"), transformation: { width: 336, height: 288 },
        floating: { horizontalPosition: { relative: HorizontalPositionRelativeFrom.PAGE, align: HorizontalPositionAlign.RIGHT },
          verticalPosition: { relative: VerticalPositionRelativeFrom.PAGE, align: VerticalPositionAlign.TOP },
          wrap: { type: TextWrappingType.NONE }, behindDocument: true, allowOverlap: true } }) ] }) ] });
  const header = new Header({ children: [
    new Paragraph({ tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }], spacing: { after: 0 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.lgray, space: 12 } },
      children: [
        new ImageRun({ type: "png", data: img("logo-primary.png"), transformation: { width: 132, height: 14 } }),
        new TextRun({ text: "\t" + doc.headerLabel, font: F.mono, size: pt(7.5), color: C.dgray, allCaps: true, characterSpacing: 40 }) ] }) ] });
  const footer = new Footer({ children: [
    new Paragraph({ style: "FooterText", tabStops: [{ type: TabStopType.RIGHT, position: TEXT_W }], children: [
      new TextRun(doc.footerLabel),
      new TextRun({ children: ["\t", PageNumber.CURRENT], font: F.mono, size: pt(7.5), color: C.dgray }) ] }) ] });
  return { headers: { first: firstHeader, default: header }, footers: { first: new Footer({ children: [new Paragraph("")] }), default: footer } };
}

function build(doc) {
  stepInstance = 0;
  const { headers: hd, footers: ft } = headers(doc);
  const body = [
    ...cover(doc),
    new Paragraph({ style: "DocTitle", children: runs(doc.title) }),
    ...contents(doc.contents),
    ...doc.body(),
  ];
  return new Document({
    creator: "Rhapsody", title: doc.docTitle, description: doc.description,
    styles, numbering,
    sections: [{
      properties: { titlePage: true, page: { size: { width: PAGE_W, height: 15840 },
        margin: { top: 1500, bottom: 1300, left: MARGIN, right: MARGIN, header: 760, footer: 620 } } },
      headers: hd, footers: ft, children: body,
    }],
  });
}

// ---------- the three templates ----------
const guide = (s) => `[${s}]`;

const advisory = {
  file: "Rhapsody-Security-Advisory-Template",
  docTitle: "Rhapsody customer security advisory", description: "Rhapsody customer security advisory template",
  eyebrow: "Customer security advisory",
  title: "[Issue name] [[[highlight phrase]]]",
  subtitle: "[Product] customer security advisory",
  meta: [["Prepared by", "Rhapsody Security\nand Engineering"], ["Date", "[Month D, YYYY]"], ["Audience", "Customer use"], ["Version", "1.0"]],
  headerLabel: "Customer security advisory · V1.0",
  footerLabel: "[Product] customer security advisory · [Issue name] · [Month D, YYYY] · Version 1.0",
  contents: [["01", "Summary"], ["02", "Likelihood of exploitation"], ["03", "Is your deployment affected?"], ["04", "What Rhapsody is doing"], ["05", "What you can do now"], ["06", "FAQ"], ["07", "References"], ["A", "Appendix title"]],
  body: () => [
    callout("Important:", "This advisory will be updated as Rhapsody investigates further. It is current as of [Month D, YYYY]."),
    sectionLabel("Section 01"), h1("Summary"),
    P(guide("What happened, in two or three sentences: who disclosed it, when, and what it lets an attacker do. Name the CVE where there is one, for example `CVE-YYYY-NNNNN`.")),
    P(guide("How it affects this product, and why the usual operating system or browser updates do or don't cover it.")),
    P("**Affected versions:** " + guide("List the affected versions, and the release that fixes the issue.")),
    ...panel("Likelihood", ["**Rhapsody assessment:** the likelihood of exploitation against your [product] deployment is **[low]**. " + guide("One or two sentences on why."),
      "Even so, Rhapsody recommends " + guide("the action, how long it takes, and what it closes.")], { big: "Low" }),
    ...twoUp(["Rhapsody Cloud customers", "Rhapsody is applying the fix to all Rhapsody-hosted environments. No action is required from you."],
             ["Customer-hosted customers", "Your organization manages [component]. Follow the steps in section 5."]),
    h3(guide("Optional: one key point readers must not miss, as a subhead")), P(guide("Supporting paragraph.")),
    sectionLabel("Section 02"), h1("Likelihood of exploitation"),
    P("Rhapsody rates the likelihood of exploitation as **[low]**. For an attack to succeed against your deployment, all of the following must be true at the same time:"),
    ...steps(["**[First condition.]** " + guide("What it means and who is not exposed."), "**[Second condition]** " + guide("explanation."), "**[Third condition]** " + guide("explanation.")]),
    P("Regardless of the likelihood, Rhapsody recommends applying the fix on every server."),
    sectionLabel("Section 03"), h1("Is your deployment affected?"),
    P(guide("Which connections or components are in scope, in one paragraph.")),
    h2("3.1", "[Product] connections"),
    ...dataTable([2900, 2900, TEXT_W - 5800], ["Connection", "Trust store used", "Exposure"], [
      ["**[Connection]** (detail)", "[What it uses]", "**[Low.]** [When it is exposed]"],
      ["**[Connection]**", "`[setting.name]` or `[setting.name]`", "**[Potentially affected]** [where]"],
      ["**[Connection]**", "[What it uses]", "**[Affected only if]** [condition]"] ]),
    h2("3.2", "Not affected"),
    ...bullets([guide("Connection or use that is not affected, with the reason"), guide("Another"), guide("Another")]),
    h2("3.3", "Affected versions"),
    ...dataTable([2600, 2200, TEXT_W - 4800], ["Version", "Java version", "File"], [["v[x].x", "[Java 17]", "`<java home>/lib/security/[file]`"], ["v[x].x", "[Java 21]", "`<java home>/lib/security/[file]`"]]),
    sectionLabel("Section 04"), h1("What Rhapsody is doing"),
    ...bullets([guide("Action Rhapsody is taking for hosted customers"), guide("Procedure being published for customer-hosted sites"), guide("Monitoring, and when this advisory will be revised")]),
    sectionLabel("Section 05"), h1("What you can do now"),
    h3(guide("One sentence: what fixes the issue")),
    ...keyValueTable([["Rhapsody Cloud customers", "No action is needed. Rhapsody applies the update to hosted environments."], ["Customer-hosted customers", guide("What to do and when")], ["All customers", guide("Anything beyond this product")]]),
    P("**How the fix works.** " + guide("Plain-language explanation.")),
    h2("5.1", "Install and configure the update"),
    ...steps(["**Back up [file].** " + guide("Where it is, for each platform."), "**Check [thing].** " + guide("What to run and what to expect:"), "**Restart [product].** " + guide("Why the restart matters.")]),
    ...code(["net stop <service-name>", "net start <service-name>"], "Windows"),
    ...code(["sudo systemctl stop <service-name>", "sudo systemctl start <service-name>"], "Linux"),
    callout("Caution:", guide("A side effect to watch for, and where to find help (see the FAQ).")),
    ...panel("What not to do", ["**Do not [unsafe workaround].** " + guide("Why it is unsafe."), guide("The supported fix, in one sentence.")], { rule: C.navy }),
    sectionLabel("Section 06"), h1("FAQ"),
    h2("6.1", "[Question in sentence case?]"), P(guide("Answer.")),
    h2("6.2", "[Question?]"), P(guide("Answer.")),
    sectionLabel("Section 07"), h1("References"),
    ...refs([["[Source and title]", "https://example.com/advisory"], ["[CVE record]", "https://www.cve.org/"]]),
    sectionLabel("Appendix A"), h1("[Appendix title]"),
    P(guide("What the appendix holds and how to use it.")),
    ...code(["# [comment]", "[value]"]),
  ],
};

const releaseNotes = {
  file: "Rhapsody-Release-Notes-Template",
  docTitle: "Rhapsody release notes", description: "Rhapsody release notes template",
  eyebrow: "Release notes",
  title: "[Product] [[[version]]]",
  subtitle: "[One line on what this release delivers]",
  meta: [["Product", "[Product name]"], ["Release", "[Version and build]"], ["Date", "[Month D, YYYY]"], ["Audience", "Customer use"]],
  headerLabel: "Release notes · [Product] [version]",
  footerLabel: "[Product] [version] release notes · [Month D, YYYY]",
  contents: [["01", "Highlights"], ["02", "New features"], ["03", "Improvements"], ["04", "Fixed issues"], ["05", "Known issues"], ["06", "Upgrade notes"], ["07", "Compatibility"], ["08", "References"]],
  body: () => [
    callout("Before you upgrade:", guide("The one thing every customer must know, such as a required prerequisite or a changed default.")),
    sectionLabel("Section 01"), h1("Highlights"),
    P(guide("Two or three sentences on what this release means for customers.")),
    ...bullets([guide("Headline change, written as an outcome"), guide("Headline change"), guide("Headline change")]),
    ...twoUp(["Rhapsody Cloud customers", guide("When the release reaches hosted environments, and whether any action is needed")],
             ["Customer-hosted customers", guide("Where to download it, and the upgrade path (section 6)")]),
    sectionLabel("Section 02"), h1("New features"),
    h2("2.1", "[Feature name]"), P(guide("What it does and who it helps. Name settings in code style, such as `setting.name`.")),
    h2("2.2", "[Feature name]"), P(guide("What it does and who it helps.")),
    sectionLabel("Section 03"), h1("Improvements"),
    ...dataTable([2600, TEXT_W - 2600], ["Area", "Change"], [["[Area]", guide("What changed and the benefit")], ["[Area]", guide("What changed and the benefit")], ["[Area]", guide("What changed and the benefit")]]),
    sectionLabel("Section 04"), h1("Fixed issues"),
    ...dataTable([1700, TEXT_W - 1700], ["ID", "Description"], [["[ID]", guide("Symptom, then what was fixed")], ["[ID]", guide("Symptom, then what was fixed")]]),
    sectionLabel("Section 05"), h1("Known issues"),
    ...dataTable([1700, 4000, TEXT_W - 5700], ["ID", "Issue", "Workaround"], [["[ID]", guide("Symptom"), guide("Workaround, or \"None\"")]]),
    sectionLabel("Section 06"), h1("Upgrade notes"),
    ...steps(["**Back up [what].** " + guide("Where it is."), "**Install the release.** " + guide("How, per platform:"), "**Restart [product]** and confirm " + guide("what to check.")]),
    ...code(["[command]"], "Windows"), ...code(["[command]"], "Linux"),
    ...panel("Changed defaults", [guide("Any default that changes behavior after the upgrade, and how to keep the old behavior")], { rule: C.navy }),
    sectionLabel("Section 07"), h1("Compatibility"),
    ...dataTable([3400, TEXT_W - 3400], ["Component", "Supported versions"], [["[Operating system]", "[Versions]"], ["[Java runtime]", "[Versions]"], ["[Database]", "[Versions]"]]),
    sectionLabel("Section 08"), h1("References"),
    ...refs([["[Documentation]", "https://example.com/docs"], ["[Download]", "https://example.com/download"]]),
  ],
};

const whitePaper = {
  file: "Rhapsody-White-Paper-Template",
  docTitle: "Rhapsody white paper", description: "Rhapsody white paper template",
  eyebrow: "White paper",
  title: "[Title in sentence case] [[[highlight phrase]]]",
  subtitle: "[A one-line promise of what the reader will learn]",
  meta: [["Prepared by", "[Team or author]"], ["Date", "[Month D, YYYY]"], ["Audience", "[Who it is for]"], ["Version", "1.0"]],
  headerLabel: "White paper · [Short title]",
  footerLabel: "[White paper title] · [Month D, YYYY]",
  contents: [["01", "Executive summary"], ["02", "The challenge"], ["03", "The approach"], ["04", "What it delivers"], ["05", "Getting started"], ["06", "References"]],
  body: () => [
    sectionLabel("Section 01"), h1("Executive summary"),
    P(guide("The argument in three to five sentences: the problem, why it matters now, and what this paper recommends.")),
    ...panel("Key figure", [guide("What the figure means, its source, and the date of the data. Use verified figures only.")], { big: "[00%]" }),
    sectionLabel("Section 02"), h1("The challenge"),
    P(guide("Describe the problem from the reader's side. Plain language; no em dashes.")),
    h2("2.1", "[Aspect of the problem]"), P(guide("Supporting detail.")),
    h2("2.2", "[Aspect of the problem]"), P(guide("Supporting detail.")),
    sectionLabel("Section 03"), h1("The approach"),
    P(guide("How the problem is solved, before naming the product. Name products with their trademark on first mention, such as Rhapsody Axon™.")),
    ...dataTable([3000, TEXT_W - 3000], ["Capability", "What it does"], [["[Capability]", guide("Outcome for the reader")], ["[Capability]", guide("Outcome for the reader")], ["[Capability]", guide("Outcome for the reader")]]),
    callout("Note:", guide("A clarification or definition the reader needs.")),
    sectionLabel("Section 04"), h1("What it delivers"),
    ...twoUp(["[Audience one]", guide("Benefit for this audience")], ["[Audience two]", guide("Benefit for this audience")]),
    ...bullets([guide("Benefit, written as an outcome"), guide("Benefit"), guide("Benefit")]),
    sectionLabel("Section 05"), h1("Getting started"),
    ...steps(["**[First step.]** " + guide("What to do."), "**[Second step.]** " + guide("What to do."), "**[Third step.]** " + guide("What to do.")]),
    ...keyValueTable([["Talk to us", guide("Contact route or URL")], ["Learn more", guide("Related resource")]]),
    sectionLabel("Section 06"), h1("References"),
    ...refs([["[Source and title]", "https://example.com/source"], ["[Source and title]", "https://example.com/source"]]),
  ],
};

// Post-process the package: put paragraph border children in schema order (docx-js writes
// top, bottom, left, right), then write the .docx and a .dotx (template content type).
const BDR_ORDER = ["top", "left", "bottom", "right", "between", "bar"];
function fixBorders(xml) {
  return xml.replace(/<w:pBdr>([\s\S]*?)<\/w:pBdr>/g, (m, inner) => {
    const parts = inner.match(/<w:(\w+)\b[^>]*\/>/g) || [];
    parts.sort((a, b) => BDR_ORDER.indexOf(a.match(/<w:(\w+)/)[1]) - BDR_ORDER.indexOf(b.match(/<w:(\w+)/)[1]));
    return "<w:pBdr>" + parts.join("") + "</w:pBdr>";
  });
}
function finish(buf, docxPath, dotxPath) {
  const tmp = fs.mkdtempSync(path.join(OUT, ".x-"));
  const raw = path.join(tmp, "raw.docx"); fs.writeFileSync(raw, buf);
  const dir = path.join(tmp, "pkg"); execFileSync("unzip", ["-q", raw, "-d", dir]);
  for (const f of ["word/styles.xml", "word/document.xml", "word/header1.xml", "word/header2.xml", "word/footer1.xml", "word/footer2.xml"]) {
    const fp = path.join(dir, f); if (fs.existsSync(fp)) fs.writeFileSync(fp, fixBorders(fs.readFileSync(fp, "utf8")));
  }
  const zipTo = (out) => { if (fs.existsSync(out)) fs.unlinkSync(out); execFileSync("zip", ["-qXrD", path.resolve(out), "."], { cwd: dir }); };
  zipTo(docxPath);
  const ct = path.join(dir, "[Content_Types].xml");
  fs.writeFileSync(ct, fs.readFileSync(ct, "utf8").replace(
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml"));
  zipTo(dotxPath);
  fs.rmSync(tmp, { recursive: true, force: true });
}

(async () => {
  for (const doc of [advisory, releaseNotes, whitePaper]) {
    const buf = await Packer.toBuffer(build(doc));
    finish(buf, path.join(OUT, doc.file + ".docx"), path.join(OUT, doc.file + ".dotx"));
    console.log("wrote", doc.file);
  }
})();
