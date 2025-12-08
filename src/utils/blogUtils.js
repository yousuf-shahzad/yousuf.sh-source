import matter from 'gray-matter'
import { Buffer } from 'buffer'

if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// get markdown
const blogModules = import.meta.glob('../data/blogs/*.md', { as: 'raw', eager: true })

export const getAllBlogs = () => {
  const blogs = []
  
  for (const path in blogModules) {
    const markdownContent = blogModules[path]
    const { data: frontmatter, content } = matter(markdownContent)
    const filename = path.split('/').pop().replace('.md', '')
    const slug = frontmatter.slug || filename
    
    blogs.push({
      slug,
      frontmatter,
      content,
      path
    })
  }
  
  return blogs
    .filter(blog => blog.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}

export const getBlogBySlug = (slug) => {
  const blogs = getAllBlogs()
  return blogs.find(blog => blog.slug === slug)
}

export const getBlogsByTag = (tag) => {
  const blogs = getAllBlogs()
  return blogs.filter(blog => 
    blog.frontmatter.tags && 
    blog.frontmatter.tags.includes(tag)
  )
}

export const getAllTags = () => {
  const blogs = getAllBlogs()
  const tags = new Set()
  
  blogs.forEach(blog => {
    if (blog.frontmatter.tags) {
      blog.frontmatter.tags.forEach(tag => tags.add(tag))
    }
  })
  
  return Array.from(tags).sort()
}

export const getRecentBlogs = (limit = 3) => {
  const blogs = getAllBlogs()
  return blogs.slice(0, limit)
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200 // complete guess
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return `${readingTime} min read`
}

export const generateExcerpt = (content, maxLength = 150) => {
  const plainText = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n/g, ' ')
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).trim() + '...'
}