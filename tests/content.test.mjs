import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { parsePost, validateProjects, loadPosts } from '../scripts/content.mjs'
import projects from '../src/data/projectsData.js'

const post = (content = 'Text with `inline code`.', extra = '') =>
  `---\npublished: true\ntitle: Test article\ndate: '2026-09-15'\nexcerpt: A test article.\ntags: [React]\n${extra}---\n${content}`
test('real project content has valid links, sections, and unique slugs', () =>
  validateProjects(projects))
test('duplicate project slugs fail the build', () =>
  assert.throws(
    () => validateProjects([...projects, projects[0]]),
    /duplicate/,
  ))
test('unpublished and implicit drafts never enter generated content', () => {
  assert.equal(
    parsePost('---\npublished: false\n---\nsecret draft', 'draft.md'),
    null,
  )
  assert.equal(
    parsePost('---\ntitle: Draft\n---\nsecret draft', 'draft.md'),
    null,
  )
})
test('inline code remains inline; fenced blocks, tables, and lists retain semantics', () => {
  const { html } = parsePost(
    post(
      'Text with `inline code`.\n\n```js\nconst answer = 42\n```\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n- A list item',
    ),
    'test.md',
  )
  assert.match(html, /<p>Text with <code>inline code<\/code>\.<\/p>/)
  assert.match(html, /<pre><code class="language-js">/)
  assert.match(html, /<table>/)
  assert.match(html, /<ul>/)
})
test('raw HTML and unsafe URLs cannot create executable markup', () => {
  const { html } = parsePost(
    post(
      '<script>alert(1)</script>\n\n[click](javascript:alert)\n\n<img src=x onerror=alert(1)>',
    ),
    'test.md',
  )
  assert.doesNotMatch(html, /<script|<img src=x|href="javascript:/)
})
test('invalid dates, images, tags, and extra h1 headings fail validation', () => {
  assert.throws(
    () => parsePost(post().replace('2026-09-15', '2026-02-30'), 'test.md'),
    /date/,
  )
  assert.throws(
    () => parsePost(post('', 'headerImage: /photo.jpg\n'), 'test.md'),
    /headerImageAlt/,
  )
  assert.throws(
    () => parsePost(post().replace('[React]', 'React'), 'test.md'),
    /tags/,
  )
  assert.throws(() => parsePost(post('# Extra title'), 'test.md'), /h2/)
})
test('duplicate published article slugs fail validation', async () => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), 'portfolio-content-'),
  )
  try {
    await fs.writeFile(path.join(directory, 'one.md'), post('', 'slug: same\n'))
    await fs.writeFile(path.join(directory, 'two.md'), post('', 'slug: same\n'))
    await assert.rejects(loadPosts(directory), /Duplicate article slug/)
  } finally {
    // Only remove the two files created by this test, not an arbitrary tree.
    await fs.unlink(path.join(directory, 'one.md'))
    await fs.unlink(path.join(directory, 'two.md'))
    await fs.rmdir(directory)
  }
})
