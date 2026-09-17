export const pageVariants = {
    initial: { opacity: 0, y: '30px' },
    in: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
    out: {
        opacity: 0,
        scale: 1.05,
        transition: { duration: 0.5, ease: 'easeIn' },
    },
}

export const scrollSpring = { stiffness: 100, damping: 30, restDelta: 0.001 }
