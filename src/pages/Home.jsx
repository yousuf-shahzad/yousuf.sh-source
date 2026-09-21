import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import BlogCard from '../components/BlogCard'
import ConnectedNavDots from '../components/ConnectedDots'
import LazyCube from '../components/LazyCube'
import Loader from '../components/Loader'
import ProjectCard from '../components/projects/ProjectCard'
import ScrollProgress from '../components/ScrollProgress'
import useActiveSection from '../hooks/useActiveSection'
import usePageMetadata from '../hooks/usePageMetadata'
import projectsData from '../data/projectsData'
import { getRecentBlogs } from '../utils/blogUtils'

const sections = [
    { id: 'section-0', label: 'Home' },
    { id: 'section-1', label: 'About me' },
    { id: 'section-2', label: 'Projects' },
    { id: 'section-3', label: 'Blog' },
    { id: 'section-4', label: 'Contact' },
]
const reveal = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
    },
}
const homeHeroVariants = {
    covered: { opacity: 0, y: 40 },
    revealed: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: 'easeOut' },
    },
}
const reducedHomeHeroVariants = {
    covered: { opacity: 0 },
    revealed: { opacity: 1, transition: { duration: 0.2 } },
}

export default function Home() {
    usePageMetadata({
        title: 'Yousuf Shahzad | Computer Science Student at UCL',
        description:
            'Portfolio of Yousuf Shahzad, a first-year Computer Science student at UCL, featuring projects, writing, and achievements.',
        url: 'https://yousuf.sh/',
    })
    const [loading, setLoading] = useState(true)
    const [heroRevealed, setHeroRevealed] = useState(false)
    const shouldReduceMotion = useReducedMotion()
    const startHeroReveal = useCallback(() => setHeroRevealed(true), [])
    const activeSection = useActiveSection(
        sections.map((section) => section.id)
    )
    const recentBlogs = getRecentBlogs(3)
    return (
        <>
            {loading && (
                <Loader
                    onComplete={() => setLoading(false)}
                    onRevealStart={startHeroReveal}
                />
            )}

            <div className="relative home-page">
                <ScrollProgress />
                <ConnectedNavDots
                    currentSection={activeSection}
                    sections={sections}
                />
                <section
                    id="section-0"
                    className="min-h-[100svh] flex items-center scroll-mt-20"
                >
                    <motion.div
                        className="flex flex-col md:flex-row justify-between items-center w-full px-5 sm:px-8 lg:px-24 pt-24 pb-12 lg:pt-32"
                        variants={
                            shouldReduceMotion
                                ? reducedHomeHeroVariants
                                : homeHeroVariants
                        }
                        initial="covered"
                        animate={heroRevealed ? 'revealed' : 'covered'}
                    >
                        <div className="text-left max-w-lg">
                            <h1 className="text-[clamp(3.5rem,18vw,4.5rem)] md:text-8xl leading-[0.9] title tracking-tight">
                                YOUSUF
                                <br />
                                SHAHZAD
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-gray-600">
                                First-year Computer Science student at UCL
                            </p>
                            <div className="grid grid-cols-2 gap-3 mt-8 sm:flex sm:flex-wrap sm:gap-4">
                                <a
                                    href="#section-1"
                                    className="col-span-2 sm:col-span-1 group px-5 sm:px-6 py-3 bg-black border-2 border-black text-white text-center text-base sm:text-lg rounded hover:bg-gray-800 transition"
                                >
                                    About me{' '}
                                    <span className="group-hover:ml-6 duration-500">
                                        →
                                    </span>
                                </a>
                                <a
                                    href="#section-2"
                                    className="px-4 sm:px-6 py-3 border-2 border-black text-center text-base sm:text-lg rounded hover:bg-gray-100 transition"
                                >
                                    View projects
                                </a>
                                <Link
                                    to="/blog"
                                    className="px-4 sm:px-6 py-3 border-2 border-gray-500 text-gray-700 text-center text-base sm:text-lg rounded hover:bg-gray-50 transition"
                                >
                                    Read blog
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block mt-10 lg:mt-0 lg:ml-16">
                            <LazyCube />
                        </div>
                    </motion.div>
                </section>
                <motion.section
                    id="section-1"
                    className="min-h-[100svh] py-16 sm:py-20 scroll-mt-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={reveal}
                >
                    <h2 className="px-5 sm:px-8 lg:px-24 text-3xl sm:text-4xl md:text-5xl text-left mb-10 sm:mb-16 title">
                        ABOUT ME
                    </h2>
                    <div className="max-w-4xl px-5 sm:px-8 lg:px-24">
                        <div className="p-5 sm:p-8 rounded-lg shadow-lg bg-white">
                            <p className="text-base sm:text-xl mb-6">
                                I&apos;m a first-year Computer Science student
                                at UCL with a passion for technology and
                                software development. I love breaking things
                                down to understand how they work, exploring new
                                technologies, and building projects that are
                                impactful.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4">
                                        Education
                                    </h3>
                                    <p className="text-gray-600">
                                        First-year BSc Computer Science student
                                        at UCL.
                                        <br />
                                        A-levels: Mathematics A*, Further
                                        Mathematics A*, Computer Science A*.
                                        <br />
                                        EPQ on AES-256: A*.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-4">
                                        Skills
                                    </h3>
                                    <p className="text-gray-600">
                                        Python, JavaScript, SQL, React, HTML,
                                        CSS, Node.js, Git and Flask.
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-start mt-8">
                                <Link
                                    to="/about"
                                    className="group px-6 py-3 border-2 border-black bg-black text-white text-lg rounded hover:bg-gray-800 transition"
                                >
                                    Find out more about me{' '}
                                    <span className="ml-2 group-hover:ml-6 duration-500">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.section>
                <section
                    id="section-2"
                    className="min-h-[100svh] py-16 sm:py-20 scroll-mt-20"
                >
                    <h2 className="px-5 sm:px-8 lg:px-24 text-3xl sm:text-4xl md:text-5xl text-left mb-10 sm:mb-16 title">
                        PROJECTS
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 px-5 sm:px-8 lg:px-24">
                        {projectsData.slice(0, 4).map((project) => (
                            <ProjectCard
                                key={project.slug}
                                project={project}
                                variant="home"
                            />
                        ))}
                    </div>
                    <div className="flex justify-start px-5 sm:px-8 lg:px-24 mt-8">
                        <Link
                            to="/projects"
                            className="group px-6 py-3 border-2 border-black text-black text-lg rounded hover:bg-gray-100 transition"
                        >
                            View more projects{' '}
                            <span className="ml-2 group-hover:ml-6 duration-500">
                                →
                            </span>
                        </Link>
                    </div>
                </section>
                <motion.section
                    id="section-3"
                    className="min-h-[70svh] py-16 sm:py-20 scroll-mt-20"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={reveal}
                >
                    <h2 className="px-5 sm:px-8 lg:px-24 text-3xl sm:text-4xl md:text-5xl text-left mb-10 sm:mb-16 title">
                        LATEST THOUGHTS
                    </h2>
                    <div className="max-w-6xl px-5 sm:px-8 lg:px-24">
                        {recentBlogs.length ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                                {recentBlogs.map((post) => (
                                    <BlogCard
                                        key={post.slug}
                                        post={post}
                                        variant="home"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-left text-gray-600">
                                New writing is on its way.
                            </p>
                        )}
                        <div className="text-left mt-10">
                            <Link
                                to="/blog"
                                className="px-6 py-3 border-2 border-black rounded hover:bg-gray-100"
                            >
                                View all posts →
                            </Link>
                        </div>
                    </div>
                </motion.section>
                <section
                    id="section-4"
                    className="overflow-hidden rounded-2xl  text-black scroll-mt-20"
                >
                    <Link
                        to="/contact"
                        className="group grid min-h-64 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-5 py-10 transition-colors duration-500 hover:bg-[#dedede] sm:min-h-80 sm:px-8 sm:py-12 lg:px-24 lg:py-16"
                    >
                        <div className="max-w-2xl">
                            <h2 className="text-4xl sm:text-5xl md:text-6xl title leading-[0.95]">
                                LET&apos;S CONNECT
                            </h2>
                            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-600 transition-colors duration-500 group-hover:text-black/80 sm:text-lg">
                                Have a project in mind or want to say hello?
                                I&apos;d love to hear from you.
                            </p>
                        </div>
                        <span
                            aria-hidden="true"
                            className="text-[clamp(4rem,15vw,11rem)] leading-none font-light transition-transform duration-500 group-hover:-translate-y-3 group-hover:translate-x-3"
                        >
                            ↗
                        </span>
                    </Link>
                </section>
            </div>
        </>
    )
}
