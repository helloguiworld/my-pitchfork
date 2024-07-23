import { MouseEventHandler, ReactNode } from 'react'

import Squares from "react-activity/dist/Squares"

import './styles.scss'
export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode | ReactNode[],
    className?: string,
    type?: "button" | "submit" | "reset",
    color?: string,
    isOn?: boolean,
    fetching?: boolean,
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className={
                'button' +
                (props.className ? ` ${props.className}` : '') +
                (props.isOn ? ' on' : '') +
                (props.fetching ? ' fetching' : '')
            }
            type={props.type || 'button'}
            onClick={props.onClick}
            style={{ '--color': props.color || '#000000' } as React.CSSProperties}
        >
            {
                typeof props.children == 'string' ?
                    <span>{props.children}</span>
                    : props.children
            }
            {props.fetching != undefined && <Squares />}
        </button>
    )
}
