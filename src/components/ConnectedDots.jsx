import React, { useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';

const ConnectedNavDots = ({ currentSection, totalSections }) => {
  const { scrollY } = useScroll();
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = [...document.querySelectorAll('[id^="section-"]')];
      
      // Get the section that's currently most visible in the viewport
      const active = sections.map(section => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        return {
          id: section.id,
          visibleHeight: visibleHeight > 0 ? visibleHeight : 0
        };
      }).reduce((max, section) => 
        section.visibleHeight > max.visibleHeight ? section : max
      );
      
      // Update the active section based on scroll position
      const newSection = parseInt(active.id.split('-')[1]);
      if (newSection !== currentSection) {
        // Call the parent component's update function if provided
        if (typeof setCurrentSection === 'function') {
          setCurrentSection(newSection);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col items-center">
      {/* Dots container */}
      <div className="flex flex-col gap-8 py-4">
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
            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSection === index ? 'bg-black' : 'bg-gray-300'
              }`}
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
  );
};

export default ConnectedNavDots;