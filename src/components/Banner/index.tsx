import { ReactNode } from 'react'

// import 

import './styles.scss'
export type BannerProps = {
    children: ReactNode[],
    color?: string,
    spaced?: boolean,
    // html2canvasIgnore?: boolean,
}

export default function Banner(props: BannerProps) {
    return (
        <div
            className={
                'banner'
                + (props.spaced ? ' spaced' : '')
            }
            style={{
                '--banner-color': props.color || '#2b2b2b',
            } as React.CSSProperties}
        >
            {props.children}
        </div>
    )
}
