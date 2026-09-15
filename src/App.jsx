import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import { ReactLenis } from 'lenis/react'
import { Analytics } from "@vercel/analytics/react"

const AnimatedCursor = lazy(() => import('react-animated-cursor'))

function App() {
    const [showCustomCursor, setShowCustomCursor] = useState(false)
    const lenisOptions = {
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 2,
        infinite: false,
        syncTouch: true,
        normalizeScroll: true
    }

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
        setShowCustomCursor(!('ontouchstart' in window) && !prefersReducedMotion.matches)
    }, [])

    return (
        <Router>
            <ReactLenis root options={lenisOptions}>
                <div className="min-h-screen flex flex-col bg-brand-bg text-brand-text">
                    <Header />
                    {showCustomCursor && (
                        <Suspense fallback={null}>
                            <AnimatedCursor
                                innerSize={8}
                                outerSize={35}
                                innerScale={1}
                                outerScale={1.5}
                                outerAlpha={0.1}
                                hasBlendMode={true}
                                innerStyle={{
                                    backgroundColor: 'white',
                                    mixBlendMode: 'difference',
                                    zIndex: 9999,
                                }}
                                outerStyle={{
                                    border: '3px solid white',
                                    mixBlendMode: 'difference',
                                    zIndex: 9999,
                                }}
                                clickables={['button', 'a', 'input', '.ham', 'canvas', '.dot']}
                            />
                        </Suspense>
                    )}
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <AnimatedRoutes />
                    </main>
                    <Footer />
                </div>
            </ReactLenis>
            <Analytics />
        </Router>
    )
}

export default App
