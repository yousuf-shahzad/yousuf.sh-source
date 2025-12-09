import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { getBlogBySlug, formatDate, getRecentBlogs } from '../utils/blogUtils'
import 'highlight.js/styles/github-dark.css'

const pageVariant = {
    initial: {
        opacity: 0,
        y: '30px',
    },
    in: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9,
            ease: 'easeOut',
        },
    },
    out: {
        opacity: 0,
        scale: 1.05,
        transition: {
            duration: 0.5,
            ease: 'easeIn',
        },
    },
}

const BlogPost = () => {
    const { slug } = useParams()
    const [blog, setBlog] = useState(null)
    const [recentBlogs, setRecentBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        const fetchBlog = () => {
            try {
                const blogPost = getBlogBySlug(slug)
                if (!blogPost) {
                    setError('Blog post not found')
                    return
                }
                
                setBlog(blogPost)
                const recent = getRecentBlogs(4).filter(b => b.slug !== slug).slice(0, 3)
                setRecentBlogs(recent)
            } catch (err) {
                console.error('Error loading blog:', err)
                setError('Failed to load blog post')
            } finally {
                setLoading(false)
            }
        }

        fetchBlog()
    }, [slug])

    if (loading) {
        return (
            <motion.div 
                className="flex-grow flex items-center justify-center"
                variants={pageVariant}
                initial="initial"
                animate="in"
                exit="out"
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-accent mx-auto mb-4"></div>
                    <p className="text-brand-text/60">Loading blog post...</p>
                </div>
            </motion.div>
        )
    }

    if (error || !blog) {
        return (
            <motion.div 
                className="flex-grow flex items-center justify-center"
                variants={pageVariant}
                initial="initial"
                animate="in"
                exit="out"
            >
                <div className="text-center">
                    <div className="text-6xl mb-4 opacity-20">📄</div>
                    <h2 className="text-2xl font-bold text-brand-text mb-2">Blog post not found</h2>
                    <p className="text-brand-text/60 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
                    <Link to="/blog">
                    <button
                        className="px-6 py-3 bg-brand-accent text-brand-bg rounded-lg hover:bg-brand-secondary transition-colors font-medium"
                    >
                        Back to Blog
                    </button>
                    </Link>
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div
            className="relative min-h-screen"
            variants={pageVariant}
            initial="initial"
            animate="in"
            exit="out"
        >
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />
            
            <main className="flex-grow">
            <div className="px-6 md:px-12 lg:px-24 pt-8">
                <Link to="/blog" className="flex items-center text-brand-accent hover:text-brand-secondary transition-colors font-medium mb-8">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Blog
                </Link>
            </div>

            {blog.frontmatter.headerImage && (
                <div className="aspect-[21/9] max-h-96 relative overflow-hidden">
                    <img
                        src={blog.frontmatter.headerImage}
                        alt={blog.frontmatter.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
            )}

            <div className="px-6 md:px-12 lg:px-24 py-12">
                <div className="max-w-4xl mx-auto">
                    <motion.header 
                        className="mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold text-brand-text mb-6 leading-tight title">
                            {blog.frontmatter.title}
                        </h1>
                        
                        <div className="flex flex-wrap items-center gap-4 text-brand-text/60 mb-6">
                            <span>{formatDate(blog.frontmatter.date)}</span>
                            <span>•</span>
                            <span>{blog.frontmatter.readTime}</span>
                            {blog.frontmatter.author && (
                                <>
                                    <span>•</span>
                                    <span>By {blog.frontmatter.author}</span>
                                </>
                            )}
                        </div>

                        {blog.frontmatter.excerpt && (
                            <p className="text-xl text-brand-text/80 leading-relaxed mb-6">
                                {blog.frontmatter.excerpt}
                            </p>
                        )}

                        {blog.frontmatter.tags && (
                            <div className="flex flex-wrap gap-2">
                                {blog.frontmatter.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-brand-accent/10 text-brand-accent text-sm rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </motion.header>

                    <motion.article 
                        className="prose prose-lg max-w-none prose-invert prose-headings:text-brand-text prose-p:text-brand-text/90 prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-text prose-code:text-brand-accent prose-code:bg-brand-text/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-brand-text/5 prose-pre:border prose-pre:border-brand-text/10 prose-blockquote:border-l-brand-accent prose-blockquote:text-brand-text/80"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* standard markdown rendering with custom components */}
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeHighlight, rehypeRaw]}
                            components={{
                                h1: ({ children }) => (
                                    <h1 className="text-3xl font-bold text-brand-text mt-12 mb-6 border-b border-brand-text/10 pb-4">
                                        {children}
                                    </h1>
                                ),
                                h2: ({ children }) => (
                                    <h2 className="text-2xl font-bold text-brand-text mt-10 mb-4">
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children }) => (
                                    <h3 className="text-xl font-bold text-brand-text mt-8 mb-3">
                                        {children}
                                    </h3>
                                ),
                                p: ({ children }) => (
                                    <p className="text-brand-text/90 leading-relaxed mb-6">
                                        {children}
                                    </p>
                                ),
                                ul: ({ children }) => (
                                    <ul className="list-disc list-inside space-y-2 mb-6 text-brand-text/90">
                                        {children}
                                    </ul>
                                ),
                                ol: ({ children }) => (
                                    <ol className="list-decimal list-inside space-y-2 mb-6 text-brand-text/90">
                                        {children}
                                    </ol>
                                ),
                                blockquote: ({ children }) => (
                                    <blockquote className="border-l-4 border-brand-accent pl-6 italic text-brand-text/80 bg-brand-accent/5 py-4 rounded-r-lg mb-6">
                                        {children}
                                    </blockquote>
                                ),
                                code: ({ inline, children }) => 
                                    inline ? (
                                        <code className="text-brand-accent bg-brand-text/10 px-2 py-1 rounded text-sm">
                                            {children}
                                        </code>
                                    ) : (
                                        <code className="block bg-brand-text/5 p-4 rounded-lg border border-brand-text/10 overflow-x-auto">
                                            {children}
                                        </code>
                                    )
                            }}
                        >
                            {blog.content}
                        </ReactMarkdown>
                    </motion.article>

                    {recentBlogs.length > 0 && (
                        <motion.section 
                            className="mt-16 pt-12 border-t border-brand-text/10"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold text-brand-text mb-8">More Articles</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {recentBlogs.map(relatedBlog => (

                                    <Link
                                        to={`/blog/${relatedBlog.slug}`}
                                        key={relatedBlog.slug}
                                        className="group cursor-pointer bg-brand-bg border border-brand-text/10 rounded-lg overflow-hidden hover:border-brand-accent/30 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="aspect-video bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 relative overflow-hidden">
                                            {relatedBlog.frontmatter.headerImage ? (
                                                <img
                                                    src={relatedBlog.frontmatter.headerImage}
                                                    alt={relatedBlog.frontmatter.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <div className="text-4xl opacity-20">📝</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="text-sm text-brand-text/60 mb-2">
                                                {formatDate(relatedBlog.frontmatter.date)}
                                            </div>
                                            <h3 className="font-bold text-brand-text group-hover:text-brand-accent transition-colors line-clamp-2">
                                                {relatedBlog.frontmatter.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>
            </div>
        </main>
        </motion.div>
    )
}

export default BlogPost