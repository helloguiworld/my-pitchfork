// import { } from 'react'

// import 

import './styles.scss'
type NoticeItem = {
    text: string,
    type?: 'strong',
}
export type NoticeProps = {
    items: (string | NoticeItem)[],
    className?: string,
    html2canvasIgnore?: boolean,
    ownSpace?: boolean,
}

export default function Notice(props: NoticeProps) {
    return (
        <div
            className={
                'notice' +
                (props.className ? ` ${props.className}` : '') +
                (props.ownSpace ? ' spaced' : '')
            }
            data-html2canvas-ignore={props.html2canvasIgnore}
        >
            {
                props.items.map((item: string | NoticeItem, index: number) =>
                    typeof item == 'string' ?
                        <span key={index}>{item}</span> :
                        <span key={index} className={item.type ? item.type : ''}>
                            {item.text}
                        </span>
                )
            }
        </div>
    )
}
