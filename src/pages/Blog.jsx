import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { getAllBlogs, getAllTags, formatDate } from '../utils/blogUtils'

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

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
}

const Blog = () => {
    const [blogs, setBlogs] = useState([])
    const [filteredBlogs, setFilteredBlogs] = useState([])
    const [selectedTag, setSelectedTag] = useState('all')
    const [tags, setTags] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        const allBlogs = getAllBlogs()
        const allTags = getAllTags()
        
        setBlogs(allBlogs)
        setFilteredBlogs(allBlogs)
        setTags(['all', ...allTags])
    }, [])

    useEffect(() => {
        let filtered = blogs

        // tag filtering
        if (selectedTag !== 'all') {
            filtered = filtered.filter(blog => 
                blog.frontmatter.tags && blog.frontmatter.tags.includes(selectedTag)
            )
        }

        // search filtering
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.frontmatter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.frontmatter.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                blog.frontmatter.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            )
        }

        setFilteredBlogs(filtered)
    }, [selectedTag, searchTerm, blogs])

    const handleBlogClick = (slug) => {
        navigate(`/blog/${slug}`)
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />
            
            <motion.main 
                className="flex-grow px-6 py-12 md:px-12 lg:px-24"
                variants={pageVariant}
                initial="initial"
                animate="in"
                exit="out"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 title">
                            BLOG
                        </h1>
                        <p className="text-xl text-brand-text/80 max-w-2xl mx-auto">
                            Thoughts on technology, design, and everything in between.
                        </p>
                    </motion.div>

                <motion.div 
                    className="mb-12 flex flex-col md:flex-row gap-6 justify-between items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="relative w-full md:w-96">
                        <input
                            type="text"
                            placeholder="Search blog posts..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 bg-brand-bg border border-brand-text/20 rounded-lg focus:outline-none focus:border-brand-accent transition-colors text-brand-text placeholder-brand-text/60"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brand-text/60 hover:text-brand-text transition-colors"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedTag === tag
                                        ? 'bg-brand-accent text-brand-bg shadow-lg'
                                        : 'bg-brand-text/10 text-brand-text hover:bg-brand-text/20'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredBlogs.map((blog) => (
                        <motion.article
                            key={blog.slug}
                            variants={cardVariants}
                            whileHover={{ y: -8 }}
                            onClick={() => handleBlogClick(blog.slug)}
                            className="group bg-brand-bg border border-brand-text/10 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-brand-accent/30 transition-all duration-300"
                        >
                            <div className="aspect-video bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 relative overflow-hidden">
                                {blog.frontmatter.headerImage ? (
                                    <img
                                        src={blog.frontmatter.headerImage}
                                        alt={blog.frontmatter.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="text-6xl opacity-20">📝</div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between text-sm text-brand-text/60 mb-3">
                                    <span>{formatDate(blog.frontmatter.date)}</span>
                                    <span>{blog.frontmatter.readTime}</span>
                                </div>

                                <h2 className="text-xl font-bold mb-3 text-brand-text group-hover:text-brand-accent transition-colors line-clamp-2">
                                    {blog.frontmatter.title}
                                </h2>

                                <p className="text-brand-text/80 mb-4 line-clamp-3">
                                    {blog.frontmatter.excerpt}
                                </p>

                                {blog.frontmatter.tags && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.frontmatter.tags.slice(0, 3).map(tag => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-brand-accent/10 text-brand-accent text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {blog.frontmatter.tags.length > 3 && (
                                            <span className="px-2 py-1 bg-brand-text/10 text-brand-text/60 text-xs rounded-full">
                                                +{blog.frontmatter.tags.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center text-brand-accent font-medium group-hover:text-gray-500 transition-colors">
                                    Read More
                                    <svg 
                                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform ease-out duration-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

                {filteredBlogs.length === 0 && (
                    <motion.div 
                        className="text-center py-16"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-bold text-brand-text mb-2">No posts found</h3>
                        <p className="text-brand-text/60">
                            {searchTerm || selectedTag !== 'all' 
                                ? 'Try adjusting your search or filter criteria.'
                                : 'Check back soon for new content!'
                            }
                        </p>
                    </motion.div>
                )}
            </div>
        </motion.main>
        </>
    )
}

export default Blog