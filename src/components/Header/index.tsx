import { useRef, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import './styles.scss'
export type HeaderProps = {
}

export default function Header(props: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null);

    const navigate = useNavigate()

    useEffect(() => {
        function setCSSHeaderHeightVariable() {
            if (headerRef.current) {
                const heightHeight = headerRef.current.offsetHeight
                document.body.style.setProperty('--header-height', `${heightHeight}px`)
            }
        }
        setCSSHeaderHeightVariable()
        document.addEventListener('click', setCSSHeaderHeightVariable)
        return () => {document.removeEventListener('click', setCSSHeaderHeightVariable)}
    }, [])

    return (
        <header ref={headerRef}>
            <p className='title my-pitchfork' onClick={() => navigate('/search')}>
                myPitchfork
            </p>
        </header>
    )
}
