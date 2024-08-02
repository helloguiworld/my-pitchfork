import { Account } from '../../../../../../services/accessService'

import './styles.scss'
export type MyHeaderProps = {
    account: Account
    reviewsCount: number
    content?: JSX.Element | JSX.Element[]
}

export default function MyHeader(props: MyHeaderProps) {
    return (
        <div className='my-header'>
            <p className='title'>MY PITCHFORK</p>
            <p className='name'>{props.account.user.name}</p>
            <p className='username'>@{props.account.user.username}</p>
            <p className='reviews-count'>{props.reviewsCount} {props.reviewsCount == 1 ? "review" : "reviews"}</p>

            <div className="my-header-content">
                {props.content}
            </div>
        </div>
    )
}
