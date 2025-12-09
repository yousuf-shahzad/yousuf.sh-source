import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import Cube from '../components/Cube'
import Loader from '../components/Loader'
import ConnectedNavDots from '../components/ConnectedDots'
import projectsData from '../data/projectsData' // External data file
import { getRecentBlogs, formatDate } from '../utils/blogUtils'

const initVariant = {
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
            delay: 1.8,
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

const sectionVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
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
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
}

const Home = () => {
    const [loading, setLoading] = useState(true)
    const { scrollYProgress } = useScroll()
    const [currentSection, setCurrentSection] = useState(0)
    const [recentBlogs, setRecentBlogs] = useState([])

    // spring animate for progress bar
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    }) // may be a bit janky prior to the loading screen disappearing

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // hacky way to track current section using Intersection Observer
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // 50% of the section is visible
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id
                    const sectionIndex = parseInt(sectionId.split('-')[1])
                    setCurrentSection(sectionIndex)
                }
            })
        }, options)

        document.querySelectorAll('[id^="section-"]').forEach((section) => {
            observer.observe(section)
        })

        return () => {
            document.querySelectorAll('[id^="section-"]').forEach((section) => {
                observer.unobserve(section)
            })
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2200)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        try {
            const blogs = getRecentBlogs(3)
            setRecentBlogs(blogs)
        } catch (error) {
            console.error('Error fetching recent blogs:', error)
            setRecentBlogs([])
        }
    }, [])

    return (
        <>
            {loading && <Loader />}
            <div className="relative">
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                        style={{ scaleX }}
                    />

                    <ConnectedNavDots
                        currentSection={currentSection}
                        totalSections={5}
                        setCurrentSection={setCurrentSection}
                    />

                    <div id="section-0" className="h-screen">
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-24 pt-32 lg:pt-40"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={initVariant}
                        >
                            <div className="text-left max-w-lg">
                                <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title">
                                    YOUSUF
                                </h1>
                                <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title">
                                    SHAHZAD
                                </h1>
                                <p className="mt-4 text-lg md:text-xl lg:text-xl text-gray-600">
                                    Computer Science Student | Aspiring
                                    Developer
                                </p>
                                <p className="mt-2 text-md text-gray-500">
                                    Currently studying Mathematics, Further
                                    Mathematics and Computer Science at A level.
                                </p>
                                <div className="flex flex-wrap gap-4 mt-6">
                                    <a href="#section-1">
                                    <button className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition">
                                            About Me{' '}
                                            <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                                →
                                            </span>
                                    </button>
                                    </a>
                                    <a href="#section-2">
                                    <button className="group px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition">
                                        View Projects
                                    </button>
                                    </a>
                                    <Link to="/blog">
                                    <button 
                                        className="group px-6 py-3 border-2 border-gray-500 text-gray-700 text-lg rounded hover:bg-gray-50 transition"   
                                    >
                                        Read Blog
                                    </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="hidden md:block mt-10 lg:mt-0 lg:ml-16 h-50 w-50">
                                <Cube />
                            </div>
                        </motion.div>
                    </div>

                    <motion.section
                        id="section-1"
                        className="min-h-screen py-20 "
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl text-center mb-16 -tracking-3"
                            variants={sectionVariants}
                        >
                            About Me
                        </motion.h2>
                        <div className="max-w-4xl mx-auto px-8">
                            <motion.div
                                className="p-8 rounded-lg shadow-lg mb-8 bg-white"
                                variants={sectionVariants}
                            >
                                <p className="text-xl mb-6">
                                    I&apos;m a Computer Science student with a
                                    passion for technology and software
                                    development - I love breaking things down to
                                    understand how they work, explore new
                                    technologies and build projects that are
                                    impactful.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">
                                            Education
                                        </h3>
                                        <p className="text-gray-600">
                                            Studying 3 A Levels:
                                            <br />
                                            Mathematics, Further Mathematics and
                                            Computer Science
                                            <br />
                                            A* <strong>Extended Project Qualification</strong> on AES-256
                                            <br />
                                            Expected Graduation: 2026
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-4">
                                            Skills
                                        </h3>
                                        <ul className="text-gray-600">
                                            <li>
                                                Programming: Python, JavaScript,
                                                SQL
                                            </li>
                                            <li>
                                                Web: React, HTML, CSS, Node.js
                                            </li>
                                            <li>
                                                Tools: Git, VS Code, Vercel, Netlify, Docker
                                            </li>
                                            <li>
                                                Currently Learning: Rust
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <Link to="/about">
                                    <button
                                        className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transitionr"
                                    >
                                        <span>Find out more about me</span>
                                        <span className="ml-2 group-hover:ml-10 duration-500 ease-out">
                                            →
                                        </span>
                                    </button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    <motion.section
                        id="section-2"
                        className="min-h-screen py-20"
                    >
                        <motion.h2 className="text-4xl md:text-5xl text-center mb-16 -tracking-3">
                            Projects
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 lg:px-24">
                            {projectsData.slice(0, 4).map((project, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white p-8 rounded-lg shadow-lg mb-8"
                                >
                                    <h3 className="text-2xl mb-4">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {project.description}
                                    </p>

                                    <div className="mt-4">
                                        {project.links.demo && (
                                            <Link
                                                to={project.links.demo}
                                                className="text-blue-500 hover:underline mr-4"
                                            >
                                                View Demo
                                            </Link>
                                        )}
                                        {project.links.github && (
                                            <Link
                                                to={project.links.github}
                                                className="text-blue-500 hover:underline mr-4"
                                            >
                                                GitHub Repo
                                            </Link>
                                        )}
                                        {project.links.homepage && (
                                            <Link
                                                to={project.links.homepage}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Project Homepage
                                            </Link>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8">
                            <Link to="/projects">
                            <button
                                className="group px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition flex items-center"
                            >
                                <span>View More Projects</span>
                                <span className="ml-2 group-hover:ml-10 duration-500 ease-out">
                                    →
                                </span>
                            </button>
                            </Link>
                        </div>
                    </motion.section>

                    <motion.section
                        id="section-3"
                        className="min-h-screen py-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl text-center mb-16 -tracking-3"
                            variants={sectionVariants}
                        >
                            Latest Thoughts
                        </motion.h2>
                        <motion.div
                            className="max-w-6xl mx-auto px-8"
                            variants={sectionVariants}
                        >
                            {recentBlogs.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                    {recentBlogs.map((blog) => (
                                        <motion.article
                                            key={blog.slug}
                                            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                                            whileHover={{ y: -8 }}
                                            variants={sectionVariants}
                                        >
                                            <Link to={`/blog/${blog.slug}`}>
                                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                                {blog.frontmatter.headerImage ? (
                                                    <img
                                                        src={blog.frontmatter.headerImage}
                                                        alt={blog.frontmatter.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-4xl opacity-20">📝</div>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div className="p-6">
                                                <div className="text-sm text-gray-500 mb-2">
                                                    {formatDate(blog.frontmatter.date)}
                                                </div>
                                                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2">
                                                    {blog.frontmatter.title}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {blog.frontmatter.excerpt}
                                                </p>
                                                
                                                {blog.frontmatter.tags && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {blog.frontmatter.tags.slice(0, 2).map(tag => (
                                                            <span
                                                                key={tag}
                                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                
                                                <div className="flex items-center text-gray-500 font-medium group-hover:text-gray-700 transition-colors">
                                                    Read More
                                                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            </Link>
                                        </motion.article>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-xl text-gray-600">Coming soon...</p>
                                </div>
                            )}
                            
                            <div className="flex justify-center">
                                <Link to="/blog">
                                <button
                                    className="group px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition inline-flex items-center"
                                >
                                    View All Posts
                                    <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                        →
                                    </span>
                                </button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.section>

                    <motion.section
                        id="section-4"
                        className="min-h-screen py-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl text-center mb-16 -tracking-3"
                            variants={sectionVariants}
                        >
                            Let&apos;s Connect
                        </motion.h2>
                        <motion.div
                            className="max-w-2xl mx-auto text-center px-8"
                            variants={sectionVariants}
                        >
                            <p className="text-xl text-gray-600 mb-8">
                                I&apos;m always excited to collaborate on projects or
                                discuss opportunities!
                            </p>
                            <Link to="/contact">
                            <button
                                className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition inline-flex items-center"
                            >
                                Let&apos;s Talk
                                <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                    →
                                </span>
                            </button>
                            </Link>
                        </motion.div>
                    </motion.section>
                </div>
        </>
    )
}

export default Home
