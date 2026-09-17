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

function AnimatedRoutes() {
    const location = useLocation()

    useEffect(() => {
        const target = location.hash && document.querySelector(location.hash)
        if (target) target.scrollIntoView()
        else window.scrollTo({ top: 0, behavior: 'auto' })
    }, [location.pathname, location.hash])

    return (
        <AnimatePresence mode="wait">
            <Suspense
                fallback={
                    <div className="min-h-[50vh] grid place-items-center">
                        Loading…
                    </div>
                }
            >
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
