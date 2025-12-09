import { motion, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import projectsData from '../data/projectsData';

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
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const projectVariants = {
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
};

const Projects = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative overflow-x-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX }}
      />

      <motion.div
        className="min-h-screen"
        initial="initial"
        animate="in"
        exit="out"
        variants={initVariant}
      >
        <div className="px-8 lg:px-24 pt-32 lg:pt-40 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title mb-6">
              PROJECTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
              Explore my journey through code, design, and problem-solving. Each project 
              represents a unique challenge and learning experience.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="px-8 lg:px-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={projectVariants}
                whileHover={{ y: -10 }}
              >
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  {project.links.demo && (
                    <Link
                      to={project.links.demo}
                      className="text-black hover:text-gray-600 transition-colors flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Demo</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  )}
                  {project.links.github && (
                    <Link
                      to={project.links.github}
                      className="text-black hover:text-gray-600 transition-colors flex items-center gap-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="text-center py-20 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl mb-6">Interested in collaborating?</h2>
          <Link to="/contact">
          <button
            className="group px-6 py-3 bg-black border-2 border-black text-white text-lg rounded hover:bg-gray-800 transition inline-flex items-center"
          >
            Let&apos;s Talk
            <span className="ml-2 group-hover:ml-6 duration-500 ease-out">→</span>
          </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Projects;