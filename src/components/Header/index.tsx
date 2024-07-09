import { useRef } from 'react'

import useResizeObserver from '../../hooks/useResizeObserver'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
export type HeaderProps = {
}

export default function Header(props: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null)
    
    const navigate = useNavigate()
    
    function setCSSHeaderHeightVariable() {
        if (headerRef.current) {
            const heightHeight = headerRef.current.offsetHeight
            document.body.style.setProperty('--header-height', `${heightHeight}px`)
            // console.log(`--header-height: ${heightHeight}px`)
        }
    }
    useResizeObserver(headerRef, setCSSHeaderHeightVariable)

    return (
        <header ref={headerRef}>
            <p className='title my-pitchfork' onClick={() => navigate('/')}>
                myPitchfork
            </p>
        </header>
    )
}
