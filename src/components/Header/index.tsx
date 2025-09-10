import { useRef, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import useResizeObserver from '../../hooks/useResizeObserver'
import { useNavigate, useLocation } from 'react-router-dom'

import myPitchforkLinkLogoImg from '../../assets/mypitchfork link logo.png'
import { MdOutlineSearch } from "react-icons/md"
import { FaCircleUser } from "react-icons/fa6"

import './styles.scss'
export type HeaderProps = {
    hideSearch?: boolean,
    hideAccess?: boolean,
}

export default function Header(props: HeaderProps) {
    const headerRef = useRef<HTMLElement>(null)

    const navigate = useNavigate()
    const location = useLocation()

    const authContext = useContext(AuthContext)

    function setCSSHeaderHeightVariable() {
        if (headerRef.current) {
            const heightHeight = headerRef.current.offsetHeight
            document.body.style.setProperty('--header-height', `${heightHeight}px`)
        }
    }
    useResizeObserver(headerRef, setCSSHeaderHeightVariable)

    return (
        <header ref={headerRef} className='page-header'>
            <div className="space" data-html2canvas-ignore>
                {
                    !props.hideSearch &&
                    <div
                        className='navigation'
                        onClick={() => { navigate('/search') }}
                        data-html2canvas-ignore={true}
                    >
                        <MdOutlineSearch />
                    </div>
                }
            </div>

            <div className='logo'>
                <img
                    src={myPitchforkLinkLogoImg}
                    alt="myPitchfork link logo"
                    className="mypitchfork-link-logo"
                    onClick={() => {
                        if (location.pathname == '/')
                            navigate('/search')
                        else
                            navigate('/')
                    }}
                />
            </div>

            <div className="space" data-html2canvas-ignore>
                {
                    !props.hideAccess &&
                    <div
                        className='auth'
                        onClick={() => {
                            if (authContext?.isAuth) {
                                if (location.pathname != '/my' && location.pathname != `/my/${authContext?.authAccount?.user.username}`)
                                    navigate('/my')
                            } else navigate('/login')
                        }}
                    >
                        {
                            authContext?.hasCheckedLocalAuth &&
                            <span>
                                {authContext?.authAccount ? authContext.authAccount.user.username : "login"}
                            </span>
                        }
                        <FaCircleUser />
                    </div>
                }
            </div>
        </header >
    )
}
