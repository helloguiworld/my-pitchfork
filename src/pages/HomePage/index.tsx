import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

import Page from '../../components/Page'
import Feed from './Feed'
import WelcomeContent from './WelcomeContent'

import './styles.scss'
// export type HomePageProps = {
// }

export default function HomePage() {
    const authContext = useContext(AuthContext)

    return (
        <Page id='home-page' banners={['news']}>
            {
                authContext?.isAuth ?
                    <Feed />
                    :
                    <WelcomeContent/>
            }
        </Page>
    )
}
