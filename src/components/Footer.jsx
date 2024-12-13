// File: src/components/Footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="brand-text py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Yousuf Shahzad. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;