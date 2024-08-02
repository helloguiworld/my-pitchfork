import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import useAlbum from './useAlbum'
import { TrackScore } from '../services/myService'
import useStoredTrackScores from './useStoredTrackScores'
import myService, { Review } from '../services/myService'

import { AxiosError } from 'axios'

export type HashTrackScores = {
    [key: string]: number,
}

export default function useReview(id: string | undefined) {
    const authContext = useContext(AuthContext)

    const [review, setReview] = useState<Review | null>(null)
    const [reviewTrackScores, setReviewTrackScores] = useState<HashTrackScores | null>(null)
    const [fetching, setFetching] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    const [isBestNew, setIsBestNew] = useState(false)
    const [trackScores, setTrackScores] = useState<HashTrackScores | null>(null)
    const [trackScoresIsClean, setTrackScoresIsClean] = useState(true)
    const [albumScore, setAlbumScore] = useState<number | null>(null)
    const [needToSave, setNeedToSave] = useState(false)

    const { setStoredTrackScore, getStoredTrackScoresByIds } = useStoredTrackScores()

    const { album, fetching: albumFetching, error: albumError } = useAlbum(id)

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

    function unhashTrackScores(trackScores: HashTrackScores) {
        return Object.entries(trackScores).map(ts => ({
            'track': ts[0],
            'score': ts[1],
        }))
    }

    function defineCleanTrackScoresLocalBased() {
        if (album?.tracks) {
            const albumTrackIds = album.tracks.map(track => track.id)
            const retrievedTrackScores = getStoredTrackScoresByIds(albumTrackIds)
            const newTrackScores = albumTrackIds.reduce((ts: HashTrackScores, ts_id: string) => {
                ts[ts_id] = retrievedTrackScores[ts_id] || 0
                return ts
            }, {})
            setTrackScores(newTrackScores)
        } else console.log('Cant define track scores without album data.')
    }

    async function readReview(id: string) {
        setFetching(true)
        return myService.getReview(id)
            .then((response: any) => {
                if (response.status == 200) {
                    const review = response.data
                    setReview(review)
                }
                return response
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => setFetching(false))
    }

    async function createReview(newReview: Review) {
        if (album) {
            return myService.postReview(newReview)
                .then((response: any) => {
                    const review = response.data
                    setReview(review)
                    setNeedToSave(false)
                    return response
                })
                .catch((error) => setError(error))
        }
    }

    async function updateReview(newReview: Review) {
        if (album) {
            return myService.putReview(newReview)
                .then((response: any) => {
                    const review = response.data
                    setReview(review)
                    setNeedToSave(false)
                    return response
                })
                .catch((error) => setError(error))
        }
    }

    async function saveReview(newReview: Review) {
        if (authContext?.isAuth) {
            if (!fetching) {
                setSaving(true)
                if (review) await updateReview(newReview)
                else await createReview(newReview)
                setSaving(false)
            } else console.log('Wait review fetching before save.')
        } else console.log('Cant save review without auth.')
    }

    useEffect(() => {
        if (authContext?.hasCheckedLocalAuth) {
            if (authContext?.isAuth && id) readReview(id)
            else setFetching(false)
        }
    }, [authContext?.hasCheckedLocalAuth, authContext?.isAuth, id])

    useEffect(() => {
        if (authContext?.hasCheckedLocalAuth && album) {
            if (!authContext?.isAuth) {
                defineCleanTrackScoresLocalBased()
            } else if (!fetching) {
                if (review) {
                    setIsBestNew(review.is_best_new)
                    const newTrackScores = hashTrackScores(review.track_scores)
                    setReviewTrackScores(newTrackScores)
                    setTrackScores(newTrackScores)
                } else {
                    defineCleanTrackScoresLocalBased()
                    setNeedToSave(true)
                }
            }
        }
    }, [album, authContext?.isAuth, fetching, review])

    useEffect(() => {
        if (trackScores) {
            const scores = Object.values(trackScores)
            const scoresSum = scores.reduce((acc, curr) => acc + curr, 0)
            const newAlbumScore = scoresSum / scores.length
            setAlbumScore(Number(newAlbumScore.toFixed(1)))
        }
    }, [trackScores])

    function trackScoresCleanCheck(trackScores: HashTrackScores) {
        const trackScoresArray = Object.values(trackScores)
        return trackScoresArray.every(s => s == 0)
    }

    function trackScoresAreSame(trackScoresA: HashTrackScores | null, trackScoresB: HashTrackScores | null) {
        if (trackScoresA && trackScoresB) {
            const trackScoresArray = Object.entries(trackScoresA)
            if (trackScoresArray.length != Object.keys(trackScoresB).length)
                return false
            return trackScoresArray.every(([t, s]) => trackScoresB[t] == s)
        } else return false
    }

    function checkIfNeedToSave() {
        if (review && review.is_best_new != isBestNew)
            return true
        return !trackScoresAreSame(trackScores, reviewTrackScores)
    }

    useEffect(() => {
        if (review || reviewTrackScores && trackScores)
            setNeedToSave(checkIfNeedToSave())
    }, [review, isBestNew, reviewTrackScores, trackScores])

    useEffect(() => {
        if (trackScores)
            setTrackScoresIsClean(trackScoresCleanCheck(trackScores))
    }, [trackScores])

    return {
        review,
        fetching,
        saving,
        error,
        readReview,
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
        hashTrackScores,
        unhashTrackScores,

        albumScore,
    }
}