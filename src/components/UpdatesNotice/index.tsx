// import { } from 'react'

import Notice from '../Notice'

import './styles.scss'
export type WarningProps = {
    ownSpace?: boolean,
}

export default function UpdatesNotice(props: WarningProps) {
    return (
        <Notice
            html2canvasIgnore
            className={'updates-notice' + (props.ownSpace ? ' spaced' : '')}
            items={[
                {
                    text: "🎉 Exciting news: We’re upgrading your experience on myPitchfork! 🚀",
                    type: 'strong'
                },
                "Very soon, you'll be able to create your own personalized profile. 👤✨",
                // "Don’t miss out – follow us on social media and be the first to get the scoop! 📲👀",
            ]}
        />
    )
}