// import { } from 'react'

import Notice from "../Notice"

// import './styles.scss'
// export type Error429Props = {
// }

export default function Error429() {
    return (
        <Notice>
            <p className="title">THE SITE HAS EXCEEDED ITS RATE LIMITS FOR SPOTIFY API</p>
            <p>We're working to prevent this from happening in the future!</p>
            <p>Please try again later ⏳</p>
        </Notice>
    )
}
