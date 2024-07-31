import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
// import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'

import Page from '../../components/Page'
import MyHeader from './components/MyHeader'
import Button from '../../components/Button'

import './styles.scss'
// export type MyPageProps = {
// }
export type MyPageParams = {
    username?: string,
}

export default function MyPage() {
    const navigate = useNavigate()

    const authContext = useContext(AuthContext)

    // const { username } = useParams<MyPageParams>()

    return (
        <Page id='my-page'>
            {/* {username ? <span>{username}</span> : <span>NO USERNAME</span>} */}
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
                            colorFilled
                            onClick={() => {
                                navigate('/tutorials/account')
                            }}
                        >
                            <span>ACCOUNT TUTORIAL</span>
                        </Button>
                        <Button
                            className={'logout'}
                            color="var(--color-red)"
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
                            {/* <p className='special'>Sign up now to be ready when it's live! 🌟</p> */}
                        </div>

                        {/* <Button
                            className={'sign-up'}
                            color="var(--color-blue)"
                            colorFilled
                            onClick={() => {
                                navigate('/register')
                            }}
                        >
                            <span>SIGN UP</span>
                        </Button> */}
                    </>
            }
        </Page>
    )
}
