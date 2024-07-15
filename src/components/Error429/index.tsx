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
                "WE ARE WORKING TO ENSURE IT DOESN'T HAPPEN IN THE FUTURE!",
                "PLEASE TRY AGAIN LATER",
            ]}
        />
    )
}
