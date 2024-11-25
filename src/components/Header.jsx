import React, { useState } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center">
                <a href="/" className="text-2xl brand-text header-title text-center md:text-left">YOUSUF.SH</a>
                
                {/* Original SVG Hamburger Menu */}
                <svg 
                    className={`ham hamRotate ham1 w-10 h-10 cursor-pointer ${isMenuOpen ? 'active' : ''}`} 
                    viewBox="0 0 100 100" 
                    width="80" 
                    onClick={toggleMenu}
                >
                    <path
                        className="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" 
                    />
                    <path
                        className="line middle"
                        d="m 30,50 h 40" 
                    />
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" 
                    />
                </svg>
            </header>

            {/* Side Menu */}
            <div 
                className={`fixed top-0 right-0 h-full -tracking-5 w-full md:w-2/5 bg-white shadow-lg transform transition-transform duration-500 ease-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } z-40 pt-20 md:pt-10`}
            >
                <nav className="px-6 pt-20 md:pt-10">
                    <ul className="space-y-4 md:space-y-8 md:mt-10">
                        <li className="flex justify-between items-center">
                            <p className='text-3xl md:text-4xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-left font-medium'>/01</p>
                            <a 
                                href="#home" 
                                className="text-6xl md:text-7xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-right"
                                onClick={toggleMenu}
                            >
                                Home
                            </a>
                        </li>
                        <li className="flex justify-between items-center">
                            <p className='text-3xl md:text-4xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-left font-medium'>/02</p>
                            <a 
                                href="#about" 
                                className="text-6xl md:text-7xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-right"
                                onClick={toggleMenu}
                            >
                                About
                            </a>
                        </li>
                        <li className="flex justify-between items-center">
                            <p className='text-3xl md:text-4xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-left font-medium'>/03</p>
                            <a 
                                href="projects" 
                                className="text-6xl md:text-7xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-right"
                                onClick={toggleMenu}
                            >
                                Projects
                            </a>
                        </li>
                        <li className="flex justify-between items-center">
                            <p className='text-3xl md:text-4xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-left font-medium'>/04</p>
                            <a 
                                href="#contact" 
                                className="text-6xl md:text-7xl hover:text-gray-600 transition-colors block py-2 md:py-4 text-right"
                                onClick={toggleMenu}
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    );
};

export default Header;