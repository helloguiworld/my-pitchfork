import { MouseEventHandler, ReactNode } from 'react'

import Squares from "react-activity/dist/Squares"

import './styles.scss'
export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode | ReactNode[],
    small?: boolean,
    className?: string,
    type?: "button" | "submit" | "reset",
    color?: string,
    colorFilled?: boolean,
    biggerIcon?: boolean
    isOn?: boolean,
    inactive?: boolean,
    fetching?: boolean,
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className={
                'button'
                + (props.small ? ' small' : '')
                + (props.className ? ` ${props.className}` : '')
                + (props.isOn != undefined ? (props.isOn ? ' opacity-hover on' : ' opacity-hover') : '')
                + (props.colorFilled ? ' color-filled' : '')
                + (props.biggerIcon ? ' bigger-icon' : '')
                + (props.inactive ? ' inactive' : '')
                + (props.fetching ? ' fetching' : '')
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
