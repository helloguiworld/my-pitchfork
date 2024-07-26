import { useState, useEffect, ChangeEvent, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'

import { MdImage } from "react-icons/md"
import { FaSpotify, FaInstagram } from "react-icons/fa6"

import Page from '../../components/Page'
import AlbumReview from './components/AlbumReview'
import Crown from '../../components/Crown'
import Button from '../../components/Button'
import TrackItem from '../../components/TrackItem'
import Error429 from '../../components/Error429'
import Notice from '../../components/Notice'

import Squares from "react-activity/dist/Squares"

import useAlbum from '../../hooks/useAlbum'
import useReview from '../../hooks/useReview'

import useLocalStorage from '../../hooks/useLocalStorage'
import { Track } from '../../services/spotifyServices'
import clickServices from '../../services/clickServices'
import myServices from '../../services/myServices'

import squareReviewCapture from '../../functions/squareReviewCapture'
import storiesReviewCapture from '../../functions/storiesReviewCapture'

import './styles.scss'
// export type ReviewPageProps = {
// }
export type ReviewPageParams = {
    id: string,
}

export default function ReviewPage() {
    const [isBestNew, setIsBestNew] = useState(false)
    const [author, setAuthor] = useLocalStorage('author', '')
    const [fetchingSquareCapture, setFetchingSquareCapture] = useState(false)
    const [fetchingStoriesCapture, setFetchingStoriesCapture] = useState(false)

    const { id } = useParams<ReviewPageParams>()

    // const { album, fetching, error, setNewTrackScore, trackScores, albumScore } = useAlbum(id)
    const {
        review,
        fetching,
        error,
        // readReview,
        saveReview,
        album,
        albumError,
        albumFetching,
        trackScores,
        setNewTrackScore,
        albumScore,
    } = useReview(id)

    const authContext = useContext(AuthContext)

    function createShare(type: 'square' | 'stories') {
        if (album)
            clickServices.postShareClick({
                album_id: album.id,
                album_name: album.name,
                review_score: Number(albumScore),
                type: type,
            })
    }

    function saveMyReview() {
        if (authContext?.isAuth && album) {
            const review = {
                'album': album.id,
                'score': albumScore,
                'track_scores': Object.entries(trackScores).map(ts => ({
                    'track': ts[0],
                    'score': ts[1],
                })),
            }
            saveReview(review)
        }
    }

    return (
        <Page id='review-page'>
            {
                fetching && albumFetching ?
                    <Squares />
                    : albumError?.response?.status == 429 ?
                        <Error429 /> :
                        album ?
                            <>
                                <AlbumReview
                                    album={album}
                                    isBestNew={isBestNew}
                                    score={albumScore}
                                    author={author}
                                />

                                <Button
                                    onClick={() => window.open(`https://open.spotify.com/album/${album.id}`, '_blank')}
                                    color='#1DB954'
                                >
                                    <span>OPEN IN SPOTIFY</span>
                                    <FaSpotify />
                                </Button>

                                <Button
                                    onClick={fetchingSquareCapture ? undefined : () => {
                                        setFetchingSquareCapture(true)
                                        createShare('square')
                                        squareReviewCapture(album.name)
                                        setTimeout(() => { setFetchingSquareCapture(false) }, 3000)
                                    }}
                                    fetching={fetchingSquareCapture}
                                >
                                    <span>SHARE REVIEW</span>
                                    <MdImage />
                                </Button>
                                <Button
                                    color='#E1306C'
                                    onClick={fetchingStoriesCapture ? undefined : () => {
                                        setFetchingStoriesCapture(true)
                                        createShare('stories')
                                        storiesReviewCapture(album.name)
                                        setTimeout(() => { setFetchingStoriesCapture(false) }, 3000)
                                    }}
                                    fetching={fetchingStoriesCapture}
                                >
                                    <span>SHARE STORIES</span>
                                    <FaInstagram />
                                </Button>

                                <div className="author-input">
                                    Author
                                    <input
                                        className='author'
                                        type='text'
                                        placeholder='Regina George'
                                        value={author}
                                        onChange={(event: ChangeEvent<HTMLInputElement>) => setAuthor(event.target.value)}
                                    />
                                </div>

                                <div className="track-scores">
                                    <div className="track-scores-header">
                                        <p className='title'>Track Scores</p>

                                        {
                                            authContext?.isAuth &&
                                            <Button
                                                className={'save-review'}
                                                onClick={saveMyReview}
                                                color='#455678'
                                            >
                                                <span>SALVAR</span>
                                            </Button>
                                        }

                                        <Button
                                            className={'best-new'}
                                            isOn={isBestNew}
                                            onClick={() => setIsBestNew(!isBestNew)}
                                            color="#ff3530"
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
                            :
                            <Notice
                                items={[
                                    "ALBUM NOT FOUND",
                                ]}
                            />
            }
        </Page>
    )
}
