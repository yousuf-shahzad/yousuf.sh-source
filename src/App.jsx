import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedRoutes from './components/AnimatedRoutes'
import AnimatedCursor from 'react-animated-cursor'

function App() {
    return (
        <Router>
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
                    clickables={['button', 'a', 'input', '.ham']}
                />
                <main className="flex-grow container mx-auto px-4 py-8">
                    <AnimatedRoutes />
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
