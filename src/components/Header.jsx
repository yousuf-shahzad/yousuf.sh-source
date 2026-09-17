import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navigation } from '../data/siteData'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [timeDisplay, setTimeDisplay] = useState('')
    const menuRef = useRef(null)
    const toggleRef = useRef(null)
    const lenis = useLenis()
    const navigate = useNavigate()
    const closeMenu = () => setIsMenuOpen(false)

    useEffect(() => {
        const updateTime = () =>
            setTimeDisplay(
                new Intl.DateTimeFormat('en-GB', {
                    timeZone: 'Europe/London',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZoneName: 'shortOffset',
                }).format(new Date())
            )
        updateTime()
        const timer = setInterval(updateTime, 60000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (lenis) isMenuOpen ? lenis.stop() : lenis.start()
    }, [isMenuOpen, lenis])

    useEffect(() => {
        if (!isMenuOpen) return undefined
        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeMenu()
            if (event.key !== 'Tab') return
            const focusable = menuRef.current?.querySelectorAll(
                'a, button:not([disabled])'
            )
            if (!focusable?.length) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            }
            if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }
        document.addEventListener('keydown', onKeyDown)
        document.body.style.overflow = 'hidden'
        menuRef.current?.querySelector('a')?.focus()
        const trigger = toggleRef.current
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            document.body.style.overflow = ''
            trigger?.focus()
        }
    }, [isMenuOpen])

    const handleNavigation = (path) => {
        closeMenu()
        if (lenis) lenis.scrollTo(0, { immediate: true })
        navigate(path)
    }

    return (
        <div className="contents">
            <header className="fixed top-0 left-0 right-0 z-50 py-2 px-4 flex justify-between items-end">
                <div
                    className={`nav-blur w-full ${isMenuOpen ? 'nav-blur--hidden' : ''}`}
                >
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
                <div className="relative z-40 flex w-full justify-between items-end pb-2">
                    <Link
                        to="/"
                        className="text-lg sm:text-xl text-brand-text header-title tracking-3 -skew-x-3 hover:-skew-x-12 transition ease-in-out duration-200"
                    >
                        Y.SH
                    </Link>
                    <div className="flex items-center">
                        <p className="hidden lg:block text-xs mr-3 text-brand-accent">
                            London, EN • {timeDisplay}
                        </p>
                        <button
                            ref={toggleRef}
                            type="button"
                            className={`ham hamRotate ham1 w-8 h-8 ${isMenuOpen ? 'active' : ''}`}
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMenuOpen}
                            aria-controls="site-menu"
                            onClick={() => setIsMenuOpen((open) => !open)}
                        >
                            <svg viewBox="0 0 100 100" aria-hidden="true">
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
                        </button>
                    </div>
                </div>
            </header>
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            className="menu-overlay fixed inset-0 bg-black z-30"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            onClick={closeMenu}
                            aria-hidden="true"
                        />
                        <motion.aside
                            ref={menuRef}
                            id="site-menu"
                            className="side-menu fixed top-0 right-0 h-full w-full sm:w-4/5 md:w-3/5 lg:w-2/5 bg-white shadow-lg z-40 flex items-center justify-center"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{
                                duration: 0.55,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            <nav className="w-full px-4 sm:px-6 -tracking-5">
                                <ul className="space-y-4 sm:space-y-8">
                                    {navigation.map((item) => (
                                        <li
                                            key={item.number}
                                            className="flex justify-between items-center group"
                                        >
                                            <span className="text-xl sm:text-3xl font-medium opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                                                /{item.number}
                                            </span>
                                            <a
                                                href={item.href}
                                                className="text-4xl sm:text-6xl transition-all duration-300 hover:-skew-x-6 hover:text-gray-700 py-2 text-right"
                                                onClick={(event) => {
                                                    event.preventDefault()
                                                    handleNavigation(item.href)
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
