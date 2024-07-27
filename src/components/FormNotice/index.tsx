import { ReactNode } from 'react'

// import 

import './styles.scss'
export type FormNoticeProps = {
    children: ReactNode,
}

export default function FormNotice(props: FormNoticeProps) {
    return (
        <span className='form-notice'>
            {props.children}
        </span>
    )
}
