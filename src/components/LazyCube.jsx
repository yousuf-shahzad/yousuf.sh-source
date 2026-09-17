import { lazy, Suspense, useEffect, useState } from 'react'
import useMediaQuery from '../hooks/useMediaQuery'

const Cube = lazy(() => import('./Cube'))

export default function LazyCube() {
    const canRender = useMediaQuery(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)'
    )
    const [shouldLoad, setShouldLoad] = useState(false)

    useEffect(() => {
        if (!canRender) {
            setShouldLoad(false)
            return undefined
        }
        const load = () => setShouldLoad(true)
        const idleCallback = window.requestIdleCallback?.(load, {
            timeout: 1500,
        })
        const timeout = idleCallback ? undefined : window.setTimeout(load, 600)

        return () => {
            if (idleCallback) window.cancelIdleCallback?.(idleCallback)
            if (timeout) window.clearTimeout(timeout)
        }
    }, [canRender])

    if (!canRender || !shouldLoad)
        return <div className="cube-fallback" aria-hidden="true" />

    return (
        <Suspense
            fallback={<div className="cube-fallback" aria-hidden="true" />}
        >
            <Cube />
        </Suspense>
    )
}
