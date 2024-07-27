// import { } from 'react'

// import 

import { Account } from '../../../../services/accessServices'

import './styles.scss'
export type MyHeaderProps = {
    account: Account
}

export default function MyHeader(props: MyHeaderProps) {
    return (
        <div className='my-header'>
            <p className='title'>MY PITCHFORK</p>
            <p className='name'>{props.account.user.name}</p>
            <p className='username'>@{props.account.user.username}</p>
        </div>
    )
}
