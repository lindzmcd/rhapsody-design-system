Axon Connected badge — page exports
===================================

Static reference builds from the reviewed prototype, October 2026.
Hand these to the web team as the source of truth for layout and markup.
Copy lives in the review doc, not here — edit copy there first, then apply.

Files
-----

axon-connected-badge-kit-page.html
    The new badge kit page, whole. Proposed URL:
    rhapsody.health/solutions/axon-connected-badge/
    Sections: breadcrumb, hero, why display it, eligibility, the kit,
    request form, closing band.

broadcast-page-badge-touchpoints.html
    Two of the three touchpoints added to the existing Axon Broadcast page:
    the badge band that sits under the blue Arithmetic section, and the new
    FAQ row. Each block is self-contained and scoped so it drops into the
    live page without disturbing its styles.

hero-playbook-card-badge-in-header.html
    The third touchpoint: the hero Playbook card with the badge in its navy
    header, in place of the "Published" pill. Scoped under .rh-pb.

hero-playbook-card.svg
    The same card as flat vector art, for decks and PDFs. Text is outlined,
    so copy changes mean regenerating the file.

Axon-Connected-Badge-Page-Copy.docx
    All the copy from both pages, as a Word file for review. Exported from
    the review doc, so the doc stays the master: edit there, re-export here.

Before launch
-------------

1. Badges are inlined as SVG data URIs. Point them at hosted files on
   rhapsody.health so Rhapsody can update or retire a badge everywhere.
2. The badge is a plain image, not a link. A vendor's Playbook page is
   visible only to them, so there is nothing public to point it at.
3. The request form has no handler. Point it at the partner team.
4. Fonts load from Google Fonts here. Use the site's own font loading.
5. The page URL above is proposed, not confirmed.
