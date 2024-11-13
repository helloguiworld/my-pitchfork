import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { useNavigate, Navigate } from 'react-router-dom'

import { Squares } from 'react-activity'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import ForgotPasswordForm from './components/ForgotPasswordForm'
import PasswordResetForm from './components/PasswordResetForm'

import myPitchforkLinkLogoImgWhite from '../../assets/mypitchfork link logo.png'
import myPitchforkLinkLogoImgBlack from '../../assets/mypitchfork link logo black.png'
import { MdOutlineSearch } from "react-icons/md"

import './styles.scss'
export type AccessPageProps = {
    mode: string,
}

export default function AccessPage(props: AccessPageProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    function getForm(mode: string) {
        switch (mode) {
            case 'register':
                return <RegisterForm />
            case 'forgot-password':
                return <ForgotPasswordForm />
            case 'password-reset':
                return <PasswordResetForm />
            default:
                return <LoginForm />
        }
    }

    return (
        <div className='access-page'>
            {
                !authContext?.hasCheckedLocalAuth ?
                    <Squares />
                    : authContext?.isAuth ?
                        <Navigate to="/my" replace />
                        :
                        <>
                            <main className="content">
                                <div className="header">
                                    <button
                                        className='clean navigation'
                                        onClick={() => { navigate('/search') }}
                                    >
                                        <MdOutlineSearch />
                                    </button>

                                    <img
                                        src={myPitchforkLinkLogoImgBlack}
                                        alt="myPitchfork link logo"
                                        className="mypitchfork-link-logo"
                                        onClick={() => { navigate('/') }}
                                    />
                                </div>

                                <div className="access-box">
                                    {getForm(props.mode)}
                                </div>
                            </main>

                            <div className="access-banner">
                                <img
                                    src={myPitchforkLinkLogoImgWhite}
                                    alt="myPitchfork link logo"
                                    className="mypitchfork-link-logo"
                                />
                            </div>
                        </>
            }
        </div>
    )
}
