// File: src/pages/About.jsx
import React, { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

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

const About = () => {
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
    const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    // Split text into paragraphs for stagger animation
    const paragraphs = [
        "I have always been attracted to how things work. From a young age, I'd look at the websites I'd browse regularly, in awe, and wonder about their inner workings. My mother had bought me a book on the Scratch programming language, followed by another on HTML & CSS the year after, which I devoured. This culminated in my first project; a simple birthday countdown. Yet, this would spell the beginning for my programming journey.",
        'As I am currently pursuing my A-levels in Mathematics, Further Mathematics, and Computer Science, I find they leave me to space to develop a strong foundation in both logical and abstract thinking. All my subjects challenge me in different ways, and I enjoy the balance they provide.',
        "Beyond programming, I really enjoy working with various types of media. Working with video editing and graphic design allows me to unleash my creativity, and I have a love for sports that fosters my more competitive side. You'll also find me always experimenting with new and different technologies, as I still possess the persistent curiousity that defined my route into this field.",
        "Although I am very early in my journey, I am excited by any and all future prospects and opportunities. There is always something new to learn, something different to try and something you can improve upon. I am committed to building solutions that are both engaging and impactful, and I look forward to the challenges that lie ahead.",
    ]

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
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{ scale: imageScale }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent " />
                </motion.div>

                <div className="relative z-10 text-center px-8">
                    <motion.h1
                        style={{ y: titleY }}
                        className="text-8xl md:text-9xl font-bold mb-6 title"
                    >
                        ABOUT ME
                    </motion.h1>
                    <motion.p
                        style={{ y: subtitleY }}
                        className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
                    >
                        Who is Yousuf Shahzad?
                    </motion.p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="px-8 lg:px-24 py-20">
                <div className="max-w-4xl mx-auto">
                    {paragraphs.map((paragraph, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-100px' }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.8,
                                        delay: index * 0.2,
                                    },
                                },
                            }}
                            className="mb-12"
                        >
                            <p className="text-xl leading-relaxed text-gray-800">
                                {paragraph}
                            </p>
                        </motion.div>
                    ))}

                    {/* Skills Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={textVariants}
                        className="mt-20"
                    >
                        <h2 className="text-4xl mb-8">
                            Technical Proficiencies
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-2xl mb-4">Languages</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        'Python',
                                        'JavaScript',
                                        'HTML/CSS',
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-4 py-2 bg-white rounded-full shadow-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-lg">
                                <h3 className="text-2xl mb-4">Technologies</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        'React',
                                        'Node.js',
                                        'Git',
                                        'Flask',
                                        'Tailwind CSS',
                                        'NumPy',
                                        'SQL',
                                        'PostgreSQL',
                                    ].map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-white rounded-full shadow-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default About
