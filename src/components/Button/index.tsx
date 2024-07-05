import { MouseEventHandler, ReactNode } from 'react'

import './styles.scss'
export type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode | ReactNode[],
}

export default function Button(props: ButtonProps) {
    return (
        <button className='button' type='button' onClick={props.onClick}>
            {
                typeof props.children == 'string' ?
                <span>{props.children}</span>
                : props.children
            }
        </button>
    )
}
