# Rhapsody Website Style Reference

The usage patterns decided during the Solutions section redesign (October 2026, for the 20 Oct
reorganization). This records the web-specific rulings so every future page is built the same way.
It extends — never overrides — the Rhapsody Brand VisID Guide and this design system's cards; where
a rule already lives on a card (teal, dots, buttons), this file points to it and records only the
web application. Source of record for the layouts themselves: the solutions wireframes
(claude.ai/artifact/HscvF34wtrJkxiRfy43GyX).

---

## 1. Page template anatomy

Every solution-level page uses one template, in this order. Section 06 is the flex zone.

| # | Section | Job |
|---|---------|-----|
| 01 | Global nav | 20 Oct nav: Solutions · Markets · Proof · Resources · Company + utility cluster (Community, Contact, Request a demo) |
| 02 | Context bar | Breadcrumb carries hierarchy under the flat-URL rule (see §3) |
| 03 | Hero | Navy ground, two-tone headline, Aurora light device, one primary CTA, trust ticker (see §2) |
| 04 | The challenge | ICP pain through 3 buyer-persona cards before any product mention |
| 05 | Our point of view | The positioning moment: Build + Automate pathways as de-boxed statements (see §6) |
| 06 | Products (flex zone) | Routes to child product pages; adapts to umbrella size |
| 07 | Proof | Stats row, one testimonial, logo quilt (see §8) |
| 08 | CTA band | One ask (Get a demo), specialist conversation as the soft path, corner dot field (see §7) |
| 08b | FAQ | After the CTA so the buying arc stays unbroken (see §10) |
| 09 | Cross-links | Lateral moves to sibling solutions and up to the overview |

The migration/offer page is the exception: offer-page skeleton (hero → objections → step timeline →
offer → proof → CTA), demo CTA swapped for free scoping.

## 2. Hero tier system

Heroes signal where in the site you are.

- **Overview pages** (Infrastructure, Automation): Aurora RIBBON master, taller hero, larger H1,
  portfolio eyebrow **"Agent-ready interoperability."**
- **Solution pages**: plain Aurora wash, location eyebrow naming the pillar and page
  ("Infrastructure · Governance"). The context bar carries hierarchy and bolds the page name, so
  the eyebrow never repeats the page name.
- **Axon AI page**: the animated Rhapsody Axon mark replaces the light device (subtle loop; static
  mark under `prefers-reduced-motion`). The mark appears once per hero — no duplicate lockup chip
  in the copy column. One visual element per layout always holds.
- **Trust ticker**: an auto-scrolling mono strip pinned to the hero's bottom edge; three facts,
  duplicated for a seamless ~32s loop, dot-row accents as separators, static row under
  `prefers-reduced-motion`. Facts are page-relevant, verified claims only.
- Light devices: **Aurora is the only light device** (Plexus and Burst are retired). Never combine
  a light device with a dot device in one layout.

## 3. Navigation, breadcrumbs, URLs

- Flat URLs: `/solutions/[solution]/` and `/solutions/[product]/`, no folders. The menu and
  breadcrumbs carry the hierarchy; product pages are reached from their parents, not the nav.
- Context bar, solution pages: breadcrumb path with the current page bolded and underlined, plus a
  right-aligned sibling strip — **"Also in Infrastructure: Governance · Data Quality."**
