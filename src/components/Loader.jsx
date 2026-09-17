import { useEffect } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const easing = [0.99, 0.01, 0.01, 0.99]
const exitDelay = 1.4
const exitDuration = 0.7
const revealOverlap = 0.2

const loaderVariants = {
    initial: {
        y: 0,
    },
    out: {
        y: '-101%',
    },
}

const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } }, //
}

const Loader = ({ onComplete, onRevealStart }) => {
    useEffect(() => {
        const revealTimer = window.setTimeout(
            () => onRevealStart?.(),
            (exitDelay + exitDuration - revealOverlap) * 1000
        )

        return () => window.clearTimeout(revealTimer)
    }, [onRevealStart])

    return (
        <motion.div
            className="fixed inset-0 bg-brand-text flex items-center justify-center z-[999]"
            variants={loaderVariants}
            initial="initial"
            animate="out"
            transition={{
                duration: exitDuration,
                delay: exitDelay,
                ease: easing,
            }}
            onAnimationComplete={(definition) => {
                if (definition === 'out') onComplete?.()
            }}
        >
            <motion.div
                className="text-brand-bg text-xl"
                initial="hidden"
                animate="visible"
                variants={textVariants}
            >
                yousuf.sh<span className="text-gray-300">ahzad</span>
            </motion.div>
        </motion.div>
    )
}

export default Loader

Loader.propTypes = {
    onComplete: PropTypes.func,
    onRevealStart: PropTypes.func,
}
