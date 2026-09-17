import { mkdir, readdir, readFile, watch, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import matter from 'gray-matter'
import { format, resolveConfig } from 'prettier'

const root = process.cwd()
const projectsDirectory = resolve(root, 'src/data/projects')
const blogsDirectory = resolve(root, 'src/data/blogs')
const outputDirectory = resolve(root, 'src/generated')
const projectsOutputFile = join(outputDirectory, 'projects.json')
const blogsOutputFile = join(outputDirectory, 'blogs.json')
const sitemapOutputFile = resolve(root, 'public/sitemap.xml')
const siteUrl = 'https://yousuf.sh'
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const validStatuses = new Set(['draft', 'published'])
const requiredPublishedSections = [
    'problem',
    'my-contribution',
    'solution',
    'decisions-and-trade-offs',
    'validation-and-outcomes',
    'what-i-learned',
]

function contentError(file, field, message) {
    return new Error(`${file}: ${field} ${message}`)
}

function validateLink(file, field, value) {
    if (!value) return
    try {
        const url = new URL(value)
        if (!['http:', 'https:'].includes(url.protocol))
            throw new Error('protocol')
    } catch {
        throw contentError(file, field, 'must be an http(s) URL')
    }
}

function validateCoverImage(file, project) {
    const coverFields = [
        'coverImageAlt',
        'coverImageWidth',
        'coverImageHeight',
        'coverImageCaption',
    ]
    if (!project.coverImage) {
        if (coverFields.some((field) => project[field] !== undefined))
            throw contentError(
                file,
                'coverImage',
                'is required when cover image metadata is supplied'
            )
        return
    }
    if (typeof project.coverImage !== 'string')
        throw contentError(file, 'coverImage', 'must be a string')
    if (project.coverImage.startsWith('/')) {
        if (!project.coverImage.startsWith(`/projects/${project.slug}/`))
            throw contentError(
                file,
                'coverImage',
                `must live under /projects/${project.slug}/`
            )
    } else {
        validateLink(file, 'coverImage', project.coverImage)
    }
    if (
        typeof project.coverImageAlt !== 'string' ||
        !project.coverImageAlt.trim()
    )
        throw contentError(file, 'coverImageAlt', 'must be meaningful text')
    for (const field of ['coverImageWidth', 'coverImageHeight'])
        if (!Number.isInteger(project[field]) || project[field] <= 0)
            throw contentError(file, field, 'must be a positive integer')
    if (
        project.coverImageCaption !== undefined &&
        typeof project.coverImageCaption !== 'string'
    )
        throw contentError(file, 'coverImageCaption', 'must be a string')
}

function headingIds(body) {
    return [...body.matchAll(/^##\s+(.+)$/gm)].map(([, heading]) =>
        heading
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
    )
}

function calculateReadingTime(content) {
    const words = content.trim() ? content.trim().split(/\s+/).length : 0
    return `${Math.max(1, Math.ceil(words / 200))} min read`
}

function generateExcerpt(content, maxLength = 150) {
    const text = content
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1')
        .replace(/`(.*?)`/g, '$1')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/\s+/g, ' ')
        .trim()
    return text.length <= maxLength
        ? text
        : `${text.slice(0, maxLength).trim()}…`
}

function validateProject(file, project) {
    for (const field of [
        'slug',
        'title',
        'summary',
        'caseStudyStatus',
        'technologies',
        'links',
        'relatedProjects',
    ]) {
        if (
            project[field] === undefined ||
            project[field] === null ||
            project[field] === ''
        )
            throw contentError(file, field, 'is required')
    }
    if (!slugPattern.test(project.slug))
        throw contentError(file, 'slug', 'must use lowercase kebab-case')
    if (!validStatuses.has(project.caseStudyStatus))
        throw contentError(
            file,
            'caseStudyStatus',
            'must be draft or published'
        )
    if (!Array.isArray(project.technologies) || !project.technologies.length)
        throw contentError(file, 'technologies', 'must be a non-empty array')
    if (!Array.isArray(project.relatedProjects))
        throw contentError(file, 'relatedProjects', 'must be an array')
    validateCoverImage(file, project)
    for (const [type, url] of Object.entries(project.links))
        validateLink(file, `links.${type}`, url)
    if (project.updatedAt && Number.isNaN(Date.parse(project.updatedAt)))
        throw contentError(file, 'updatedAt', 'must be a valid date')
    if (project.caseStudyStatus === 'published') {
        for (const field of ['role', 'updatedAt'])
            if (!project[field])
                throw contentError(
                    file,
                    field,
                    'is required for a published case study'
                )
        const headings = headingIds(project.body)
        for (const section of requiredPublishedSections)
            if (!headings.includes(section))
                throw contentError(
                    file,
                    'body',
                    `is missing the required “${section}” section`
                )
    }
}

function validateBlog(file, blog) {
    for (const field of ['slug', 'title', 'date', 'tags', 'published']) {
        if (
            blog[field] === undefined ||
            blog[field] === null ||
            blog[field] === ''
        )
            throw contentError(file, field, 'is required')
    }
    if (!slugPattern.test(blog.slug))
        throw contentError(file, 'slug', 'must use lowercase kebab-case')
    if (Number.isNaN(Date.parse(blog.date)))
        throw contentError(file, 'date', 'must be a valid date')
    if (!Array.isArray(blog.tags) || !blog.tags.length)
        throw contentError(file, 'tags', 'must be a non-empty array')
    if (blog.tags.some((tag) => typeof tag !== 'string' || !tag.trim()))
        throw contentError(file, 'tags', 'must contain non-empty strings')
    if (typeof blog.published !== 'boolean')
        throw contentError(file, 'published', 'must be true or false')
    if (blog.published && !blog.body)
        throw contentError(file, 'body', 'is required for a published post')
    if (blog.excerpt && typeof blog.excerpt !== 'string')
        throw contentError(file, 'excerpt', 'must be a string')
    if (blog.readTime && typeof blog.readTime !== 'string')
        throw contentError(file, 'readTime', 'must be a string')
    if (blog.noIndex !== undefined && typeof blog.noIndex !== 'boolean')
        throw contentError(file, 'noIndex', 'must be true or false')
}

async function readMarkdownRecords(directory, normalize) {
    let files
    try {
        files = await readdir(directory)
    } catch (error) {
        if (error.code === 'ENOENT') return []
        throw error
    }
    files = files.filter((file) => file.endsWith('.md')).sort()
    const records = []
    for (const filename of files) {
        const source = await readFile(join(directory, filename), 'utf8')
        records.push(normalize(filename, matter(source)))
    }
    return records
}

function validateUniqueSlugs(records, label) {
    const slugs = new Set()
    for (const record of records) {
        if (slugs.has(record.slug))
            throw contentError(record.slug, 'slug', `is duplicated in ${label}`)
        slugs.add(record.slug)
    }
}

async function writeJson(file, data) {
    const prettierOptions = (await resolveConfig(file)) || {}
    await writeFile(
        file,
        await format(JSON.stringify(data), {
            ...prettierOptions,
            parser: 'json',
        })
    )
}

function escapeXml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function lastModified(value) {
    if (!value) return ''
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return ''
    return date.toISOString().slice(0, 10)
}

function sitemapEntry(path, updatedAt) {
    const lastmod = lastModified(updatedAt)
    return [
        '  <url>',
        `    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        '  </url>',
    ].join('\n')
}

function generateSitemap(projects, blogs) {
    const staticRoutes = ['/', '/about/', '/projects/', '/blog/', '/contact/']
    const projectRoutes = projects
        .filter((project) => project.caseStudyStatus === 'published')
        .map((project) => [`/projects/${project.slug}/`, project.updatedAt])
    const blogRoutes = blogs
        .filter((blog) => !blog.noIndex)
        .map((blog) => [`/blog/${blog.slug}/`, blog.date])
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...staticRoutes.map((path) => sitemapEntry(path)),
        ...projectRoutes.map(([path, updatedAt]) =>
            sitemapEntry(path, updatedAt)
        ),
        ...blogRoutes.map(([path, updatedAt]) => sitemapEntry(path, updatedAt)),
        '</urlset>',
        '',
    ].join('\n')
}

async function generateProjects() {
    const projects = await readMarkdownRecords(
        projectsDirectory,
        (filename, { data, content }) => {
            const project = { ...data, body: content.trim() }
            validateProject(`src/data/projects/${filename}`, project)
            return project
        }
    )
    validateUniqueSlugs(projects, 'projects')
    const slugs = new Set(projects.map((project) => project.slug))
    for (const project of projects)
        for (const related of project.relatedProjects) {
            if (!slugs.has(related))
                throw contentError(
                    project.slug,
                    'relatedProjects',
                    `contains unknown slug “${related}”`
                )
            if (related === project.slug)
                throw contentError(
                    project.slug,
                    'relatedProjects',
                    'cannot reference itself'
                )
        }
    return projects.map(({ body, ...metadata }) =>
        metadata.caseStudyStatus === 'published'
            ? { ...metadata, body }
            : metadata
    )
}

async function generateBlogs() {
    const blogs = await readMarkdownRecords(
        blogsDirectory,
        (filename, { data, content }) => {
            const blog = {
                ...data,
                body: content.trim(),
            }
            validateBlog(`src/data/blogs/${filename}`, blog)
            return {
                ...blog,
                excerpt: blog.excerpt || generateExcerpt(blog.body),
                readTime: blog.readTime || calculateReadingTime(blog.body),
            }
        }
    )
    validateUniqueSlugs(blogs, 'blogs')
    return blogs.filter((blog) => blog.published)
}

export async function generateContent() {
    const [projects, blogs] = await Promise.all([
        generateProjects(),
        generateBlogs(),
    ])
    await mkdir(outputDirectory, { recursive: true })
    await Promise.all([
        writeJson(projectsOutputFile, projects),
        writeJson(blogsOutputFile, blogs),
        writeFile(sitemapOutputFile, generateSitemap(projects, blogs)),
    ])
    console.log(
        `Generated ${projects.length} project records and ${blogs.length} published blog posts.`
    )
}

async function watchDirectory(directory) {
    await mkdir(directory, { recursive: true })
    const watcher = watch(directory)
    for await (const event of watcher) {
        if (!event.filename?.endsWith('.md')) continue
        try {
            await generateContent()
        } catch (error) {
            console.error(error.message)
        }
    }
}

if (process.argv.includes('--watch')) {
    await generateContent()
    await Promise.all([
        watchDirectory(projectsDirectory),
        watchDirectory(blogsDirectory),
    ])
} else {
    await generateContent()
}
