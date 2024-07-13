import { useRef } from 'react'

import useResizeObserver from '../../hooks/useResizeObserver'
import { useNavigate } from 'react-router-dom'

import myPitchforkLinkLogoImg from '../../assets/mypitchfork link logo.svg'

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
                <img
                    src={myPitchforkLinkLogoImg}
                    alt="myPitchfork link logo"
                    className="mypitchfork-link-logo"
                    onClick={() => navigate('/')}
                />
        </header>
    )
}
