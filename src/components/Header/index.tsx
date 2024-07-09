import { useRef } from 'react'

import useResizeObserver from '../../hooks/useResizeObserver'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
// export type HeaderProps = {
// }

export default function Header() {
    const headerRef = useRef<HTMLElement>(null)

    const navigate = useNavigate()

    function setCSSHeaderHeightVariable() {
        if (headerRef.current) {
            const heightHeight = headerRef.current.offsetHeight
            document.body.style.setProperty('--header-height', `${heightHeight}px`)
        }
    }
    useResizeObserver(headerRef, setCSSHeaderHeightVariable)

    return (
        <header ref={headerRef}>
            <div className='link-logo' onClick={() => navigate('/')}>
                <p className='title my-pitchfork'>
                    myPitchfork
                </p>
                <p className="link-complement">.fun</p>
            </div>
        </header>
    )
}
