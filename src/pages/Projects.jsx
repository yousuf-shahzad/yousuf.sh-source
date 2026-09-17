import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import ProjectCard from '../components/projects/ProjectCard'
import ScrollProgress from '../components/ScrollProgress'
import usePageMetadata from '../hooks/usePageMetadata'
import projectsData from '../data/projectsData'

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
}
const item = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' },
    },
}

export default function Projects() {
    usePageMetadata({
        title: 'Projects | Yousuf Shahzad',
        description:
            'Software projects by Yousuf Shahzad, a Computer Science student at UCL, spanning web development, data, and problem-solving.',
        url: 'https://yousuf.sh/projects/',
    })
    return (
        <PageTransition className="relative overflow-x-hidden min-h-screen">
            <ScrollProgress />
            <div className="px-5 sm:px-8 lg:px-24 pt-24 sm:pt-32 lg:pt-40 mb-14 sm:mb-20">
                <h1 className="text-5xl sm:text-6xl md:text-8xl leading-tight title mb-6">
                    PROJECTS
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                    Explore my journey through code, design, and
                    problem-solving. Each project represents a unique challenge
                    and learning experience.
                </p>
            </div>
            <motion.div
                className="px-5 sm:px-8 lg:px-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {projectsData.map((project) => (
                    <ProjectCard
                        key={project.slug}
                        project={project}
                        motionProps={{ variants: item, whileHover: { y: -10 } }}
                    />
                ))}
            </motion.div>
            <div className="text-center py-16 sm:py-20 px-5 sm:px-8">
                <h2 className="text-4xl title mb-6">
                    INTERESTED IN COLLABORATING?
                </h2>
                <Link
                    to="/contact"
                    className="inline-flex group px-6 py-3 bg-black border-2 border-black text-white text-lg rounded hover:bg-gray-800 transition"
                >
                    Let&apos;s talk{' '}
                    <span className="ml-2 group-hover:ml-6 duration-500">
                        →
                    </span>
                </Link>
            </div>
        </PageTransition>
    )
}
