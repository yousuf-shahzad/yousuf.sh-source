import { motion, useScroll, useSpring } from 'framer-motion'
import { scrollSpring } from '../utils/motion'

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, scrollSpring)
    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
            style={{ scaleX }}
        />
    )
}
