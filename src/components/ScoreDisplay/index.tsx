import { AlbumType } from "../../services/spotifyServices"

import Crown from "../Crown"

import Squares from "react-activity/dist/Squares"

import './styles.scss'
export type ScoreDisplayProps = {
    score: number | null
    isBestNew?: boolean
    typeTitle?: AlbumType
    small?: boolean
}

export default function ScoreDisplay(props: ScoreDisplayProps) {
    return (
        <div
            className={
                "score-display"
                + (props.isBestNew ? ' best-new' : '')
                + (props.typeTitle == "TRACK" ? ' track-review' : '')
                + (props.small ? ' small' : '')
            }
        >
            {props.isBestNew &&
                <Crown />
            }

            <span className="score">
                {
                    props.score == null ?
                        <Squares />
                        :
                        props.score != 10 ?
                            props.score?.toFixed(1)
                            :
                            props.score
                }
            </span>

            {
                (props.isBestNew && props.typeTitle) &&
                <p className="target">
                    {`BEST NEW ${props.typeTitle == "TRACK" ? "TRACK" : "MUSIC"}`}
                </p>
            }
        </div>
    )
}
