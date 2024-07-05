import { MouseEventHandler, ReactNode } from 'react'

// import 

import './styles.scss'
export type CardProps = {
    children: ReactNode | ReactNode[],
    className?: string,
    onClick: MouseEventHandler,
}

export default function Card(props: CardProps) {
    return (
        <div
            className={'card' + (props.className ? ` ${props.className}` : '')}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    )
}
