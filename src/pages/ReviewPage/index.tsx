import { useState, ChangeEvent, useContext, useEffect } from 'react'
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

import useReview from '../../hooks/useReview'

import useLocalStorage from '../../hooks/useLocalStorage'
import { Track } from '../../services/spotifyServices'
import clickServices from '../../services/clickServices'

import squareReviewCapture from '../../functions/squareReviewCapture'
import storiesReviewCapture from '../../functions/storiesReviewCapture'
// import trackScoresCapture from '../../functions/trackScoresCapture'

import './styles.scss'
// export type ReviewPageProps = {
// }
export type ReviewPageParams = {
    id: string,
}

export default function ReviewPage() {
    const authContext = useContext(AuthContext)

    const [author, setAuthor] = useLocalStorage('author', '')
    const [fetchingSquareCapture, setFetchingSquareCapture] = useState(false)
    // const [fetchingTrackScoresCapture, setFetchingTrackScoresCapture] = useState(false)
    const [fetchingStoriesCapture, setFetchingStoriesCapture] = useState(false)

    const { id } = useParams<ReviewPageParams>()

    const {
        // review,
        // fetching,
        saving,
        // error,
        // readReview,
        needToSave,
        saveReview,
        album,
        albumError,
        albumFetching,
        isBestNew,
        setIsBestNew,
        trackScores,
        trackScoresIsClean,
        setNewTrackScore,
        unhashTrackScores,
        albumScore,
    } = useReview(id)

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
        if (authContext?.isAuth && album && albumScore != null && trackScores) {
            const review = {
                'album': album.id,
                'score': albumScore,
                'is_best_new': isBestNew,
                'track_scores': unhashTrackScores(trackScores),
            }
            saveReview(review)
        }
    }

    useEffect(() => {
        if (authContext?.authAccount) setAuthor(authContext?.authAccount.user.username)
    }, [])

    return (
        <Page id='review-page' banners={['#mypitchfork', 'review-save']}>
            {
                albumFetching ?
                    <Squares className='spaced' />
                    : albumError?.response?.status == 429 ?
                        <Error429 /> :
                        album ?
                            <>
                                <AlbumReview
                                    album={album}
                                    isBestNew={isBestNew}
                                    score={albumScore}
                                    author={authContext?.authAccount ? `@${author}` : author}
                                />

                                <div className="review-settings">
                                    {
                                        !authContext?.authAccount &&
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
                                    }

                                    <div className="review-buttons">
                                        <Button
                                            onClick={() => window.open(`https://open.spotify.com/album/${album.id}`, '_blank')}
                                            color='#1DB954'
                                        >
                                            <span>OPEN IN SPOTIFY</span>
                                            <FaSpotify />
                                        </Button>

                                        {
                                            (!import.meta.env.VITE_SHARES_DISABLE) &&
                                            <>
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

                                                {/* <Button
                                                    onClick={fetchingTrackScoresCapture ? undefined : () => {
                                                        setFetchingTrackScoresCapture(true)
                                                        // createShare('track-scores')
                                                        trackScoresCapture(album.name)
                                                        setTimeout(() => { setFetchingTrackScoresCapture(false) }, 3000)
                                                    }}
                                                    fetching={fetchingTrackScoresCapture}
                                                    >
                                                    <span>SHARE TRACK SCORES</span>
                                                    <MdQueueMusic />
                                                    </Button> */}
                                            </>
                                        }

                                        {
                                            authContext?.isAuth &&
                                            <Button
                                                className={'save-review'}
                                                color="var(--color-blue)"
                                                colorFilled
                                                inactive={!needToSave || trackScoresIsClean}
                                                onClick={saveMyReview}
                                                fetching={saving}
                                            >
                                                <span>{
                                                    trackScoresIsClean ?
                                                        "FILL BEFORE SAVE" :
                                                        needToSave ? "SAVE REVIEW" : "REVIEW IS UPDATED"
                                                }</span>
                                            </Button>
                                        }
                                    </div>

                                    <div className="track-scores">
                                        <div className="track-scores-header">
                                            <p className='title'>Track Scores</p>

                                            <Button
                                                className={'small best-new'}
                                                isOn={isBestNew}
                                                onClick={() => setIsBestNew(!isBestNew)}
                                                color="#ff3530"
                                            >
                                                <Crown />
                                            </Button>
                                        </div>

                                        {
                                            (album.tracks && trackScores) ?
                                                <div className="tracks">
                                                    {
                                                        album.tracks
                                                            .sort((tA: Track, tB: Track) => tA.number < tB.number ? -1 : 1)
                                                            .map(
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
                                                :
                                                <Squares />
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
