import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Page from '../../components/Page'
import Crown from '../../components/Crown'
import Button from '../../components/Button'
import TrackItem from '../../components/TrackItem'

import useAlbum from '../../hooks/useAlbum'
import { getAlbumTitleByType, Track } from '../../services/spotifyService'

import reviewCapture from '../../functions/reviewCapture'

import './styles.scss'
export type ReviewPageProps = {
}
export type ReviewPageParams = {
    id: string,
}

export default function ReviewPage(props: ReviewPageProps) {
    const [albumTypeTitle, setAlbumTypeTitle] = useState('')
    const [isBestNew, setIsBestNew] = useState(false)
    const { id } = useParams<ReviewPageParams>()

    const { album, fetching, error, setNewTrackScore, albumScore } = useAlbum(id)

    useEffect(() => {
        if (album)
            setAlbumTypeTitle(getAlbumTitleByType(album.type, album.totalTracks))
    }, [album])

    return (
        <Page id='review-page'>
            {
                album &&
                <>
                    <div className="album-review">
                        <div className={"album" + (albumTypeTitle == "TRACK" ? " track-review" : "")}>
                            <div className="text">
                                <p className="type">{albumTypeTitle + "S"}</p>
                                <p className="name">{album.name}</p>
                                <p className="artists">{album.artists.join(' / ')}</p>
                                <p className="year">{album.date.split('-')[0]}</p>
                            </div>
                            <div className="others">
                                <img
                                    className="cover"
                                    src={album.cover}
                                    alt={`${album.name} album cover`}
                                />

                                <div className="score-box">
                                    {isBestNew &&
                                        <Crown />
                                    }

                                    <p className={"score" + (isBestNew ? " best-new" : "")}>{albumScore.toFixed(1)}</p>

                                    {isBestNew &&
                                        <p className="target">
                                            {`BEST NEW ${albumTypeTitle == "TRACK" ? "TRACK" : "MUSIC"}`}
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
                        <p className="author">By Guilherme Feitosa</p>
                    </div>

                    <div className="scores">
                        <div className="scores-header">
                            <p className='title'>Track Scores</p>
                            <Button
                                className={'best-new'}
                                isOn={isBestNew}
                                onClick={() => setIsBestNew(!isBestNew)}
                                color={"#ff3530"}
                            >
                                <Crown />
                            </Button>
                            <Button
                                onClick={() => reviewCapture("#root", album.name)}
                            >
                                D
                            </Button>
                        </div>
                        <div className="tracks">
                            {
                                album.tracks?.map(
                                    (track: Track) =>
                                        <TrackItem
                                            key={track.id}
                                            track={track}
                                            setNewTrackScore={setNewTrackScore}
                                        />
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </Page>
    )
}
