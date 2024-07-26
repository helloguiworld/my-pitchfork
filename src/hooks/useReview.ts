import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import useAlbum from './useAlbumX'
import { TrackScore } from '../services/myServices'
import useStoredTrackScores from './useStoredTrackScores'
import myServices, { Review } from '../services/myServices'

import { AxiosError } from 'axios'

export type HashTrackScores = {
    [key: string]: number,
}

export default function useReview(id: string | undefined) {
    const [review, setReview] = useState<Review | null>(null)
    // const [isUpdated, setIsUpdated] = useState(true)
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()
    const [trackScores, setTrackScores] = useState<HashTrackScores>({})
    const [albumScore, setAlbumScore] = useState<number>(0)

    const { setStoredTrackScore, getStoredTrackScoresByIds } = useStoredTrackScores()

    const { album, fetching: albumFetching, error: albumError } = useAlbum(id)

    const authContext = useContext(AuthContext)

    function setNewTrackScore(id: string, score: number) {
        setTrackScores(prevTrackScores => ({ ...prevTrackScores, [id]: score }))
        setStoredTrackScore(id, score)
    }
    
    function hashTrackScores(trackScores: TrackScore[]) {
        return trackScores.reduce((tss: HashTrackScores, ts: TrackScore) => {
            tss[ts.track] = ts.score
            return tss
        }, {})
    }

    function defineCleanTrackScoresLocalBased() {
        authContext?.authConsole('defineCleanTrackScoresLocalBased')
        if (album?.tracks) {
            const albumTrackIds = album.tracks.map(track => track.id)
            const retrievedTrackScores = getStoredTrackScoresByIds(albumTrackIds)
            console.log('ts local:', retrievedTrackScores)
            const newTrackScores = albumTrackIds.reduce((ts: HashTrackScores, ts_id: string) => {
                ts[ts_id] = retrievedTrackScores[ts_id] || 0
                return ts
            }, {})
            setTrackScores(newTrackScores)
        } else console.log('Cant define track scores without album data.')
    }

    async function readReview(id: string) {
        setFetching(true)
        return myServices.getReview(id)
            .then((response: any) => {
                const review = response.data
                setReview(review)
                return response
            })
            .catch((error) => setError(error))
            .finally(() => setFetching(false))
    }

    async function createReview(newReview: Review) {
        if (album) {
            setFetching(true)
            return myServices.postReview(newReview)
                .then((response: any) => {
                    const review = response.data
                    setReview(review)
                    return response
                })
                .catch((error) => setError(error))
                .finally(() => setFetching(false))
        }
    }

    async function updateReview(newReview: Review) {
        if (album) {
            setFetching(true)
            return myServices.putReview(newReview)
                .then((response: any) => {
                    const review = response.data
                    setReview(review)
                    return response
                })
                .catch((error) => setError(error))
                .finally(() => setFetching(false))
        }
    }

    async function saveReview(newReview: Review) {
        if (authContext?.isAuth) {
            if (!fetching) {
                if (review) {
                    authContext.authConsole("UPDATE REVIEW", newReview)
                    updateReview(newReview)
                } else {
                    authContext.authConsole("CREATE REVIEW", newReview)
                    createReview(newReview)
                }
            } else console.log('Wait review fetching before save.')
        } else console.log('Cant save review without auth.')
    }

    useEffect(() => {
        if (authContext?.isAuth && id) readReview(id)
    }, [authContext?.isAuth, id])

    useEffect(() => {
        if (album?.tracks) {
            if (!authContext?.isAuth) {
                console.log('NOT AUTH')
                defineCleanTrackScoresLocalBased()
            } else if (!fetching) {
                if (review) {
                    authContext.authConsole('REVIEW', review)
                    const newTrackScores = hashTrackScores(review.track_scores)
                    console.log('TRACK SCORES', newTrackScores)
                    setTrackScores(newTrackScores)
                } else {
                    authContext.authConsole('NOT REVIEW')
                    defineCleanTrackScoresLocalBased()
                }
            }
        }
    }, [album, authContext?.isAuth, fetching, review])

    useEffect(() => {
        if (album && trackScores) {
            const scores = Object.values(trackScores)
            const scoresSum = scores.reduce((acc, curr) => acc + curr, 0)
            const newAlbumScore = scoresSum / scores.length
            setAlbumScore(Number(newAlbumScore.toFixed(1)))
        }
    }, [trackScores])

    return {
        review,
        fetching,
        error,
        readReview,
        saveReview,
        album,
        albumError,
        albumFetching,
        trackScores,
        setNewTrackScore,
        albumScore,
    }
}