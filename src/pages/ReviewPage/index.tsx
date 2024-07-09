import { useRef, useState, useEffect, ChangeEvent } from 'react'
import { useParams } from 'react-router-dom'

import { MdImage } from "react-icons/md"
import { FaSpotify } from "react-icons/fa6"

import Page from '../../components/Page'
import Crown from '../../components/Crown'
import Button from '../../components/Button'
import TrackItem from '../../components/TrackItem'

import Squares from "react-activity/dist/Squares"

import useAlbum from '../../hooks/useAlbum'
import { getAlbumTitleByType, Track } from '../../services/spotifyService'
import useLocalStorage from '../../hooks/useLocalStorage'

import reviewCapture from '../../functions/reviewCapture'

import './styles.scss'
export type ReviewPageProps = {
}
export type ReviewPageParams = {
    id: string,
}

export default function ReviewPage(props: ReviewPageProps) {
    const albumBoxRef = useRef<HTMLDivElement>(null)

    const [albumTypeTitle, setAlbumTypeTitle] = useState('')
    const [needTextResizing, setNeedTextResizing] = useState(false)
    const [isBestNew, setIsBestNew] = useState(false)
    const [author, setAuthor] = useLocalStorage('author', '')

    const { id } = useParams<ReviewPageParams>()

    const { album, fetching, error, setNewTrackScore, trackScores, albumScore } = useAlbum(id)

    // function testSizes(a: number, b: number) {
    //     console.log(
    //         a,
    //         b,
    //         a + b
    //     )
    // }

    function calcTextSizeFactor(text: string) {
        return [...text].reduce((acc, curr) => acc + ('A' <= curr && curr <= 'Z' ? 1.3 : 1), 0)
    }

    function checkTextAmount() {
        const albumNameElement = document.querySelector('p.name')
        const albumArtistsElement = document.querySelector('p.artists')
        if (albumNameElement?.textContent && albumArtistsElement?.textContent) {
            const albumNameTextSizeFactor = calcTextSizeFactor(albumNameElement.textContent)
            const albumArtistsTextSizeFactor = calcTextSizeFactor(albumArtistsElement.textContent)
            setNeedTextResizing(
                albumNameTextSizeFactor > 55 ||
                albumNameTextSizeFactor + albumArtistsTextSizeFactor > 80
            )
            // testSizes(albumNameTextSizeFactor, albumArtistsTextSizeFactor)
        }
    }

    useEffect(() => {
        if (album) {
            setAlbumTypeTitle(getAlbumTitleByType(album.type, album.totalTracks))
            checkTextAmount()
        }
    }, [album])

    return (
        <Page id='review-page'>
            {
                fetching ?
                    <Squares />
                    : album ?
                        <>
                            <div className="album-review">
                                <div
                                    className={
                                        "album" +
                                        (albumTypeTitle == "TRACK" ? " track-review" : "") +
                                        (needTextResizing ? " resized-text" : "")
                                    }
                                    ref={albumBoxRef}
                                >
                                    <div className="text">
                                        <p className="type">{albumTypeTitle + "S"}</p>
                                        <p className="name">{album.name}</p>
                                        <p className="artists">{album.artists.join(' / ')}</p>
                                        <p className="year">{album.date.split('-')[0]}</p>
                                    </div>
                                    <div className="others">
                                        <div className="cover-box">
                                            <img
                                                className="cover"
                                                src={album.cover}
                                                alt={`${album.name} album cover`}
                                            />
                                        </div>

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
                                {author && <p className="author">By {author}</p>}
                            </div>

                            <Button
                                onClick={() => window.open(`https://open.spotify.com/album/${album.id}`, '_blank')}
                                color='#1DB954'
                            >
                                OPEN IN SPOTIFY
                                <FaSpotify />
                            </Button>
                            <Button
                                onClick={() => reviewCapture("#root", album.name)}
                            >
                                SHARE REVIEW
                                <MdImage />
                            </Button>
                            <div className="author">
                                Author
                                <input
                                    className='author'
                                    type='text'
                                    placeholder='Regina George'
                                    value={author}
                                    onChange={(event: ChangeEvent<HTMLInputElement>) => setAuthor(event.target.value)}
                                />
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
                                </div>
                                <div className="tracks">
                                    {
                                        album.tracks?.map(
                                            (track: Track) =>
                                                <TrackItem
                                                    key={track.id}
                                                    track={track}
                                                    trackScore={trackScores[track.id] || 0}
                                                    setNewTrackScore={setNewTrackScore}
                                                />
                                        )
                                    }
                                </div>
                            </div>
                        </>
                        : <span>ALBUM NOT FOUND</span>
            }
        </Page>
    )
}
