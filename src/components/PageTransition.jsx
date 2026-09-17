import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { pageVariants } from '../utils/motion'

export default function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            className={className}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
        >
            {children}
        </motion.div>
    )
}

PageTransition.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}
