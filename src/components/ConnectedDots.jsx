import React from 'react';
import { motion } from 'framer-motion';

const ConnectedNavDots = ({ currentSection, totalSections }) => {
  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col items-center">
      <div className="relative">
        {/* Vertical line connecting all dots */}
        <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gray-200 -translate-x-1/2 -z-10" />
        
        {/* Active line that grows based on current section */}
        <motion.div 
          className="absolute left-1/2 top-0 w-[2px] bg-black -translate-x-1/2 -z-10 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ 
            scaleY: currentSection / (totalSections - 1),
            transition: { duration: 0.5 }
          }}
          style={{ height: '100%' }}
        />

        {/* Dots container */}
        <div className="relative flex flex-col gap-8 py-4">
          {Array.from({ length: totalSections }).map((_, index) => (
            <motion.button
              key={index}
              className="relative group"
              onClick={() => {
                const element = document.getElementById(`section-${index}`);
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Inner dot */}
              <motion.div
                className={`absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  currentSection === index ? 'bg-black' : 'bg-gray-300'
                } transition-colors duration-300`}
              />

              {/* Label that appears on hover */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="whitespace-nowrap text-sm font-medium">
                  {index === 0 ? 'Home' :
                   index === 1 ? 'About Me' :
                   index === 2 ? 'Projects' :
                   index === 3 ? 'Let\'s Connect' :
                   'Contact'}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectedNavDots;