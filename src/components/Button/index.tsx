import { MouseEventHandler, ReactNode } from 'react'

import './styles.scss'
export type ButtonProps = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode | ReactNode[],
    className?: string,
    type?: "button" | "submit" | "reset",
    color?: string,
    isOn?: boolean,
}

export default function Button(props: ButtonProps) {
    return (
        <button
            className={
                'button' +
                (props.className ? ` ${props.className}` : "") +
                (props.isOn ? ` on` : "")
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
        </button>
    )
}
