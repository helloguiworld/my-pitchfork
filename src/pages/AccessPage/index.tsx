// import {  } from 'react'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

import myPitchforkLinkLogoImg from '../../assets/mypitchfork link logo.png'

import './styles.scss'
export type AccessPageProps = {
    mode: string,
}

export default function AccessPage(props: AccessPageProps) {
    return (
        <>
            <div className='access-page'>
                <div className="form-box">
                    {/* Get mode form */}
                    {props.mode == 'login' && <LoginForm />}
                    {props.mode == 'register' && <RegisterForm />}

                </div>

                <div className="access-banner">
                    <img
                        src={myPitchforkLinkLogoImg}
                        alt="myPitchfork link logo"
                        className="mypitchfork-link-logo"
                    />
                </div>
            </div>
        </>
    )
}
