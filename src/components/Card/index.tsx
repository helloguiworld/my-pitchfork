import { MouseEventHandler, ReactNode } from 'react'

// import 

import './styles.scss'
export type CardProps = {
    children: ReactNode | ReactNode[],
    className?: string,
    color?: string,
    onClick: MouseEventHandler,
}

export default function Card(props: CardProps) {
    return (
        <div
            className={
                'card'
                + (props.className ? ` ${props.className}` : '')
                + (props.color ? ' colored' : '')
            }
            onClick={props.onClick}
            style={
                props.color ?
                    { '--color': props.color } as React.CSSProperties
                    : undefined
            }
        >
            {props.children}
        </div>
    )
}
