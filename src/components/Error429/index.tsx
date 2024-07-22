// import { } from 'react'

import Notice from "../Notice"

// import './styles.scss'
// export type Error429Props = {
// }

export default function Error429() {
    return (
        <Notice
            items={[
                {
                    text: "THE SITE HAS EXCEEDED ITS RATE LIMITS FOR SPOTIFY API",
                    type: 'strong'
                },
                "We're working to prevent this from happening in the future!",
                "Please try again later ⏳",
            ]}
        />
    )
}
