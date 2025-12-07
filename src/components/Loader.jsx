// File: src/components/Loader.jsx

import React from 'react'
import { motion } from 'framer-motion'

// Custom bezier curve can be edited at https://cubic-bezier.com/
// Link follows as https://cubic-bezier.com/#[bezier_vals]
const easing = [0.99, 0.01, 0.01, 0.99]

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

const Loader = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-brand-text flex items-center justify-center z-[999]"
            variants={loaderVariants}
            initial="initial"
            animate="out"
            transition={{ duration: 0.7, delay: 1.4, ease: easing }}
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