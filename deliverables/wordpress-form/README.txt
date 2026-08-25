Rhapsody — Gravity Forms card styling for WordPress
====================================================

Goal: make an embedded Gravity Form (via the "Form code snippet"
block with the [gravityform ...] shortcode) look like the approved
demo-form design — a wider white card with rounded corners, a soft
drop shadow, a Rhapsody Blue accent bar across the top, centered
heading/blurb, and a full-width pill CTA.

WHAT'S IN THIS FOLDER
  gravity-form-card.css   The complete stylesheet to paste into WordPress.

SETUP (about 5 minutes)
1) Tag the block.
   In the page editor, select the OUTER form block (the one whose
   sidebar shows Layout / Form code snippet / Heading / Blurb).
   Open the sidebar > Advanced > "Additional CSS class(es)" and add:

       rh-form-card

   (Everything in the stylesheet is scoped to this class, so no other
   forms on the site are affected.)

2) Add the CSS site-wide.
   Appearance > Customize > Additional CSS  →  paste the full contents
   of gravity-form-card.css and Publish.
   (Block themes: Styles > pencil icon > three-dot menu > Additional CSS.
   If you use a child theme, its style.css works too.)

3) Put First name / Last name side by side.
   That two-column row comes from Gravity Forms itself, not CSS:
   open the form in Gravity Forms (ID 2) and drag the "Last name"
   field up next to "First name" — GF 2.5+ snaps them into equal
   columns. (Older GF: give the fields the ready classes
   gf_left_half / gf_right_half under Appearance > Custom CSS Class.)

4) The helper line under Business email.
   Add it as the field's Description in Gravity Forms (Business email
   field > General > Description). The stylesheet colors it to match
   the mock.

5) The privacy footnote.
   Add an HTML field at the bottom of the form in Gravity Forms with
   the privacy copy and the Privacy Policy link — the stylesheet
   centers and sizes it. (Or place a paragraph block inside the card
   and give it the class rh-form-footnote.)

HEADING-ONLY FIX (SHIPPED AUG 2026)
If you only want to fix the block's header — left-align it, regular
weight, smaller size — without the card treatment, this is the
verified working rule (paste into Additional CSS; no block edits
needed, the [gravityform] shortcode stays untouched):

    *:has(> #form-snippet) h2.heading {
        text-align: left;
        align-self: flex-start;   /* undoes flex centering by the parent */
        margin-left: 0;           /* undoes margin:auto centering */
        margin-right: 0;
        width: 100%;              /* lets text-align take effect */
        font-weight: 400;
        font-size: 32px;
    }

Why the extra lines: the theme centers this h2 as a BOX (flex parent /
auto margins), so text-align alone does nothing. align-self + zeroed
margins + full width cover all three centering mechanisms. #form-snippet
is the HTML anchor on the form container; :has() finds its shared
wrapper and scopes the fix to that one heading.

WIDTH NOTES
- The card is capped at 720px and centered (max-width in the first
  rule — adjust to taste).
- The card can never be wider than the column the block sits in. If
  your "Single column" layout is narrower than 720px, either switch
  the block/section to a wider alignment ("Wide width" if the theme
  offers it) or raise the container's width; the CSS handles the rest.

WHY THE FORM DOESN'T CHANGE IN THE EDITOR
Customizer CSS applies to the live site. The block editor preview may
not show it — check the styling on the front end (View page).

Brand tokens used (web palette): Rhapsody Blue #1A81F4, Navy #0B2C47,
Light Gray #D9DFE6, Dark Gray #7E858C, Poppins.
