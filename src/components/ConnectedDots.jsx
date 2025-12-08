import React, { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { throttle } from 'lodash';

const SECTION_NAMES = ['Home', 'About Me', 'Projects', 'Blog', 'Contact'];

const ConnectedNavDots = ({ currentSection = 0, totalSections = 1, setCurrentSection }) => {
  useEffect(() => {
    const handleScroll = throttle(() => {
      const sections = document.querySelectorAll('[id^="section-"]');
      if (sections.length === 0) return;

      const active = Array.from(sections).reduce((max, section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        return visibleHeight > max.visibleHeight 
          ? { id: section.id, visibleHeight } 
          : max;
      }, { id: sections[0].id, visibleHeight: 0 });
      
      const newSection = parseInt(active.id.split('-')[1], 10);
      if (!isNaN(newSection) && newSection !== currentSection) {
        setCurrentSection?.(newSection);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      handleScroll.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, setCurrentSection]);

  const scrollToSection = useCallback((index) => {
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleKeyPress = useCallback((event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scrollToSection(index);
    }
  }, [scrollToSection]);

  return (
    <nav 
      className="fixed md:left-8 right-4 md:right-auto top-1/2 -translate-y-1/2 z-30"
      aria-label="Page sections"
    >
      <div 
        className="flex flex-col gap-4 md:gap-8 py-2 md:py-4 px-2 md:px-0 rounded-full bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none shadow-lg md:shadow-none"
        role="list"
      >
        {Array.from({ length: totalSections }, (_, index) => (
          <motion.button
            key={index}
            role="listitem"
            className="relative group outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-full"
            onClick={() => scrollToSection(index)}
            onKeyDown={(e) => handleKeyPress(e, index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Scroll to ${SECTION_NAMES[index]} section`}
            aria-current={currentSection === index}
          >
            <motion.div
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                currentSection === index ? 'bg-black' : 'bg-gray-300'
              }`}
            />
            <div 
              className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:block"
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

class NavDotsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('NavDots Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

const ConnectedNavDotsWithErrorBoundary = (props) => (
  <NavDotsErrorBoundary>
    <ConnectedNavDots {...props} />
  </NavDotsErrorBoundary>
);

export default ConnectedNavDotsWithErrorBoundary;