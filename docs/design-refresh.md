# Portfolio design refresh

## Intent

Preserve the GrandSlang/Mori typography and restrained palette while giving work,
navigation, and contact a clearer hierarchy. This branch includes the previously
uncommitted portfolio improvements in a separate baseline commit.

## Visual walkthrough

1. **Home:** immediate introduction, visible navigation, selected projects before
   the short biography, and an email address at the point of contact.
2. **Work:** concise descriptions, consistent technology lists, and conceptual
   SVG illustrations. All previews lead to case studies.
3. **Case studies:** shared title layout, role/context sidebar, readable problem,
   solution and reflection sections, source/demo links, and a next-project link.
4. **About:** scannable story, education, and a shared toolkit section.
5. **Contact:** prominent email, copy-address feedback, and social links.
6. **Writing:** a useful empty state until content exists. Publishing an article
   automatically exposes writing in the header and on the homepage.
7. **Mobile:** fluid typography, regular page gutters, and a keyboard-operable menu.

Illustrations show project concepts, not product screenshots or measured outcomes.
No new project dates, usage metrics, or experience claims have been invented.

## Implementation

- Shared CSS tokens, layout primitives, project cards, and contact callouts.
- Native scrolling and links; no forced loader, custom cursor, or continuous 3D loop.
- One route metadata source and one main landmark per page.
- Published Markdown validated and rendered during the build; drafts excluded.
- Static HTML for all routes, route-specific sharing metadata, generated sitemap.
- Node regression tests for content validation, safe Markdown, and generated HTML.
- CI runs lint, content tests, build, and generated-page tests.

## Scope limits

Actual project screenshots, independently verified outcomes, and real project
dates remain content follow-ups. Published article metadata ships with the site;
if the collection grows substantially, split article payloads by route. There is
no CMS or backend, and a rebuild is required to publish content.

## Verification

See the pull request for the final check results and preview. Browser review covers
desktop/mobile layout, route navigation, menu focus and Escape handling, contact
copy feedback, and browser console errors. Local preview cannot establish production
HTTP status handling; the deployment should serve `404.html` with a 404 status.
