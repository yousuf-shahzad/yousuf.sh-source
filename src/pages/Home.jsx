// File: src/pages/Home.jsx

import { React, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Cube from '../components/Cube'
import Loader from '../components/Loader'

// Page transition variants
const initVariant = {
    initial: {
        opacity: 0,
        y: '30px',
        // scale: 0.95,
    },
    in: {
        opacity: 1,
        // scale: 1,
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
}

const Home = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000) // Adjust the duration as needed

        return () => clearTimeout(timer)
    }, [])
    return (
        <>
            {loading && <Loader />}
            {!loading && (
                <div>
                    <div id='home-initial' className='h-screen'>
                        <motion.div
                            className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-24 pt-32 lg:pt-40"
                            initial="initial"
                            animate="in"
                            exit="out"
                            variants={initVariant}
                            id="js-scroll"
                        >
                            <div className="text-left max-w-lg">
                                <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title">
                                    YOUSUF
                                </h1>
                                <h1 className="text-7xl md:text-8xl lg:text-8xl leading-tight title">
                                    SHAHZAD
                                </h1>
                                <p className="mt-4 text-lg md:text-xl lg:text-xl text-gray-600">
                                    Aspiring developer based in London, UK.
                                </p>
                                <button className="group mt-6 px-6 py-3 bg-black text-white text-lg rounded hover:bg-gray-800 transition">
                                    Learn More{' '}
                                    <span className="ml-2 group-hover:ml-10 duration-700 ease-out">
                                        →
                                    </span>
                                </button>
                            </div>

                            <div className="hidden md:block mt-10 lg:mt-0 lg:ml-16 h-50 w-50 ">
                                <Cube />
                            </div>
                        </motion.div>
                        </div>
                        <div className="h-screen bg-black"></div>
                </div>
            )}
        </>
    )
}

export default Home
