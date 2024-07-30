import { ReactNode, useContext } from 'react'

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
    banners?: string[],
    hideBanners?: boolean,
    hideFooter?: boolean,
}

export default function Page(props: PageProps) {
    const authContext = useContext(AuthContext)

    function getBanner(banner: string, key: number) {
        switch (banner) {
            case 'news':
                return (
                    <Banner color='#4e0aad' spaced key={key}>
                        <p className='title'>🎉 Exciting news 🚀</p>
                        <p>Very soon, you'll be able to create <strong>your own myPitchfork profile</strong> 👤✨</p>
                    </Banner>
                )
            case 'review-save':
                if (!authContext?.isAuth) return
                return (
                    <Banner color='#193caf' spaced key={key}>
                        <p className='title'>Don’t forget to save your reviews! 📝</p>
                        <p>They will be the foundation for your <strong>future features</strong> ✨</p>
                    </Banner>
                )
            case '#mypitchfork':
                return (
                    <Banner color='#bd0995' spaced key={key}>
                        <p className='title'>Show off your music taste!</p>
                        <p>Share your reviews on social media using <strong>#mypitchfork</strong> 📸</p>
                    </Banner>
                )
            case 'social-media':
                return (
                    <Banner color='#445500' key={key}>
                        <p className='title'>We've just launched our social media profiles! 📱✨</p>
                        <p>Follow us on <a href="https://www.instagram.com/mypitchfork.fun" target="_blank">Instagram</a> and <a href="https://x.com/mypitchforkfun" target="_blank">X</a> for the latest updates, fun content, and more</p>
                    </Banner>
                )
        }
    }

    const fixedBanners: JSX.Element[] = [
        <Banner color='#d19404' spaced key={0}>
            <p className='title'>🚧 Maintenance Alert 🚧</p>
            <p>You might experience some instability soon due to upcoming <strong>upgrades</strong> 👀</p>
        </Banner>
    ]

    return (
        <>
            {!props.hideHeader && <Header />}
            {
                (!props.hideBanners && (Boolean(props.banners?.length) || Boolean(fixedBanners.length))) &&
                <div className="page-banners" data-html2canvas-ignore>
                    {Boolean(fixedBanners.length) && fixedBanners}
                    {
                        import.meta.env.VITE_MAINTANCE &&
                        <Banner color='#d19404' spaced>
                            <p className='title'>🚧 Maintenance Alert 🚧</p>
                            <p>You might experience some instability soon due to an upcoming <strong>upgrade</strong> 👀</p>
                        </Banner>
                    }
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
