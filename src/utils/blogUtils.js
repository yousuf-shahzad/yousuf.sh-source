import matter from 'gray-matter'
import { Buffer } from 'buffer'

// Ensure Buffer is available globally
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

// Import all markdown files from the blogs directory
const blogModules = import.meta.glob('../data/blogs/*.md', { as: 'raw', eager: true })

// Process all blog posts
export const getAllBlogs = () => {
  const blogs = []
  
  for (const path in blogModules) {
    const markdownContent = blogModules[path]
    const { data: frontmatter, content } = matter(markdownContent)
    
    // Extract slug from filename if not provided in frontmatter
    const filename = path.split('/').pop().replace('.md', '')
    const slug = frontmatter.slug || filename
    
    blogs.push({
      slug,
      frontmatter,
      content,
      path
    })
  }
  
  // Sort blogs by date (newest first)
  return blogs
    .filter(blog => blog.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}

// Get a single blog post by slug
export const getBlogBySlug = (slug) => {
  const blogs = getAllBlogs()
  return blogs.find(blog => blog.slug === slug)
}

// Get blog posts filtered by tag
export const getBlogsByTag = (tag) => {
  const blogs = getAllBlogs()
  return blogs.filter(blog => 
    blog.frontmatter.tags && 
    blog.frontmatter.tags.includes(tag)
  )
}

// Get all unique tags from all blog posts
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

// Get recent blog posts (limit to specified number)
export const getRecentBlogs = (limit = 3) => {
  const blogs = getAllBlogs()
  return blogs.slice(0, limit)
}

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Calculate estimated reading time
export const calculateReadingTime = (content) => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const readingTime = Math.ceil(words / wordsPerMinute)
  return `${readingTime} min read`
}

// Generate excerpt from content if not provided in frontmatter
export const generateExcerpt = (content, maxLength = 150) => {
  // Remove markdown formatting and get plain text
  const plainText = content
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\*{1,2}(.*?)\*{1,2}/g, '$1') // Remove bold/italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()
  
  if (plainText.length <= maxLength) {
    return plainText
  }
  
  return plainText.substring(0, maxLength).trim() + '...'
}