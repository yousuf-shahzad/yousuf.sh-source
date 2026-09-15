import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import projects from '../../src/data/projectsData.js'
const routes = [
  '/',
  '/about',
  '/contact',
  '/projects',
  '/blog',
  ...projects.map((project) => `/projects/${project.slug}`),
]
for (const route of routes) {
  test(`${route} contains readable HTML, one main landmark, and route-specific canonical metadata`, async () => {
    const html = await fs.readFile(
      route === '/' ? 'dist/index.html' : `dist${route}.html`,
      'utf8',
    )
    assert.equal((html.match(/<main\b/g) || []).length, 1)
    assert.equal((html.match(/<h1\b/g) || []).length, 1)
    assert.match(
      html,
      new RegExp(
        `rel="canonical" href="https://yousuf.sh${route === '/' ? '/' : route}"`,
      ),
    )
    assert.doesNotMatch(html, /<a[^>]*>\s*<button/)
    assert.match(html, /Skip to content/)
    assert.doesNotMatch(html, /id="root"><\/div>/)
  })
}
test('missing page is noindex and sitemap includes every project', async () => {
  const html = await fs.readFile('dist/404.html', 'utf8')
  assert.match(html, /content="noindex, follow"/)
  const sitemap = await fs.readFile('dist/sitemap.xml', 'utf8')
  for (const project of projects)
    assert.ok(sitemap.includes(`/projects/${project.slug}`))
})
