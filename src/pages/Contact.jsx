import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'

// Animation variants
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

const Contact = () => {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <motion.div
            className="relative min-h-screen"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
        >
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
                style={{ scaleX }}
            />
            <div className="px-8 lg:px-24 pt-32 lg:pt-40 mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title mb-6">
                        GET IN TOUCH
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
                        Let&apos;s collaborate on something amazing. Whether you have
                        a project in mind or just want to say hello, I&apos;d love to
                        hear from you.
                    </p>
                </motion.div>
            </div>

            <div className="px-8 lg:px-24 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Contact Information
                                </h2>
                                <p className="text-gray-600 mb-8">
                                    Feel free to reach out through any of these
                                    channels:
                                </p>
                            </div>

                            <div className="space-y-6">
                                <Link
                                    to="mailto:contact@yousuf.sh"
                                    className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                        @
                                    </span>
                                    <span>contact@yousuf.sh</span>
                                </Link>

                                <Link
                                    to="https://github.com/yousuf-shahzad"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                        G
                                    </span>
                                    <span>github.com/yousuf-shahzad</span>
                                </Link>

                                <Link
                                    to="https://linkedin.com/in/yousuf-sh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                                >
                                    <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">
                                        in
                                    </span>
                                    <span>linkedin.com/in/yousuf-sh</span>
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="space-y-6 p-8 rounded-lg shadow-lg bg-white"
                        >
                            <h2 className="text-2xl font-bold mb-4">Reach out directly</h2>
                            <p className="text-gray-600">
                                I prefer email, so if you send a message, I&apos;ll reply as soon as I can.
                            </p>
                            <button className="group px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition">
                                <a href="mailto:contact@yousuf.sh">
                                            Email Me{' '}
                                    <span className="ml-2 group-hover:ml-6 duration-500 ease-out">
                                                →
                                    </span>
                                </a>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Contact