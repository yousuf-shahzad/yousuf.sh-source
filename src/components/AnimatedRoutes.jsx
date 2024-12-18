// File: src/components/AnimatedRoutes.jsx

import React from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import About from '../pages/About'
import Contact from '../pages/Contact'
import { AnimatePresence } from 'framer-motion'
import Inbetween from './Inbetween'

function AnimatedRoutes() {
    const location = useLocation()
    const [showInbetween, setShowInbetween] = React.useState(false)

    const handlePageChange = () => {
        setShowInbetween(true)
        setTimeout(() => {
            setShowInbetween(false)
        }, 1500) // Adjust the duration to match animation time
    }

    return (
        <AnimatePresence mode="wait">
            {showInbetween ? (
                <Inbetween key="loader" />
            ) : (
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home onNavigate={handlePageChange} />} />
                    <Route path="/projects" element={<Projects onNavigate={handlePageChange} />} />
                    <Route path="/about" element={<About onNavigate={handlePageChange} />} />
                    <Route path="/contact" element={<Contact onNavigate={handlePageChange} />} />
                </Routes>
            )}
        </AnimatePresence>
    )
}

export default AnimatedRoutes
