import { site } from '../data/site'
import projects from '../data/projectsData'
import { getBlogBySlug } from './blogUtils'
const pageMeta = {
  '/': {
    title: 'Yousuf Shahzad — Software & systems',
    description: site.description,
  },
  '/projects': {
    title: 'Work — Yousuf Shahzad',
    description:
      'Selected projects in web development, distributed systems, automation, and data visualization.',
  },
  '/about': { title: 'About — Yousuf Shahzad', description: site.description },
  '/contact': {
    title: 'Contact — Yousuf Shahzad',
    description:
      'Get in touch with Yousuf Shahzad about software, collaboration, and ideas.',
  },
  '/blog': {
    title: 'Writing — Yousuf Shahzad',
    description: 'Notes on software, design, and how systems work.',
  },
}
export function getPageMetadata(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const project = path.startsWith('/projects/')
    ? projects.find((item) => `/projects/${item.slug}` === path)
    : null
  const post = path.startsWith('/blog/') ? getBlogBySlug(path.slice(6)) : null
  const meta = project
    ? {
        title: `${project.title} — Yousuf Shahzad`,
        description: project.summary,
      }
    : post
      ? {
          title: `${post.frontmatter.title} — Yousuf Shahzad`,
          description: post.frontmatter.excerpt,
          type: 'article',
        }
      : pageMeta[path] || {
          title: 'Page not found — Yousuf Shahzad',
          description: 'This page could not be found.',
          notFound: true,
        }
  return {
    ...meta,
    canonical: site.url + (path === '/' ? '/' : path),
    type: meta.type || 'website',
  }
}
