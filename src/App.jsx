import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import AnimatedCursor from 'react-animated-cursor'
import { ReactLenis, useLenis } from 'lenis/react'

function App() {
    const lenis = useLenis(({ scroll }) => {
        // called every scroll
      })

    return (
        
        <Router>

            <ReactLenis root>
            <div
                className={`min-h-screen flex flex-col bg-brand-bg text-brand-text`}
            >
                <Header />
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
                    }}
                    outerStyle={{
                        border: '3px solid white',
                        mixBlendMode: 'difference',
                    }}
                    clickables={['button', 'a', 'input', '.ham', 'canvas', '.dot']}
                />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <AnimatedRoutes />
                </main>
                <Footer />
            </div>
            </ReactLenis>
        </Router>
    )
}

export default App
