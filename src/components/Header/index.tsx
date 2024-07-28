import { useRef } from 'react'

// import { AuthContext } from '../../contexts/AuthContext'

import useResizeObserver from '../../hooks/useResizeObserver'
import { useNavigate, useLocation } from 'react-router-dom'

import myPitchforkLinkLogoImg from '../../assets/mypitchfork link logo.png'
import { MdOutlineArrowBackIosNew, MdOutlineSearch } from "react-icons/md"

import './styles.scss'
// export type HeaderProps = {
// }

export default function Header() {
    const headerRef = useRef<HTMLElement>(null)

    const navigate = useNavigate()
    const location = useLocation()

    // const authContext = useContext(AuthContext)

    function setCSSHeaderHeightVariable() {
        if (headerRef.current) {
            const heightHeight = headerRef.current.offsetHeight
            document.body.style.setProperty('--header-height', `${heightHeight}px`)
        }
    }
    useResizeObserver(headerRef, setCSSHeaderHeightVariable)

    function navigationMode() {
        if (location.pathname == '/' || location.pathname == '/search' || location.pathname.startsWith('/review/'))
            return 'search'
        else
            'back'
    }

    return (
        <header ref={headerRef} className='page-header'>
            <div className="space" data-html2canvas-ignore={true}>
                <div
                    className='navigation'
                    onClick={() => {
                        if (navigationMode() == 'search')
                            navigate('/search')
                        else
                            navigate(-1)
                    }}
                    data-html2canvas-ignore={true}
                >
                    {
                        navigationMode() == 'search' ?
                            <MdOutlineSearch /> :
                            <MdOutlineArrowBackIosNew />
                    }
                </div>
            </div>

            <div className='logo'>
                <img
                    src={myPitchforkLinkLogoImg}
                    alt="myPitchfork link logo"
                    className="mypitchfork-link-logo"
                    onClick={() => { navigate('/') }}
                />
            </div>

            <div className="space" data-html2canvas-ignore={true}>
                {/* {
                    authContext?.hasCheckedLocalAuthData &&
                    <div
                        className='auth'
                        onClick={() => {
                            if (authContext?.isAuth)
                                navigate('/my')
                            else
                                navigate('/login')
                        }}
                    >
                        <span>
                            {authContext?.isAuth ? authContext.authAccount.user.username : "login"}
                        </span>
                        <FaCircleUser />
                    </div>
                } */}
            </div>
        </header >
    )
}
