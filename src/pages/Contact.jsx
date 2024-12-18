import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Animation variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: '30px',
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
  out: {
    opacity: 0,
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Contact = () => {
  const { scrollYProgress } = useScroll();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Smooth spring animation for scroll progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <motion.div
      className="relative min-h-screen"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Hero Section */}
      <div className="px-8 lg:px-24 pt-32 lg:pt-40 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title mb-6">
            GET IN TOUCH
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl">
            Let's collaborate on something amazing. Whether you have a project in mind
            or just want to say hello, I'd love to hear from you.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="px-8 lg:px-24 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="text-gray-600 mb-8">
                  Feel free to reach out through any of these channels:
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href="mailto:contact@yousuf.sh"
                  className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">@</span>
                  <span>contact@yousuf.sh</span>
                </a>

                <a
                  href="https://github.com/yousuf-shahzad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">G</span>
                  <span>github.com/yousuf-shahzad</span>
                </a>

                <a
                  href="https://linkedin.com/in/yousuf-sh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 text-lg hover:text-gray-600 transition-colors"
                >
                  <span className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-full">in</span>
                  <span>linkedin.com/in/yousuf-sh</span>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              variants={formVariants}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-shadow"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`group w-full px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition flex items-center justify-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message
                    <span className="ml-2 group-hover:ml-6 duration-500 ease-out">→</span>
                  </>
                )}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 text-center"
                >
                  Message sent successfully!
                </motion.p>
              )}

              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 text-center"
                >
                  There was an error sending your message. Please try again.
                </motion.p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;