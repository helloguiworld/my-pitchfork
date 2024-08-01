import { MouseEventHandler } from 'react'

import './styles.scss'
export type BannerProps = {
    children: JSX.Element | JSX.Element[]
    onClick?: MouseEventHandler
    color?: string
    spaced?: boolean
    // html2canvasIgnore?: boolean,
}

export default function Banner(props: BannerProps) {
    return (
        <div
            className={
                'banner'
                + (props.spaced ? ' spaced' : '')
                + (props.onClick ? ' clickable' : '')
            }
            style={{
                '--banner-color': props.color || '#2b2b2b',
            } as React.CSSProperties}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}
