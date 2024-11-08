// import { } from 'react'

import ReviewCard from '../../../../components/ReviewsList/ReviewCard'

import { FeedReview } from '../../../../services/myService'
import { useNavigate } from 'react-router-dom'

import './styles.scss'
export type FeedItemProps = {
    feedReview: FeedReview
}

export default function FeedItem(props: FeedItemProps) {
    const review = props.feedReview.review
    const accountUser = props.feedReview.account_user
    const date = new Date(props.feedReview.created_at)
    
    const navigate = useNavigate()

    return (
        <div className='feed-item'>
            <div className="feed-item-header">
                <div className="account" onClick={() => navigate(`/my/${accountUser.username}`)}>
                    <p className="name">{accountUser.name}</p>
                    <p className="username">@{accountUser.username}</p>
                </div>
                <p className="date">{date.toLocaleDateString()}</p>
            </div>

            {review.text && <p className='review-text'>{review.text}</p>}

            <ReviewCard
                small
                review={review}
            />
        </div>
    )
}
