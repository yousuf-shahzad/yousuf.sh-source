// File: src/pages/Projects.jsx

import React from 'react'
import { motion } from 'motion/react';

const Projects = () => {
    return (
        <>
            <motion.div
                className="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            </motion.div>
        </>
    )
}

export default Projects