- Context bar, overview pages: breadcrumb only, **no sibling strip** (the overview's children are
  the page's own content).
- Never say "pillar" in visitor-facing copy; name the column ("In Infrastructure") or say nothing.

## 4. Clickable affordance rule

Anything clickable has a **border + arrow**; labels and tags have **neither**. Consequences:

- Text links: arrow suffix ("Explore Corepoint →"). Buttons/pills are CTA-only (see §5).
- Descriptive tags (use-case labels, segment chips) are flat gray — never outlined in blue, which
  promises a click.
- Tree/diagram nodes that navigate get the outline + arrow; plain nodes stay flat chips.

## 5. Buttons, color, type

- **Pills are CTAs only.** Primary = Rhapsody Blue fill, white label, on all grounds. The
  teal-filled pill is retired.
- **Teal #23C5BF is immutable** — never darkened or theme-converted for contrast. Teal type sits on
  navy only (6.7:1). On white/gray-blue grounds teal is accent-only: the 16×3px tick before a navy
  mono label, a module accent line, a seam, or a pathway edge. Links stay Rhapsody Blue. (Full
  ruling: Color card "Teal in small applications," corrections log Oct 2026.)
- Headlines: two-tone treatment on navy (white + light blue span). Attribution lines are mono
  caps: `NAME · TITLE` on its own line below the quote.
- **No em dashes in page copy.** Use a period, colon, or comma.
- **Names never break**: multi-word product names (Image Director, EMPI with Autopilot) and
  people's names use non-breaking spaces in mono label rows; lines wrap at separators only.
- Naming: "Rhapsody," never "Rhapsody Health." First mention per page is **Rhapsody Axon™** (full
  name + ™; never "Axon" alone in a mark or first mention). FHIR before HL7 in standards lists.
  Banned on-page: "integration engine," "duplicates," buzzwords (title/meta ruling for
  "integration engine" pending).

## 6. The POV section (Build + Automate)

- The two-pillar statement is set as **de-boxed statements**, not cards: no borders, no arrows
  (per §4 they'd read as navigation), separated by a hairline, each led by a pathway tick.
- **Pathway colors are fixed system-wide: Build = Rhapsody Blue, Automate = teal.** A third-party
  or neutral column (e.g. "the connector approach") gets a **gray** tick — pathway colors belong
  to our two paths. Every path label gets a tick; none renders colorless.
- The canonical framework visual is the **Build + Automate architecture framework** (asset #1),
  built as **responsive HTML native to the page** (ruling Oct 2026, wireframes v115): centered
  in/out chip lanes ("Your systems and partners" / "Out to every destination"), a navy layer panel
  with Govern · Connect · Trust compartments, a "Speaks" standards strip (FHIR first), and the
  Axon + Envoy automation band. The compartments carry the three words only; the solutions tiles
  below do the explaining, so the two sections never duplicate copy. The Build/Automate echo is
  carried by the blue tick on the layer label and the teal tick on the automation band, no explicit
  pathway labels. Primary home on the Infrastructure overview POV, reused on Integration (one
  component, two placements). The Claude Design image master remains the source for non-web uses:
  decks, PDFs, social.
- **Pathway colors appear only in the POV section.** Product/umbrella sections never reuse the
  blue/teal split: the Integration umbrella presents its three solutions (Rhapsody, Corepoint,
  Envoy) as equal cards all in the build treatment, with the chooser carried by kicker labels
  ("build with your developers / configure with your team / managed for your team"), neutral
  you-build / we-build group labels over the cards (navy mono with a hairline, never pathway
  colors), and the showcase toggle. Image Director is a secondary "also need image routing?"
  add-on strip, not a fourth focal point.

## 7. Dots and the CTA band

- CTA band: Rhapsody Blue ground, one ask, soft-path text link, and a **corner-anchored white dot
  field** sitting flush in the bottom-right corner — never a cropped master (cropping hides the
  dense core and reads as random). For formats outside the master family, build to the recipe:
  pitch = long edge ÷ 22, identical dots at 38.9% of pitch, 17–25% fill, one connected mass,
  densest at the anchor, no straight run over 4, uneven contour. Hide the field below ~980px so it
  never collides with text. The wide-band variation (`df-blue-corner-wide`) should join the master
  family.
- **Dot-row accent** (3 small dots, one size): approved compact motif for card edges and ticker
  separators. White-only on blue grounds. Don't combine with a dot field in the same composition.

## 8. Proof and quotes

- Quote treatment: one short line (≤ ~120 chars) set large in Rhapsody Blue with real quotation
  marks; name lockup (name, title, company in blue); customer logo preferred; thin-ring portrait
  in a single brand color where the headshot is approved, logo chip as the fallback.
- Customer-story cards: kicker → quote → context → fact rows → read-the-story link in the copy
  column; portrait/lockup anchored right. Related assets (webinar, article) live on the story's
  own card, one trail per customer.
- Stats are plain-language outcomes, verified against a source, or they don't ship. Analyst
  economic-impact stats carry generic attribution only ("per an independent economic impact
  study") — the firm is never named.
- **Proof chips that name a customer link to that customer's story** (blue text + arrow, per the
  affordance rule); aggregate claims with no story behind them stay static.

## 9. Product media: the showcase pattern

**Frameworks are page content, not pictures.** Concept and architecture diagrams embed as native,
responsive HTML: real text that is crawlable, accessible, and reflows at every width. The framed
screenshot treatment (chrome bar) is reserved for what genuinely is a screen or artifact — product
UI, demo video, an audit record, a sample deliverable — where the frame is honest.

**Product UI is never shown smaller than full content width.** No screenshot/demo grids, no card
insets. The pattern: one full-width media frame with a **segmented toggle** above it (joined
buttons, navy fill on the active segment), where the toggle labels carry the section's message
(e.g. "Build with your developers / Configure with your team / Managed for your team" — switching
views rehearses the chooser). Embedded video/snippets play in place with a quiet text-link row
below ("Watch the full episode →", opens new tab, mono note); never a button, never bounce to
YouTube mid-story.

## 10. FAQ system

Every solution-level page ships a FAQ: 4–7 questions as `details/summary` disclosure rows, placed
**after the CTA band and before cross-links** (reference layer for people, search, and LLMs — the
buying arc stays unbroken). Full Q&A text in the DOM, `FAQPage` JSON-LD structured data, answers
drawn only from verified claims. Question phrasing wins long-tail queries.

## 11. Editorial components

- **Read callout** (editorial next-step): full-section-width Rhapsody Blue strip — book icon in a
  translucent tile, mono kicker ("Read next · from the Rhapsody blog"), title + arrow, white
  dot-row anchoring the right edge; hover slide/tilt/nudge with `prefers-reduced-motion` opt-out.
  Used for blog/resource links that earn a moment; plain text links elsewhere.
- Content stays embedded in the page's story, not appended: no "related posts" lists at page
  bottom; a resource earns placement inside the section it supports.

## 12. SEO working practice

- Each page has **one primary keyword target**; the page's title, meta, H1, subheads, and first
  200 words are written toward it. Alt targets are tracked for comparison but pages are tuned to
  one phrase.
- **No copy changes purely for SEO until the keyword target is confirmed** (the alignment step).
  Suggested H1s are staged "for review, not applied."
- Watch density both ways: aim for ~6+ natural keyword-family mentions; above ~3% density, vary
  phrasing rather than adding mentions.
- Live scoring tooling (panels, bands Poor/Average/Good/Great) lives in the wireframes doc;
  methodology: title/meta/H1/subheads/first-200-words/occurrences/word count/FAQ/internal links.

## 13. Photography

Four placements only, per the photography card (bright, natural-lit, faces-forward; thin-ring
treatment in one brand color): approved customer headshots on named quote cards; the Boost team
photo (people are the product); the Kevin Day CTO pull-quote; the migration team photo.
Photography stays **off** persona cards, heroes (Aurora holds that slot), proof stats, and the
Guardian request path.

## 14. Claims guardrails (web copy)

- Guardian: never imply HL7v2 ordinarily flows through Guardian; say "every governed request";
  no per-MCP-tool enforcement, FHIR IG validation, delegated authority, shadow discovery, or auto
  kill-switch claims until shipped; never imply gateway consolidation is required. (Full table:
  Sept 2026 positioning doc appendix.)
- Country count: **32**. Heritage: "Healthcare only, always · 40+ years" pending final legal/PMM
  confirm. NPS 63 pending external-use approval.
- Built-in vs connector POV: contrast on what the agent knows and who answers for it — never
  disparage MCP itself (we support the standard; Guardian governs MCP traffic).

---

*Maintained alongside the design system. When a web ruling changes, update this file and the
corrections log in the same commit. Last updated: October 2026 (solutions wireframes v115).*
