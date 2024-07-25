// import { } from 'react'

import Notice from '..'

import './styles.scss'

export default function SearchNotice() {
    return (
        <Notice
            html2canvasIgnore
            className={'search-notice'}
            items={[
                {
                    text: "Can't find a new release? 🔍",
                    type: 'strong'
                },
                "It might take a few hours for new albums to show up. Try again soon! ⏳😉",
            ]}
        />
    )
}
