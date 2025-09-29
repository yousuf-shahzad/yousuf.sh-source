// File: src/components/Header.jsx
import React, { useState, useEffect } from 'react'
import { useLenis } from 'lenis/react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [timeDisplay, setTimeDisplay] = useState('')
    const lenis = useLenis()
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true })
        }
        toggleMenu()
        navigate(path)
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
            if (window.innerWidth >= 768) setIsMenuOpen(false)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Update time and timezone
    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const londonFormatter = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/London',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })

            const timeParts = londonFormatter.formatToParts(now)
            const hour = timeParts.find(part => part.type === 'hour').value
            const minute = timeParts.find(part => part.type === 'minute').value

            const timeZoneName = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/London',
                timeZoneName: 'shortOffset',
            })
                .formatToParts(now)
                .find(part => part.type === 'timeZoneName').value

            setTimeDisplay(`${hour}:${minute} ${timeZoneName}`)
        }

        updateTime()
        const timer = setInterval(updateTime, 1000)
        return () => clearInterval(timer)
    }, [])

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (lenis) isMenuOpen ? lenis.stop() : lenis.start()
    }, [isMenuOpen, lenis])

    return (
        <div className="p-6">
            <header className="fixed top-0 left-0 right-0 z-50 py-2 px-4 flex justify-between items-end brand-bg/90">
                <div className={`nav-blur ${isMenuOpen ? 'lg:w-[calc(100%-40vw)]' : 'lg:w-full'} w-full`}>
                    <div></div><div></div><div></div><div></div>
                </div>
                <div className="relative z-40 flex w-full justify-between items-end pb-2">
                    <button
                        className={`text-lg sm:text-xl brand-text header-title tracking-3 -skew-x-3 hover:-skew-x-12 transition ease-in-out duration-200 ${isMenuOpen ? 'sm:opacity-100 opacity-0' : 'opacity-100'}`}
                        onClick={() => navigate('/')}
                    >
                        Y.SH
                    </button>
                    <div className="flex items-center">
                        <p className="hidden lg:block text-xs mr-3 text-brand-accent">
                            London, EN • {timeDisplay}
                        </p>
                        <svg
                        className={`ham hamRotate ham1 w-6 h-6 sm:w-8 sm:h-8 cursor-pointer ${
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
                    </div>
                </div>
            </header>

            {/* Side Menu */}
            <div
                className={`side-menu fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white shadow-lg transform transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} z-40 flex items-center justify-center`}
            >
                <nav className="w-full px-4 sm:px-6 -tracking-5">
                    <ul className="space-y-4 xs:space-y-6 sm:space-y-8">
                        {[
                            { number: '01', label: 'Home', href: '/' },
                            { number: '02', label: 'About', href: '/about' },
                            { number: '03', label: 'Projects', href: '/projects' },
                            { number: '04', label: 'Blog', href: '/blog' },
                            { number: '05', label: 'Contact', href: '/contact' },
                        ].map(item => (
                            <li key={item.number} className="flex justify-between items-center group">
                                <p className="text-xl xs:text-2xl sm:text-3xl font-medium opacity-50 group-hover:brand-text group-hover:opacity-100 transition-all duration-300">
                                    /{item.number}
                                </p>
                                <button
                                    className="text-4xl xs:text-5xl sm:text-6xl transition-all duration-300 hover:transform hover:-skew-x-6 hover:text-gray-700 hover:tracking-wide py-2 md:py-3 text-right"
                                    onClick={() => {
                                        toggleMenu()
                                        handleNavigation(item.href)
                                    }}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            {/* Overlay */}
            {isMenuOpen && (
                <div className="menu-overlay fixed inset-0 bg-black opacity-50 z-30" onClick={toggleMenu}></div>
            )}
        </div>
    )
}

export default Header