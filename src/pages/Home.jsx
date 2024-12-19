import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Cube from '../components/Cube'
import Loader from '../components/Loader'
import ConnectedNavDots from '../components/ConnectedDots'
import projectsData from '../data/projectsData' // External data file

// Page transition variants
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

// Section animation variants
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

// Container variants for staggered children
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
    const navigate = useNavigate()

    // Smooth spring animation for scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    // Progress bar for scroll position
    // In your Home component, add this near the top where your other state is defined:

    // Add this useEffect for section tracking
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5, // When 50% of the section is visible
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

        // Observe all sections
        document.querySelectorAll('[id^="section-"]').forEach((section) => {
            observer.observe(section)
        })

        return () => {
            // Cleanup observer
            document.querySelectorAll('[id^="section-"]').forEach((section) => {
                observer.unobserve(section)
            })
        }
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div className="relative">
                    {/* Fixed progress bar */}
                    <motion.div
                        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                        style={{ scaleX }}
                    />

                    {/* Fixed navigation dots */}
                    <ConnectedNavDots
                        currentSection={currentSection}
                        totalSections={4}
                        setCurrentSection={setCurrentSection}
                    />

                    {/* Updated Hero Section */}
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
                                <div className="flex gap-4 mt-6">
                                    <button className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition">
                                        <a href="#section-1">
                                            About Me{' '}
                                            <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                                →
                                            </span>
                                        </a>
                                    </button>
                                    <button className="group px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition">
                                        <a href="#section-2">View Projects</a>
                                    </button>
                                </div>
                            </div>

                            <div className="hidden md:block mt-10 lg:mt-0 lg:ml-16 h-50 w-50">
                                <Cube />
                            </div>
                        </motion.div>
                    </div>

                    {/* About Section */}
                    <motion.section
                        id="section-1"
                        className="min-h-screen py-20 "
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl text-center mb-16"
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
                                    I'm a Computer Science student with a
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
                                                Java
                                            </li>
                                            <li>
                                                Web: React, HTML, CSS, Node.js
                                            </li>
                                            <li>
                                                Tools: Git, VS Code, Firebase
                                            </li>
                                            <li>
                                                Currently Learning: [Technology]
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-8">
                                    <button
                                        className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transitionr"
                                        onClick={() => {
                                            navigate('/about')
                                        }}
                                    >
                                        <span>Find out more about me</span>
                                        <span className="ml-2 group-hover:ml-10 duration-500 ease-out">
                                            →
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.section>

                    {/* Projects Section */}
                    <motion.section
                        id="section-2"
                        className="min-h-screen py-20"
                    >
                        <motion.h2 className="text-4xl md:text-5xl text-center mb-16">
                            Projects
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 lg:px-24">
                            {projectsData.map((project, index) => (
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
                                            <a
                                                href={project.links.demo}
                                                className="text-blue-500 hover:underline mr-4"
                                            >
                                                View Demo
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                className="text-blue-500 hover:underline mr-4"
                                            >
                                                GitHub Repo
                                            </a>
                                        )}
                                        {project.links.homepage && (
                                            <a
                                                href={project.links.homepage}
                                                className="text-blue-500 hover:underline"
                                            >
                                                Project Homepage
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Centered button */}
                        <div className="flex justify-center mt-8">
                            <button
                                className="group transition px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition flex items-center"
                                onClick={() => {
                                    navigate('/projects')
                                }}
                            >
                                <span>View More Projects</span>
                                <span className="ml-2 group-hover:ml-10 duration-500 ease-out">
                                    →
                                </span>
                            </button>
                        </div>
                    </motion.section>

                    {/* Contact Section */}
                    <motion.section
                        id="section-3"
                        className="min-h-screen py-20"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl text-center mb-16"
                            variants={sectionVariants}
                        >
                            Let's Connect
                        </motion.h2>
                        <motion.div
                            className="max-w-2xl mx-auto text-center px-8"
                            variants={sectionVariants}
                        >
                            <p className="text-xl text-gray-600 mb-8">
                                I'm always excited to collaborate on projects or
                                discuss opportunities!
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition inline-flex items-center"
                            >
                                Let's Talk
                                <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                    →
                                </span>
                            </button>
                        </motion.div>
                    </motion.section>
                </div>
            )}
        </>
    )
}

export default Home
