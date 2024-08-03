import { useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'
import useProfile from '../../hooks/useProfile'

import { Squares } from 'react-activity'

import Page from '../../components/Page'
import RegisterInvitation from './components/RegisterInvitation'
import Message from '../../components/Message'
import MyProfile from './components/MyProfile'

import './styles.scss'
// export type MyPageProps = {
// }
export type MyPageParams = {
    username?: string,
}

export default function MyPage() {
    const authContext = useContext(AuthContext)

    const { username } = useParams<MyPageParams>()

    const {
        profile,
        fetching,
        error,
    } = useProfile(username)

    return (
        <Page id='my-page' hideBanners>
            {
                username ?
                    fetching ?
                        <Squares />
                        :
                        profile ?
                            <MyProfile profile={profile} />
                            :
                            error?.response?.status == 400 ?
                                <Message title='User not found 🧐'>
                                    <p>There is no user with the username @<strong>{username}</strong>.<br />Please check and try again.</p>
                                </Message>
                                :
                                <Message title='Oops! Something went wrong 😅'>
                                    <p>We encountered an issue while trying to search the user profile. Please try again later.</p>
                                    <p>If the problem persists, <strong><a href="mailto:mypitchfork.fun@gmail.com">contact us</a></strong>.</p>
                                </Message>
                    :
                    (authContext?.isAuth && authContext.authAccount) ?
                        <Navigate to={`/my/${authContext.authAccount?.user.username}`} replace />
                        :
                        <RegisterInvitation />
            }
        </Page>
    )
}
