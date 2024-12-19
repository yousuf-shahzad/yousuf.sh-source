// File: src/components/Footer.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();
    
    const currentYear = new Date().getFullYear();
    
    const navigationLinks = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Projects', path: '/projects' },
        { label: 'Contact', path: '/contact' }
    ];
    
    const socialLinks = [
        { 
            icon: Github, 
            href: 'https://github.com/yousuf-shahzad',
            label: 'GitHub'
        },
        { 
            icon: Linkedin, 
            href: 'https://linkedin.com/in/yousuf-sh',
            label: 'LinkedIn'
        },
        { 
            icon: Mail, 
            href: 'mailto:contact@yousuf.sh',
            label: 'Email'
        }
    ];

    return (
        <footer className="brand-bg mt-auto py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Top Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-200">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold tracking-wide title">Y.SH</h3>
                        <p className="text-sm text-gray-600">
                            Computer Science Student & Aspiring Developer
                        </p>
                        <a 
                            href="https://github.com/yousuf-shahzad/yousuf.sh-source"
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-4 h-4 mr-2" />
                            View Source Code
                            <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 title">NAVIGATION</h4>
                        <nav className="grid grid-cols-2 gap-2">
                            {navigationLinks.map((link) => (
                                <button
                                    key={link.path}
                                    onClick={() => navigate(link.path)}
                                    className="text-gray-600 hover:text-gray-900 transition-colors text-sm text-left"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 title">CONNECT</h4>
                        <div className="flex flex-col space-y-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <link.icon className="w-4 h-4 mr-2" />
                                    {link.label}
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>&copy; {currentYear} Yousuf Shahzad. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">
                        Crafted with <span className="text-red-500">&hearts;</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;