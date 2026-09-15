import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import projectsData from '../data/projectsData'

const pageVariant = {
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

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = projectsData.find((item) => item.slug === slug)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (!project) return

    document.title = `${project.title} | Yousuf Shahzad`
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', project.description)
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `https://yousuf.sh/projects/${project.slug}`)
  }, [project])

  if (!project) {
    return (
      <motion.div
        className="min-h-screen px-8 lg:px-24 pt-32 lg:pt-40"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariant}
      >
        <h1 className="text-5xl md:text-7xl title mb-6">Project Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          This project case study does not exist.
        </p>
        <Link to="/projects" className="text-black underline underline-offset-4">
          Back to Projects
        </Link>
      </motion.div>
    )
  }

  const { caseStudy } = project
  const projectLinks = Object.entries(project.links || {}).filter(([, href]) => href)

  return (
    <motion.div
      className="relative min-h-screen overflow-x-hidden"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariant}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX }}
      />

      <div className="px-8 lg:px-24 pt-32 lg:pt-40 mb-16">
        <Link to="/projects" className="inline-block text-gray-600 hover:text-black transition-colors mb-8">
          Back to Projects
        </Link>
        <div className="max-w-5xl">
          <p className="text-sm uppercase tracking-5 text-gray-500 mb-4">
            Case Study
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight title mb-6">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl">
            {project.description}
          </p>
        </div>
      </div>

      <div className="px-8 lg:px-24 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
          <aside className="space-y-8">
            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Snapshot</h2>
              <dl className="space-y-5 text-gray-700">
                <div>
                  <dt className="text-sm uppercase tracking-4 text-gray-500">Role</dt>
                  <dd className="text-lg">{caseStudy.role}</dd>
                </div>
                <div>
                  <dt className="text-sm uppercase tracking-4 text-gray-500">Timeline</dt>
                  <dd className="text-lg">{caseStudy.timeline}</dd>
                </div>
              </dl>
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {projectLinks.length > 0 && (
              <section className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Links</h2>
                <div className="flex flex-col gap-3">
                  {projectLinks.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="capitalize text-black hover:text-gray-600 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </section>
            )}
          </aside>

          <main className="space-y-10">
            <section>
              <h2 className="text-3xl md:text-4xl title mb-4">Problem</h2>
              <p className="text-xl leading-relaxed text-gray-700">
                {caseStudy.problem}
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl title mb-4">Solution</h2>
              <p className="text-xl leading-relaxed text-gray-700">
                {caseStudy.solution}
              </p>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl title mb-4">Highlights</h2>
              <ul className="space-y-4">
                {caseStudy.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="bg-white rounded-lg shadow-lg p-5 text-lg text-gray-700"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl md:text-4xl title mb-4">What I Learned</h2>
              <p className="text-xl leading-relaxed text-gray-700">
                {caseStudy.lessons}
              </p>
            </section>
          </main>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectDetail
