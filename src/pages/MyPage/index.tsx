import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import { useNavigate } from 'react-router-dom'

import Page from '../../components/Page'
import MyHeader from './components/MyHeader'
import Button from '../../components/Button'

import './styles.scss'
// export type MyPageProps = {
// }

export default function MyPage() {
    const navigate = useNavigate()

    const authContext = useContext(AuthContext)

    return (
        <Page id='my-page'>
            {
                authContext?.isAuth ?
                    <>
                        <MyHeader account={authContext.authAccount} />

                        <div className="message">
                            <p className='title'>🚧 Coming Soon! 🚧</p>
                            <p>This will be your <strong>profile page</strong>.</p>
                            <p>Here you'll find your <strong>review history</strong>, <br /><strong>album rankings</strong>, <strong>favorites</strong>, and <strong>more</strong>!</p>
                            <p>💖🎶</p>
                            <p className='special'>Stay tuned for updates! 🌟</p>
                        </div>

                        <Button
                            className={'logout'}
                            color="var(--color-blue)"
                            onClick={() => {
                                navigate('/tutorials/account')
                            }}
                        >
                            <span>ACCOUNT TUTORIAL</span>
                        </Button>
                        <Button
                            className={'logout'}
                            color="#ff3530"
                            onClick={() => {
                                authContext.logout()
                                navigate('/')
                            }}
                        >
                            <span>LOGOUT</span>
                        </Button>
                    </>
                    :
                    <>
                        <div className="message">
                            <p className='title'>🚧 Coming Soon! 🚧</p>
                            <p>This will be your <strong>profile page</strong>.</p>
                            <p>Here you'll find your <strong>review history</strong>, <br /><strong>album rankings</strong>, <strong>favorites</strong>, and <strong>more</strong>!</p>
                            <p>💖🎶</p>
                            <p className='special'>Sign up now to be ready when it's live! 🌟</p>
                        </div>

                        <Button
                            className={'sign-up'}
                            color="#193caf"
                            onClick={() => {
                                navigate('/register')
                            }}
                        >
                            <span>SIGN UP</span>
                        </Button>
                    </>
            }
        </Page>
    )
}
