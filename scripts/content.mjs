import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import projects from '../src/data/projectsData.js'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const requiredText = (value, name) => {
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`${name} must be non-empty text`)
  return value.trim()
}

export function validateProjects(items) {
  const slugs = new Set()
  for (const item of items) {
    if (!slugPattern.test(item.slug) || slugs.has(item.slug))
      throw new Error(`Invalid or duplicate project slug: ${item.slug}`)
    slugs.add(item.slug)
    for (const key of ['title', 'summary', 'category'])
      requiredText(item[key], `${item.slug}.${key}`)
    for (const key of ['role', 'context', 'problem', 'solution', 'lessons'])
      requiredText(item.caseStudy?.[key], `${item.slug}.${key}`)
    if (
      !Array.isArray(item.caseStudy.highlights) ||
      !item.caseStudy.highlights.length
    )
      throw new Error(`Missing highlights: ${item.slug}`)
    item.caseStudy.highlights.forEach((value) =>
      requiredText(value, `${item.slug}.highlight`),
    )
    if (!Array.isArray(item.technologies) || !item.technologies.length)
      throw new Error(`Missing technologies: ${item.slug}`)
    item.technologies.forEach((value) =>
      requiredText(value, `${item.slug}.technology`),
    )
    if (
      !['maths', 'systems', 'terminal', 'habits', 'distribution'].includes(
        item.visual,
      )
    )
      throw new Error(`Invalid illustration: ${item.slug}`)
    for (const href of Object.values(item.links)) {
      if (new URL(href).protocol !== 'https:')
        throw new Error(`Project links must use HTTPS: ${item.slug}`)
    }
  }
}

export function parsePost(source, filename) {
  // Disable executable frontmatter engines. Authors use YAML only.
  const forbiddenEngine = () => {
    throw new Error('Only YAML frontmatter is supported')
  }
  const { data, content } = matter(source, {
    engines: {
      javascript: forbiddenEngine,
      js: forbiddenEngine,
      json: forbiddenEngine,
    },
  })
  if (data.published !== true) return null
  const slug = data.slug || filename.replace(/\.md$/, '')
  if (!slugPattern.test(slug)) throw new Error(`Invalid article slug: ${slug}`)
  const title = requiredText(data.title, `${filename}.title`)
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date
  if (
    typeof date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(date)) ||
    new Date(date).toISOString().slice(0, 10) !== date
  )
    throw new Error(`Invalid date: ${filename}`)
  const tags = data.tags || []
  if (
    !Array.isArray(tags) ||
    tags.some((tag) => typeof tag !== 'string' || !tag.trim())
  )
    throw new Error(`Invalid tags: ${filename}`)
  const excerpt = requiredText(data.excerpt, `${filename}.excerpt`)
  if (
    data.headerImage &&
    !(data.headerImage.startsWith('/') && !data.headerImage.startsWith('//')) &&
    !data.headerImage.startsWith('https://')
  )
    throw new Error(`Invalid image URL: ${filename}`)
  if (data.headerImage)
    requiredText(data.headerImageAlt, `${filename}.headerImageAlt`)
  // PageIntro supplies the page's h1. Article sections start at h2.
  if (/^#\s/m.test(content))
    throw new Error(`Use h2 (##) or lower in article content: ${filename}`)
  const readTime = `${Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200))} min read`
  // react-markdown escapes raw HTML and filters unsafe URLs; no raw-HTML plugin.
  const html = renderToStaticMarkup(
    React.createElement(Markdown, { remarkPlugins: [remarkGfm] }, content),
  )
  return {
    slug,
    frontmatter: {
      title,
      date,
      tags,
      excerpt,
      readTime,
      ...(data.headerImage
        ? { headerImage: data.headerImage, headerImageAlt: data.headerImageAlt }
        : {}),
    },
    html,
  }
}

export async function loadPosts(directory) {
  const files = await fs.readdir(directory).catch((error) => {
    if (error.code === 'ENOENT') return []
    throw error
  })
  const posts = []
  const slugs = new Set()
  for (const filename of files.filter((file) => file.endsWith('.md')).sort()) {
    const post = parsePost(
      await fs.readFile(path.join(directory, filename), 'utf8'),
      filename,
    )
    if (!post) continue
    if (slugs.has(post.slug))
      throw new Error(`Duplicate article slug: ${post.slug}`)
    slugs.add(post.slug)
    posts.push(post)
  }
  return posts.sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  )
}

export async function generateContent() {
  validateProjects(projects)
  const posts = await loadPosts('src/data/blogs')
  await fs.mkdir('src/generated', { recursive: true })
  await fs.writeFile(
    'src/generated/blogs.json',
    JSON.stringify(posts, null, 2) + '\n',
  )
  console.log(
    `Validated ${projects.length} projects and ${posts.length} published articles.`,
  )
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await generateContent()
