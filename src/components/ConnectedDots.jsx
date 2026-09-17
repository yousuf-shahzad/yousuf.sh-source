import { useCallback } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const ConnectedNavDots = ({ currentSection = 0, sections = [] }) => {
    const scrollToSection = useCallback(
        (id) =>
            document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        []
    )

    return (
        <nav
            className="hidden md:block fixed md:left-8 right-4 md:right-auto top-1/2 -translate-y-1/2 z-30"
            aria-label="Page sections"
        >
            <ol className="m-0 list-none flex flex-col gap-4 md:gap-8 py-2 md:py-4 px-2 md:px-0 rounded-full bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none shadow-lg md:shadow-none">
                {sections.map((section, index) => (
                    <li key={section.id}>
                        <motion.button
                            className="relative group outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full"
                            onClick={() => scrollToSection(section.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label={`Scroll to ${section.label} section`}
                            aria-current={
                                currentSection === index
                                    ? 'location'
                                    : undefined
                            }
                        >
                            <motion.div
                                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                                    currentSection === index
                                        ? 'bg-black'
                                        : 'bg-gray-300'
                                }`}
                            />
                            <div
                                className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
                                aria-hidden="true"
                            >
                                <span className="whitespace-nowrap text-sm font-medium">
                                    {section.label}
                                </span>
                            </div>
                        </motion.button>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

ConnectedNavDots.propTypes = {
    currentSection: PropTypes.number,
    sections: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
}

export default ConnectedNavDots
