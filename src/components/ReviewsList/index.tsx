// import { } from 'react'

import { DynamicReview } from '../../services/myServices'

import ReviewCard from './ReviewCard'

import './styles.scss'
export type ReviewsListProps = {
    message?: string
    reviews: DynamicReview[]
    small?: boolean
    headerTitle?: string
    headerContent?: JSX.Element | JSX.Element[]
    footerContent?: JSX.Element | JSX.Element[]
}

export default function ReviewsList(props: ReviewsListProps) {
    return (
        <div className="reviews-list">
            {
                (props.headerTitle || props.headerContent) &&
                <div className="reviews-list-header">
                    {props.headerTitle && <p className='title'>{props.headerTitle}</p>}
                    {props.headerContent}
                </div>
            }

            {props.message && <span className='list-message'>{props.message}</span>}

            {props.reviews.map((review: DynamicReview) =>
                <ReviewCard
                    review={review}
                    small={props.small}
                    key={review.album.id}
                />
            )}

            {props.footerContent}
        </div>
    )
}
