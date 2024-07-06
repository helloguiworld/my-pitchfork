import { MouseEventHandler, ReactNode } from 'react'

import './styles.scss'
export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode | ReactNode[],
    className?: string,
    type?: "button" | "submit" | "reset",
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className={'button' + (props.className ? ` ${props.className}` : "")}
            type={props.type || 'button'}
            onClick={props.onClick}
        >
            {
                typeof props.children == 'string' ?
                    <span>{props.children}</span>
                    : props.children
            }
        </button>
    )
}
