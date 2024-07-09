import { ChangeEvent } from 'react'

import { Track } from '../../services/spotifyService'

import './styles.scss'
export type TrackItemProps = {
    track: Track,
    setNewTrackScore: Function,
    trackScore: number,
}

export default function TrackItem(props: TrackItemProps) {
    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        const newScore = Number(value.replace(/[^0-9]/g, '')) / 10
        if (0 <= newScore && newScore <= 10)
            props.setNewTrackScore(props.track.id, newScore)
    }

    return (
        <div className='track-item'>
            <label htmlFor={`track-${props.track.id}`}>
                <p className='number'>{props.track.number.toString().padStart(2, '0')}</p>
                <div className="data">
                    <p className='name'>{props.track.name}</p>
                    <p className='artists'>{props.track.artists.join(' / ')}</p>
                </div>
            </label>
            <input
                className='track-score'
                id={`track-${props.track.id}`}
                value={props.trackScore.toFixed(1)}
                onChange={onChange}
                inputMode="numeric"
            />
        </div>
    )
}
