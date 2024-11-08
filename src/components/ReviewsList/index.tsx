import { DynamicReview } from '../../services/myService'

import ReviewListCount from './ReviewListCount'
import ReviewCard from './ReviewCard'
import Notice from '../Notice'

import Squares from "react-activity/dist/Squares"

import './styles.scss'
export type ReviewsListProps = {
    message?: string
    reviews: DynamicReview[]
    fetching?: boolean
    count?: boolean | number
    small?: boolean
    headerTitle?: string
    headerContent?: JSX.Element | JSX.Element[]
    footerContent?: JSX.Element | JSX.Element[]
}

export default function ReviewsList(props: ReviewsListProps) {
    return (
        <div className="reviews-list">
            {
                (props.headerTitle || props.headerContent || props.count) &&
                <div className="reviews-list-header">
                    {props.headerTitle && <p className='title'>{props.headerTitle}</p>}
                    {
                        props.fetching ?
                            <Squares />
                            :
                            props.count &&
                            <ReviewListCount count={typeof props.count == 'number' ? props.count : props.reviews.length} />
                    }
                    {props.headerContent}
                </div>
            }

            {
                props.fetching ?
                    <Squares className='spaced' />
                    :
                    <>
                        {props.message && <span className='list-message'>{props.message}</span>}

                        {
                            props.reviews.length > 0 ?
                                props.reviews.map((review: DynamicReview) =>
                                    <ReviewCard
                                        review={review}
                                        small={props.small}
                                        key={review.album.id}
                                    />
                                )
                                :
                                <Notice>
                                    <p>NO REVIEW LISTED</p>
                                </Notice>
                        }

                        {props.footerContent}
                    </>
            }
        </div>
    )
}
