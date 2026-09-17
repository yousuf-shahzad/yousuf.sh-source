import blogs from '../generated/blogs.json'

const fallbackDate = new Date(0)

const allBlogs = [...blogs]
    .map(({ body, ...frontmatter }) => ({
        slug: frontmatter.slug,
        frontmatter,
        content: body,
        excerpt: frontmatter.excerpt,
    }))
    .sort(
        (a, b) =>
            new Date(b.frontmatter.date || fallbackDate) -
            new Date(a.frontmatter.date || fallbackDate)
    )

export const getAllBlogs = () => allBlogs
export const getBlogBySlug = (slug) =>
    allBlogs.find((blog) => blog.slug === slug)
export const getBlogsByTag = (tag) =>
    allBlogs.filter((blog) => blog.frontmatter.tags?.includes(tag))
export const getAllTags = () =>
    [...new Set(allBlogs.flatMap((blog) => blog.frontmatter.tags || []))].sort()
export const getRecentBlogs = (limit = 3) => allBlogs.slice(0, limit)
export const formatDate = (dateString) => {
    const date = new Date(dateString)
    return Number.isNaN(date.getTime())
        ? 'Undated'
        : date.toLocaleDateString('en-GB', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
}
