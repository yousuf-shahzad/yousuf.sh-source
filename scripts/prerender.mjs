import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'
import projects from '../src/data/projectsData.js'
import { loadPosts } from './content.mjs'

const serverFile = path.resolve('output/build/server.mjs')
await build({
  entryPoints: ['src/entry-server.jsx'],
  outfile: serverFile,
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  jsx: 'automatic',
})
const { render, getPageMetadata, site } = await import(
  pathToFileURL(serverFile)
)
const posts = await loadPosts('src/data/blogs')
const routes = [
  '/',
  '/projects',
  '/about',
  '/contact',
  '/blog',
  ...projects.map((project) => `/projects/${project.slug}`),
  ...posts.map((post) => `/blog/${post.slug}`),
]
const template = await fs.readFile('dist/index.html', 'utf8')
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        char
      ],
  )
for (const route of [...routes, '/404']) {
  const meta = getPageMetadata(route)
  let html = template
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-route="${escape(route)}">${render(route)}</div>`,
    )
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${escape(meta.canonical)}">`,
    )
  for (const [name, value] of Object.entries({
    description: meta.description,
    'og:title': meta.title,
    'og:description': meta.description,
    'og:url': meta.canonical,
    'og:type': meta.type,
    'twitter:title': meta.title,
    'twitter:description': meta.description,
    'twitter:url': meta.canonical,
    robots: meta.notFound ? 'noindex, follow' : 'index, follow',
  })) {
    html = html.replace(
      new RegExp(`<meta (?:name|property)="${name}"[^>]*>`),
      `<meta ${name.startsWith('og:') ? 'property' : 'name'}="${name}" content="${escape(value)}">`,
    )
  }
  const destination = route === '/' ? 'dist/index.html' : `dist${route}.html`
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: site.url,
    description: site.description,
    sameAs: [site.github, site.linkedin],
  }
  html = html.replace(
    '</head>',
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script></head>`,
  )
  await fs.mkdir(path.dirname(destination), { recursive: true })
  await fs.writeFile(destination, html)
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
  .filter((route) => route !== '/blog' || posts.length)
  .map((route) => `  <url><loc>${site.url}${route}</loc></url>`)
  .join('\n')}\n</urlset>\n`
await fs.writeFile('dist/sitemap.xml', sitemap)
console.log(
  `Prerendered ${routes.length} pages and the 404 page; generated sitemap.`,
)
