// File: src/components/AnimatedRoutes.jsx

import { React } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import About from '../pages/About'
import Contact from '../pages/Contact'
import { AnimatePresence } from 'motion/react'
import { ReactLenis } from 'lenis/react'

function AnimatedRoutes() {

    const location = useLocation()
    return (
            <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </AnimatePresence>
    )
}

export default AnimatedRoutes
