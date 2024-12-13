// File: src/components/Header.jsx

import React, { useState, useEffect } from 'react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)

            // Close menu on larger screens
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Prevent scrolling and interaction when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
        } else {
            document.body.style.overflow = 'auto'
            document.body.style.position = 'static'
            document.body.style.width = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
            document.body.style.position = 'static'
            document.body.style.width = 'auto'
        }
    }, [isMenuOpen])

    return (
        <div className="p-10">
            <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center brand-bg/90">
                <a
                    href="/"
                    className={`text-xl sm:text-2xl brand-text header-title tracking-3 -skew-x-3 hover:-skew-x-12 transition ease-in-out duration-200
        ${isMenuOpen ? 'sm:opacity-100 opacity-0' : 'opacity-100'}`}
                >
                    Y.SH
                </a>
                <svg
                    className={`ham hamRotate ham1 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer ${
                        isMenuOpen ? 'active' : ''
                    }`}
                    viewBox="0 0 100 100"
                    width="80"
                    onClick={toggleMenu}
                >
                    <path
                        className="line top"
                        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
                    />
                    <path className="line middle" d="m 30,50 h 40" />
                    <path
                        className="line bottom"
                        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
                    />
                </svg>
            </header>

            {/* Side Menu */}
            <div
                className={`side-menu fixed top-0 right-0 h-full w-full -tracking-5 sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white shadow-lg transform transition-transform duration-500 ease-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } z-40 flex items-center justify-center`}
            >
                <nav className="w-full px-4 sm:px-6">
                    <ul className="space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12">
                        {[
                            { number: '01', label: 'Home', href: '/' },
                            { number: '02', label: 'About', href: '/about' },
                            {
                                number: '03',
                                label: 'Projects',
                                href: '/projects',
                            },
                            {
                                number: '04',
                                label: 'Contact',
                                href: '/contact',
                            },
                        ].map((item, index) => (
                            <li
                                key={item.number}
                                className="flex justify-between items-center group"
                            >
                                <p
                                    className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl text-left font-medium 
                                    opacity-50 
                                    group-hover:brand-text 
                                    group-hover:opacity-100 
                                    transition-all duration-300"
                                >
                                    /{item.number}
                                </p>
                                <a
                                    href={item.href}
                                    className="text-5xl xs:text-6xl sm:text-8xl md:text-7xl lg:text-8xl 
                                        transition-all duration-300 
                                        hover:transform hover:-skew-x-6 
                                        hover:text-gray-700 
                                        hover:tracking-wide 
                                        block py-2 xs:py-3 md:py-4
                                        text-right"
                                    onClick={toggleMenu}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div
                    className="menu-overlay fixed inset-0 bg-black opacity-50 z-30"
                    onClick={toggleMenu}
                ></div>
            )}
        </div>
    )
}

export default Header
