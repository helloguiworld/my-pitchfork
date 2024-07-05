// import { } from 'react'

import { useNavigate } from 'react-router-dom'

import './styles.scss'
export type HeaderProps = {
}

export default function Header(props: HeaderProps) {
    const navigate = useNavigate()

    return (
        <header>
            <p className='title my-pitchfork' onClick={() => navigate('/search')}>
                myPitchfork
            </p>
        </header>
    )
}
