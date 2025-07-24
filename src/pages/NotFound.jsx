// File: src/pages/NotFound.jsx
import { useState, useEffect } from 'react'
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

// Animation variants for page transitions
const pageVariants = {
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

// Text reveal animation
const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
}

// Button animation
const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
            delay: 0.5,
        },
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeInOut',
        },
    },
    tap: {
        scale: 0.95,
    },
}

// Container variants for staggered children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2,
        },
    },
}

const NotFound = () => {
    const navigate = useNavigate()
    const { scrollY, scrollYProgress } = useScroll()
    const [isLoaded, setIsLoaded] = useState(false)

    // Smooth spring animation for scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Parallax effects
    const titleY = useTransform(scrollY, [0, 300], [0, -50])
    const subtitleY = useTransform(scrollY, [0, 300], [0, -25])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleGoHome = () => {
        navigate('/')
    }

    const handleGoBack = () => {
        window.history.back()
    }

    return (
        <motion.div
            className="relative min-h-screen overflow-hidden"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
        >
            {/* Progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                    >
                        {/* 404 Number */}
                        <motion.h1
                            style={{ y: titleY }}
                            className="text-9xl md:text-[12rem] lg:text-[15rem] font-bold mb-6 title tracking-tight"
                            variants={textVariants}
                        >
                            404
                        </motion.h1>

                        {/* Page Not Found Text */}
                        <motion.h2
                            style={{ y: subtitleY }}
                            className="text-3xl md:text-5xl lg:text-6xl font-medium mb-8 -tracking-3"
                            variants={textVariants}
                        >
                            PAGE NOT FOUND
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed"
                            variants={textVariants}
                        >
                            The page you are looking for does not exist or has been moved. Please check the URL or return to the homepage.
                        </motion.p>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            variants={containerVariants}
                        >
                            <motion.button
                                onClick={handleGoHome}
                                className="px-8 py-4 bg-black text-white text-lg font-medium hover:bg-gray-800 transition-colors duration-300 -skew-x-3 hover:-skew-x-6 tracking-wide"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                GO HOME
                            </motion.button>

                            <motion.button
                                onClick={handleGoBack}
                                className="px-8 py-4 border-2 border-black text-black text-lg font-medium hover:bg-black hover:text-white transition-all duration-300 -skew-x-3 hover:-skew-x-6 tracking-wide"
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                GO BACK
                            </motion.button>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
                            variants={textVariants}
                            animate={{
                                rotate: 360,
                                transition: {
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            <div className="w-96 h-96 border border-gray-200 rounded-full opacity-20" />
                        </motion.div>

                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
                            variants={textVariants}
                            animate={{
                                rotate: -360,
                                transition: {
                                    duration: 30,
                                    repeat: Infinity,
                                    ease: "linear",
                                },
                            }}
                        >
                            <div className="w-64 h-64 border border-gray-300 rounded-full opacity-30" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Additional Info Section */}
        </motion.div>
    )
}

export default NotFound
