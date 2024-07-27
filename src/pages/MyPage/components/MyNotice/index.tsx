// import { } from 'react'

import Notice from '../../../../components/Notice'

import './styles.scss'
export type WarningProps = {
    ownSpace?: boolean,
}

export default function MyNotice(props: WarningProps) {
    return (
        <Notice
            html2canvasIgnore
            ownSpace={props.ownSpace}
            className={'my-notice'}
            items={[
                {
                    text: "🎉 Exciting news 🚀",
                    type: 'strong'
                },
                "Very soon, you'll be able to create your own myPitchfork profile 👤✨",
            ]}
        />
    )
}
