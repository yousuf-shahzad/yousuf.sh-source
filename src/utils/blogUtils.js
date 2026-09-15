import blogs from '../generated/blogs.json'
export const getAllBlogs = () => blogs
export const getBlogBySlug = (slug) => blogs.find((blog) => blog.slug === slug)
export const getAllTags = () =>
  [...new Set(blogs.flatMap((blog) => blog.frontmatter.tags))].sort()
export const getRecentBlogs = (limit = 3) => blogs.slice(0, limit)
export const formatDate = (value) =>
  new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(value))
