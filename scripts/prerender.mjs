import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

const root = process.cwd()
const distDirectory = resolve(root, 'dist')
const siteUrl = 'https://yousuf.sh'
const defaultImage = `${siteUrl}/og-image.png`

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

function absoluteUrl(value) {
    if (!value) return defaultImage
    return value.startsWith('http') ? value : `${siteUrl}${value}`
}

function pageHtml(page, entry) {
    const schema = JSON.stringify(page.structuredData).replace(/</g, '\\u003c')
    const styles = (entry.css || [])
        .map((file) => `        <link rel="stylesheet" href="/${file}" />`)
        .join('\n')
    const image = absoluteUrl(page.image)

    return `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="alternate icon" type="image/png" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" />
        <link rel="canonical" href="${escapeHtml(page.url)}" />
        <title>${escapeHtml(page.title)}</title>
        <meta name="description" content="${escapeHtml(page.description)}" />
        <meta name="author" content="Yousuf Shahzad" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#F4F4F4" />
        <meta name="color-scheme" content="light" />
        <meta property="og:type" content="${page.type}" />
        <meta property="og:site_name" content="Yousuf Shahzad" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:url" content="${escapeHtml(page.url)}" />
        <meta property="og:title" content="${escapeHtml(page.title)}" />
        <meta property="og:description" content="${escapeHtml(page.description)}" />
        <meta property="og:image" content="${escapeHtml(image)}" />
        <meta property="og:image:alt" content="${escapeHtml(page.imageAlt)}" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${escapeHtml(page.title)}" />
        <meta name="twitter:description" content="${escapeHtml(page.description)}" />
        <meta name="twitter:image" content="${escapeHtml(image)}" />
        <script type="application/ld+json">${schema}</script>
${styles}
        <link rel="stylesheet" href="https://unpkg.com/lenis@1.1.18/dist/lenis.css" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="fb18d847-b45d-4811-b2f7-75fcf6622a83"></script>
    </head>
    <body>
        <div id="root"></div>
        <noscript>
            <main>
                <h1>${escapeHtml(page.heading)}</h1>
                <p>${escapeHtml(page.description)}</p>
                <nav aria-label="Primary navigation">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/projects">Projects</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact</a>
                </nav>
            </main>
        </noscript>
        <script type="module" crossorigin src="/${entry.file}"></script>
    </body>
</html>
`
}

function pageSchema(page) {
    return {
        '@context': 'https://schema.org',
        '@type': page.schemaType,
        name: page.title,
        headline: page.heading,
        description: page.description,
        url: page.url,
        image: absoluteUrl(page.image),
        author: { '@id': `${siteUrl}/#person` },
        ...(page.datePublished && { datePublished: page.datePublished }),
        ...(page.dateModified && { dateModified: page.dateModified }),
        ...(page.keywords && { keywords: page.keywords.join(', ') }),
    }
}

function outputPath(route) {
    return join(
        distDirectory,
        ...route.split('/').filter(Boolean),
        'index.html'
    )
}

async function writePage(page, entry) {
    const file = outputPath(page.route)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, pageHtml(page, entry))
}

const basePages = [
    {
        route: '/about',
        title: 'About | Yousuf Shahzad',
        heading: 'About Yousuf Shahzad',
        description:
            'Learn about Yousuf Shahzad, a first-year Computer Science student at UCL, and his technical interests and achievements.',
        type: 'website',
        schemaType: 'ProfilePage',
    },
    {
        route: '/projects',
        title: 'Projects | Yousuf Shahzad',
        heading: 'Software projects by Yousuf Shahzad',
        description:
            'Software projects by Yousuf Shahzad, a Computer Science student at UCL, spanning web development, data, and problem-solving.',
        type: 'website',
        schemaType: 'CollectionPage',
    },
    {
        route: '/blog',
        title: 'Blog | Yousuf Shahzad',
        heading: 'Writing by Yousuf Shahzad',
        description:
            'Notes by Yousuf Shahzad on building software, learning computer science, and solving problems.',
        type: 'website',
        schemaType: 'CollectionPage',
    },
    {
        route: '/contact',
        title: 'Contact | Yousuf Shahzad',
        heading: 'Contact Yousuf Shahzad',
        description:
            'Get in touch with Yousuf Shahzad for collaborations, projects, or a conversation about technology.',
        type: 'website',
        schemaType: 'ContactPage',
    },
].map((page) => ({
    ...page,
    url: `${siteUrl}${page.route}/`,
    image: defaultImage,
    imageAlt: 'Yousuf Shahzad',
}))

const [manifestSource, projectsSource, blogsSource] = await Promise.all([
    readFile(join(distDirectory, '.vite/manifest.json'), 'utf8'),
    readFile(resolve(root, 'src/generated/projects.json'), 'utf8'),
    readFile(resolve(root, 'src/generated/blogs.json'), 'utf8'),
])
const manifest = JSON.parse(manifestSource)
const entry = manifest['index.html']
if (!entry)
    throw new Error(
        'Could not find the Vite application entry in the manifest.'
    )

const projects = JSON.parse(projectsSource)
const blogs = JSON.parse(blogsSource)
const projectPages = projects
    .filter((project) => project.caseStudyStatus === 'published')
    .map((project) => {
        const route = `/projects/${project.slug}`
        const page = {
            route,
            title: `${project.title} | Yousuf Shahzad`,
            heading: project.title,
            description: project.summary,
            url: `${siteUrl}${route}/`,
            image: project.coverImage || defaultImage,
            imageAlt: project.coverImageAlt || project.title,
            type: 'article',
            schemaType: 'CreativeWork',
            dateModified: project.updatedAt,
            keywords: project.technologies,
        }
        return { ...page, structuredData: pageSchema(page) }
    })
const blogPages = blogs
    .filter((blog) => !blog.noIndex)
    .map((blog) => {
        const route = `/blog/${blog.slug}`
        const page = {
            route,
            title: `${blog.frontmatter.title} | Yousuf Shahzad`,
            heading: blog.frontmatter.title,
            description: blog.frontmatter.excerpt,
            url: `${siteUrl}${route}/`,
            image: blog.frontmatter.headerImage || defaultImage,
            imageAlt: blog.frontmatter.title,
            type: 'article',
            schemaType: 'BlogPosting',
            datePublished: blog.frontmatter.date,
            keywords: blog.frontmatter.tags,
        }
        return { ...page, structuredData: pageSchema(page) }
    })

await Promise.all(
    [...basePages, ...projectPages, ...blogPages].map((page) =>
        writePage({ ...page, structuredData: pageSchema(page) }, entry)
    )
)
console.log(
    `Prerendered ${basePages.length + projectPages.length + blogPages.length} public route heads.`
)
