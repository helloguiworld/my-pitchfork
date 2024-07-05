import { ChangeEvent, useState } from 'react'

import { Track } from '../../services/spotifyService'

import './styles.scss'
export type TrackItemProps = {
    track: Track,
    setNewTrackScore: Function,
}

export default function TrackItem(props: TrackItemProps) {
    const [score, setScore] = useState(0.0)

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        const newScore = Number(value.replace(/[^0-9]/g, '')) / 10
        if (0 <= newScore && newScore <= 10) {
            setScore(newScore)
            props.setNewTrackScore(props.track.id, newScore)
        }
    }

    return (
        <div className='track-item'>
            <p className='number'>{props.track.number.toString().padStart(2, '0')}</p>
            <div className="data">
                <p className='name'>{props.track.name}</p>
                <p className='artists'>{props.track.artists.join(' / ')}</p>
            </div>
            <input
                className='track-score'
                inputMode="numeric"
                // type="number"
                // step="0.1"
                // min="0"
                // max="10"
                value={score.toFixed(1)}
                onChange={onChange}
            />
        </div>
    )
}
