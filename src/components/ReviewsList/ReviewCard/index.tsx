// import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { DynamicReview } from '../../../services/myServices'
import clickServices from '../../../services/clickServices'

import Card from '../../Card'
import ScoreDisplay from '../../ScoreDisplay'

import './styles.scss'
export type ReviewCardProps = {
    review: DynamicReview
    small?: boolean
}

export default function ReviewCard(props: ReviewCardProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/review/${props.review.album.id}`)
        clickServices.postAlbumClick(props.review.album.id, props.review.album.name)
    }

    return (
        <Card
            className={
                'review-card'
                + (props.small ? ' small' : '')
                + (props.review.is_best_new ? ' bext-new' : '')
            }
            onClick={handleClick}
        >
            <img
                className="cover"
                src={props.review.album.cover}
                alt={`${props.review.album.name} album cover`}
            />

            <div className="album-names">
                <p className='album'>{props.review.album.name}</p>
                <p className="artists">{props.review.album.artists.join(' / ')}</p>
            </div>

            {/* <div className="tracks-data">
                <p className='album-type'>{getAlbumType(props.review.album.type, props.review.album.tracks_count)}</p>
                {
                    props.review.album.tracks_count > 1 &&
                    <p className="total-tracks">
                        {`${props.review.album.tracks_count} tracks`}
                    </p>
                }
            </div> */}

            <ScoreDisplay
                score={props.review.score}
                isBestNew={props.review.is_best_new}
                small
            />
        </Card>
    )
}
