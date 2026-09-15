import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import NotFound from '../pages/NotFound'
import { getPageMetadata } from '../utils/metadata'

export default function SiteRoutes() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef(location.pathname)
  useEffect(() => {
    const meta = getPageMetadata(location.pathname)
    document.title = meta.title
    for (const [selector, content] of [
      ['meta[name="description"]', meta.description],
      ['meta[property="og:title"]', meta.title],
      ['meta[property="og:description"]', meta.description],
      ['meta[property="og:url"]', meta.canonical],
      ['meta[property="og:type"]', meta.type],
      ['meta[name="twitter:title"]', meta.title],
      ['meta[name="twitter:description"]', meta.description],
      ['meta[name="twitter:url"]', meta.canonical],
      [
        'meta[name="robots"]',
        meta.notFound ? 'noindex, follow' : 'index, follow',
      ],
    ])
      document.querySelector(selector)?.setAttribute('content', content)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', meta.canonical)
    if (previousPath.current !== location.pathname) {
      if (navigationType !== 'POP')
        window.scrollTo({ top: 0, behavior: 'instant' })
      document.querySelector('h1')?.focus({ preventScroll: true })
      previousPath.current = location.pathname
    }
  }, [location.pathname, navigationType])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
