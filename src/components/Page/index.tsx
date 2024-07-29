import { ReactNode } from 'react'

import Header from '../Header'
import Footer from '../Footer'
import Banner from '../Banner'

import './styles.scss'
export type PageProps = {
    children: ReactNode | ReactNode[],
    id: string,
    hideHeader?: boolean,
    hideBanners?: boolean | string[],
}

export default function Page(props: PageProps) {
    return (
        <>
            {!props.hideHeader && <Header />}
            {
                !props.hideBanners &&
                <div className="page-banners" data-html2canvas-ignore>
                    <Banner color='#4e0aad' spaced>
                        <p className='title'>🎉 Exciting news 🚀</p>
                        <p>Very soon, you'll be able to create <strong>your own myPitchfork profile</strong> 👤✨</p>
                    </Banner>
                    <Banner color='#bd0995' spaced>
                        <p className='title'>Show off your music taste!</p>
                        <p>Share your reviews on social media using <strong>#mypitchfork</strong> 📸</p>
                    </Banner>
                    {/* <Banner color='#445500'>
                        <p className='title'>We've just launched our social media profiles! 📱✨</p>
                        <p>Follow us on <a href="https://www.instagram.com/mypitchfork.fun" target="_blank">Instagram</a> and <a href="https://x.com/mypitchforkfun" target="_blank">X</a> for the latest updates, fun content, and more.</p>
                        <p>Share your reviews with <strong>#mypitchfork</strong> - show off your music taste and join the fun! 📸🔥</p>
                    </Banner> */}
                </div>
            }
            <main className='page' id={props.id}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}
