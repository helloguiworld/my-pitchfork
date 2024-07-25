// import { } from 'react'

import Notice from '..'

import './styles.scss'
export type WarningProps = {
    ownSpace?: boolean,
}

export default function UpdatesNotice(props: WarningProps) {
    return (
        <Notice
            html2canvasIgnore
            ownSpace={props.ownSpace}
            className={'updates-notice'}
            items={[
                {
                    // text: "🎉 Exciting news: We’re upgrading your experience on myPitchfork! 🚀",
                    text: "🎉 Exciting news 🚀",
                    type: 'strong'
                },
                "Very soon, you'll be able to create your own myPitchfork profile 👤✨",
                // "Don’t miss out – follow us on social media and be the first to get the scoop! 📲👀",
            ]}
        />
    )
}
