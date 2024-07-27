import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import myPitchforkLinkLogoImgWhite from '../../assets/mypitchfork link logo.png'
import myPitchforkLinkLogoImgBlack from '../../assets/mypitchfork link logo black.png'
import { MdOutlineArrowBackIosNew } from "react-icons/md"

import './styles.scss'
export type AccessPageProps = {
    mode: string,
}

export default function AccessPage(props: AccessPageProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    function getForm(mode: string) {
        // if (authContext?.isAuth) return <Navigate to="/my" replace />
        if (authContext?.isAuth) return <LoginForm />
        switch (mode) {
            case 'register':
                return <RegisterForm />
            default:
                return <LoginForm />
        }
    }

    return (
        <div className='access-page'>
            <main className="content">

                <div className="header">
                    <button className='clean back' onClick={() => navigate(-1)}>
                        <MdOutlineArrowBackIosNew />
                    </button>

                    <img
                        src={myPitchforkLinkLogoImgBlack}
                        alt="myPitchfork link logo"
                        className="mypitchfork-link-logo"
                        onClick={() => { navigate('/') }}
                    />
                </div>

                <div className="form-box">
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
        </div>
    )
}
