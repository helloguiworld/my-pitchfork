// import { } from 'react'

// import 

import './styles.scss'
export type BannerProps = {
}

export default function Banner(props: BannerProps) {
    return (
        <div className='banner'>
            <span className='strong'>We've just launched our social media profiles! 📱✨</span>
            <span>Follow us on <a href="https://www.instagram.com/mypitchfork.fun" target="_blank">Instagram</a> and <a href="https://x.com/mypitchforkfun" target="_blank">X</a> for the latest updates, fun content, and more.</span>
            <span>Share your reviews with <strong>#mypitchfork</strong> - show off your music taste and join the fun! 📸🔥</span>
            {/* <span>Stay tuned for updates, fun content, and more!</span> */}
            {/* <div className='line'>
                <a href="https://www.instagram.com/yourhandle" target="_blank">Follow us on Instagram</a>
                <a href="https://x.com/yourhandle" target="_blank">Follow us on X</a>
            </div> */}
        </div>
    )
}
