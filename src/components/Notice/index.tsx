// import { } from 'react'

// import 

import './styles.scss'
type NoticeItem = {
    text: string,
    type?: 'strong',
}
export type NoticeProps = {
    items: (string | NoticeItem)[],
}

export default function Notice(props: NoticeProps) {
    return (
        <div className='notice'>
            {
                props.items.map((item: string | NoticeItem) =>
                    typeof item == 'string' ?
                        <span>{item}</span> :
                        <span className={item.type ? item.type : ''}>{item.text}</span>
                )
            }
        </div>
    )
}
