import { RefObject, useEffect } from 'react'

export default function useResizeObserver(ref: RefObject<Element>, handler: Function) {
    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => { handler() })

        if (ref.current) resizeObserver.observe(ref.current)

        return () => { if (ref.current) resizeObserver.unobserve(ref.current) }
    }, [ref, ref.current])
}