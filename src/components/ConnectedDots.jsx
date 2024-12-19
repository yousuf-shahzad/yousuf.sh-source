// File: src/components/ConnectedDots.jsx
import React, { useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { throttle } from 'lodash';

// Configuration object for section names
const SECTION_NAMES = {
  0: 'Home',
  1: 'About Me',
  2: 'Projects',
  3: "Let's Connect"
};

const ConnectedNavDots = ({ currentSection = 0, totalSections = 1, setCurrentSection }) => {
  const { scrollY } = useScroll();

  useEffect(() => {
    // Throttled scroll handler to improve performance
    const handleScroll = throttle(() => {
      const sections = [...document.querySelectorAll('[id^="section-"]')];
      
      if (sections.length === 0) return;

      // Get the section that's currently most visible in the viewport
      const active = sections.reduce((max, section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        return visibleHeight > max.visibleHeight 
          ? { id: section.id, visibleHeight } 
          : max;
      }, { id: sections[0].id, visibleHeight: 0 });
      
      // Update the active section based on scroll position
      const newSection = parseInt(active.id.split('-')[1]);
      if (newSection !== currentSection && !isNaN(newSection)) {
        setCurrentSection?.(newSection);
      }
    }, 100);

    // Add scroll event listener with cleanup
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      handleScroll.cancel(); // Clean up throttled function
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, setCurrentSection]);

  // Handle keyboard navigation
  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const element = document.getElementById(`section-${index}`);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30 flex flex-col items-center"
      aria-label="Page sections"
    >
      <div className="flex flex-col gap-8 py-4" role="list">
        {Array.from({ length: totalSections }).map((_, index) => (
          <motion.button
            key={index}
            role="listitem"
            className="relative group outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full"
            onClick={() => {
              const element = document.getElementById(`section-${index}`);
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            onKeyDown={(e) => handleKeyPress(e, index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${SECTION_NAMES[index]} section`}
            aria-current={currentSection === index ? 'true' : 'false'}
          >
            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSection === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />

            {/* Label that appears on hover */}
            <div 
              className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-hidden="true"
            >
              <span className="whitespace-nowrap text-sm font-medium">
                {SECTION_NAMES[index]}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </nav>
  );
};

// Error boundary component
class NavDotsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('NavDots Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null; // Gracefully hide navigation on error
    }

    return this.props.children;
  }
}

// Wrap the component with error boundary
const ConnectedNavDotsWithErrorBoundary = (props) => (
  <NavDotsErrorBoundary>
    <ConnectedNavDots {...props} />
  </NavDotsErrorBoundary>
);

export default ConnectedNavDotsWithErrorBoundary;