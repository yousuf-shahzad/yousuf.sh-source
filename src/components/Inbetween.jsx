import React from 'react';
import { motion } from 'framer-motion';

const easing = [0.6, -0.1, 0.01, 0.99]; // Modified easing for smoother motion

const containerVariants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: easing,
      when: "beforeChildren", // Ensures container animates first
    }
  },
  exit: {
    y: '-100%',
    transition: {
      duration: 0.8,
      ease: easing,
      when: "afterChildren", // Ensures container leaves last
    }
  }
};

const Loader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-brand-text flex items-center justify-center z-50"
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="text-brand-bg text-xl"
      >
        yousuf.sh<span className="text-gray-300">ahzad</span>
      </motion.div>
    </motion.div>
  );
};

export default Loader;