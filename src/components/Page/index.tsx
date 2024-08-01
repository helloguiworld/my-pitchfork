import { ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthContext } from '../../contexts/AuthContext'

import { Squares } from 'react-activity'

import Header from '../Header'
import Footer from '../Footer'
import Banner from '../Banner'

import './styles.scss'
export type PageProps = {
    children: ReactNode | ReactNode[],
    id: string,
    // awaitLocalAuth?: boolean,
    dontAwaitLocalAuth?: boolean,
    hideHeader?: boolean,
    hideSearch?: boolean,
    hideAccess?: boolean,
    banners?: string[],
    hideBanners?: boolean,
    hideFooter?: boolean,
}

export default function Page(props: PageProps) {
    const authContext = useContext(AuthContext)
    
    const navigate = useNavigate()

    function getBanner(banner: string, key: number) {
        switch (banner) {
            // case 'news':
            //     return (
            //         <Banner color='#4e0aad' spaced key={key}>
            //             <p className='title'>🎉 Exciting news 🚀</p>
            //             <p>Very soon, you'll be able to create <strong>your own myPitchfork profile</strong>. 👤✨</p>
            //         </Banner>
            //     )
            case 'review-save':
                if (!authContext?.isAuth) return
                return (
                    <Banner color='#193caf' spaced key={key}>
                        <p className='title'>Don’t forget to save your reviews! 📝</p>
                        <p>They will be the foundation for your <strong>future features</strong>. ✨</p>
                    </Banner>
                )
            case '#mypitchfork':
                return (
                    <Banner color='#bd0995' spaced key={key}>
                        <p className='title'>Show off your music taste!</p>
                        <p>Share your reviews using <strong>#mypitchfork</strong>. 📸</p>
                    </Banner>
                )
            case 'social-media':
                return (
                    <Banner color='#445500' key={key}>
                        <p className='title'>We've just launched our social media profiles! 📱✨</p>
                        <p>Follow us on <a href="https://www.instagram.com/mypitchfork.fun" target="_blank">Instagram</a> and <a href="https://x.com/mypitchforkfun" target="_blank">X</a> for the latest updates, fun content, and more.</p>
                    </Banner>
                )
        }
    }

    const fixedBanners: JSX.Element[] = [
        (import.meta.env.VITE_MAINTENANCE_ALERT &&
            <Banner color='#d19404' spaced key={'maintenance'}>
                <p className='title'>🚧 MAINTENANCE NOTICE 🚧</p>
                <p>You might experience some instability due to upcoming <strong>upgrades</strong>. 👀</p>
            </Banner>
        ),
        ((import.meta.env.VITE_AUTH_BANNER && !authContext?.isAuth) &&
            <Banner color='var(--color-blue)' spaced key={'my'} onClick={() => {navigate('/my')}}>
                <p className='title'>🤩 Make myPitchfork Yours! 🤩</p>
                <p>Click here to have a myPitchfork account. 🎶✨</p>
            </Banner>
        ),
    ]

    return (
        <>
            {!props.hideHeader && <Header hideSearch={props.hideSearch} hideAccess={props.hideAccess} />}
            {
                (!props.hideBanners && (Boolean(props.banners?.length) || Boolean(fixedBanners.length))) &&
                <div className="page-banners" data-html2canvas-ignore>
                    {Boolean(fixedBanners.length) && fixedBanners}
                    {Boolean(props.banners?.length) && props.banners?.map((banner, index) => getBanner(banner, index))}
                </div>
            }

            {
                (!authContext?.hasCheckedLocalAuth) ?
                    <Squares className='spaced' />
                    :
                    <main className='page' id={props.id}>
                        {
                            props.children
                        }
                    </main>
            }

            {!props.hideFooter && <Footer />}
        </>
    )
}
