import { useEffect, useState } from 'react'

export default function useActiveSection(sectionIds) {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const update = () => {
            const viewportMiddle = window.innerHeight / 2
            const closest = sectionIds.reduce(
                (best, id, index) => {
                    const element = document.getElementById(id)
                    if (!element) return best
                    const rect = element.getBoundingClientRect()
                    const containsMiddle =
                        rect.top <= viewportMiddle &&
                        rect.bottom >= viewportMiddle
                    const distance = containsMiddle
                        ? 0
                        : Math.min(
                              Math.abs(rect.top - viewportMiddle),
                              Math.abs(rect.bottom - viewportMiddle)
                          )
                    return distance < best.distance ? { index, distance } : best
                },
                { index: 0, distance: Number.POSITIVE_INFINITY }
            )
            setActiveIndex(closest.index)
        }

        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', update)
        return () => {
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', update)
        }
    }, [sectionIds])

    return activeIndex
}
