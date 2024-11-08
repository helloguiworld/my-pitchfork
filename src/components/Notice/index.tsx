import { ReactElement } from 'react'

import './styles.scss'
export type NoticeProps = {
    className?: string,
    html2canvasIgnore?: boolean,
    ownSpace?: boolean,
    children: ReactElement<HTMLParagraphElement> | ReactElement<HTMLParagraphElement>[]
}

export default function Notice(props: NoticeProps) {
    return (
        <span
            className={
                'notice' +
                (props.className ? ` ${props.className}` : '') +
                (props.ownSpace ? ' spaced' : '')
            }
            data-html2canvas-ignore={props.html2canvasIgnore}
        >
            {props.children}
        </span>
    )
}
