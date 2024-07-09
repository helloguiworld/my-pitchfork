// import { } from 'react'

import pitchforkLogoImg from '../../assets/pitchfork logo.svg'
import spotifyLogoImg from '../../assets/spotify logo.svg'

import './styles.scss'
export type FooterProps = {
}

export default function Footer(props: FooterProps) {
    return (
        <footer>
            <div className="credits">
                <a
                    href="https://pitchfork.com/"
                    target="_blank"
                >
                    <p className='small'>inspired by</p>
                    <img
                        src={pitchforkLogoImg}
                        alt="Pitchfork logo"
                        className="pitchfork-logo"
                    />
                </a>

                <a
                    href="https://developer.spotify.com/"
                    target="_blank"
                >
                    <p className='small'>data provided by</p>
                    <img
                        src={spotifyLogoImg}
                        alt="Spotify logo"
                        className="spotify-logo"
                    />
                </a>
            </div>

            <div className="main">
                <p className='small'>created by</p>
                <p className='large name'>Guilherme Feitosa</p>
                <a
                    href="mailto:feitosa.guilhermef@gmail.com"
                    target="_blank"
                >
                    feitosa.guilhermef@gmail.com
                </a>
                <a
                    className='small'
                    href="https://www.instagram.com/guilhermeffeitosa/"
                    target="_blank"
                >
                    @guilhermeffeitosa
                </a>
            </div>
        </footer>
    )
}
