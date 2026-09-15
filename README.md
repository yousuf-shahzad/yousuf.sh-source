# yousuf.sh

A personal portfolio built with React and Vite. Pages are rendered to static HTML during the build, then hydrated for navigation and the mobile menu.

## Development

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
```

## Checks and production preview

```sh
npm run lint
npm test
npm run build
npm run test:build
npm run preview
```

To review all pages together, run `npm run showcase` in a second terminal and
open `http://127.0.0.1:4174`. The gallery includes desktop/mobile previews and is
kept outside the production build.

The build validates content, bundles assets, prerenders all public routes and a 404 page, and generates the sitemap. Deploy `dist/`. There is no runtime content server.

## Editing content

- Profile, contact links, and navigation: `src/data/site.js`.
- Projects and featured order: `src/data/projectsData.js`.
- Articles: add Markdown files to `src/data/blogs/`; see `docs/writing-template.md`.
- Article publishing is explicit: only `published: true` files are included. Drafts never enter the client bundle.
- Restart the dev server after changing article files, or run `npm run content:build`. Do not edit `src/generated/` directly.
- Writing navigation and homepage previews appear automatically once an article is published.
- Illustrations are conceptual SVG diagrams, not product screenshots. Replace them with actual project images when suitable assets are available.

## Design system

CSS variables in `src/styles/index.css` define colors, page gutters, and section spacing. Shared components implement page introductions, project previews, tags, links, and contact invitations. Use one h1 per route and h2 or lower in article content.

Navigation uses native links and scrolling. No custom cursor, forced introduction delay, or continuous animation is required to access content. Motion respects the system preference.

## Architecture

- `src/components/SiteRoutes.jsx`: route table and client metadata/focus updates.
- `src/utils/metadata.js`: route metadata, also used during prerendering.
- `scripts/content.mjs`: content validation and safe Markdown rendering at build time.
- `scripts/prerender.mjs`: page HTML and sitemap generation.
- `tests/`: content and generated-page regression checks.

Read `docs/design-refresh.md` for the redesign rationale and verification scope.
