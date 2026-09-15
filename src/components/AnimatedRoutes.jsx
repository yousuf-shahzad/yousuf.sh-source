import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

const Home = lazy(() => import('../pages/Home'))
const Projects = lazy(() => import('../pages/Projects'))
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const Blog = lazy(() => import('../pages/Blog'))
const BlogPost = lazy(() => import('../pages/BlogPost'))
const NotFound = lazy(() => import('../pages/NotFound'))

const routeMeta = {
    '/': {
        title: 'Yousuf Shahzad | Personal Website',
        description: 'Personal website of Yousuf Shahzad - first-year Computer Science student at UCL and software developer',
    },
    '/about': {
        title: 'About | Yousuf Shahzad',
        description: 'Learn more about Yousuf Shahzad, a first-year Computer Science student at UCL and software developer.',
    },
    '/projects': {
        title: 'Projects | Yousuf Shahzad',
        description: 'Explore software projects by Yousuf Shahzad across web development, automation, and distributed systems.',
    },
    '/contact': {
        title: 'Contact | Yousuf Shahzad',
        description: 'Contact Yousuf Shahzad for collaboration, projects, and opportunities.',
    },
    '/blog': {
        title: 'Blog | Yousuf Shahzad',
        description: 'Thoughts from Yousuf Shahzad on technology, design, and software development.',
    },
}

function AnimatedRoutes() {
    const location = useLocation()
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location.pathname])

    useEffect(() => {
        const meta = routeMeta[location.pathname] || {
            title: location.pathname.startsWith('/projects/')
                ? 'Project Case Study | Yousuf Shahzad'
                : location.pathname.startsWith('/blog/')
                ? 'Blog Post | Yousuf Shahzad'
                : 'Page Not Found | Yousuf Shahzad',
            description: 'Personal website of Yousuf Shahzad.',
        }
        const description = document.querySelector('meta[name="description"]')
        const canonical = document.querySelector('link[rel="canonical"]')

        document.title = meta.title
        if (description) description.setAttribute('content', meta.description)
        if (canonical) {
            canonical.setAttribute('href', `https://yousuf.sh${location.pathname === '/' ? '/' : location.pathname}`)
        }
    }, [location.pathname])

    return (
        <AnimatePresence mode="wait">
            <Suspense fallback={null}>
                <Routes location={location} key={location.pathname}>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:slug" element={<ProjectDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                </Routes>
            </Suspense>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
