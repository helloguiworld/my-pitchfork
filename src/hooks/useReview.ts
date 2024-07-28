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
    const authContext = useContext(AuthContext)

    const [review, setReview] = useState<Review | null>(null)
    const [reviewTrackScores, setReviewTrackScores] = useState<HashTrackScores | null>(null)
    const [fetching, setFetching] = useState<boolean>(true)
    const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    const [isBestNew, setIsBestNew] = useState(false)
    const [trackScores, setTrackScores] = useState<HashTrackScores | null>(null)
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
        return myServices.getReview(id)
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
            return myServices.postReview(newReview)
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
            return myServices.putReview(newReview)
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

    // function trackScoresIsClean(trackScores: HashTrackScores) {
    //     const trackScoresArray = Object.values(trackScores)
    //     return trackScoresArray.every(s => s == 0)
    // }

    function trackScoresAreSame(trackScoresA: HashTrackScores, trackScoresB: HashTrackScores) {
        const trackScoresArray = Object.entries(trackScoresA)
        if (trackScoresArray.length != Object.keys(trackScoresB).length)
            return false
        return trackScoresArray.every(([t, s]) => trackScoresB[t] == s)
    }

    useEffect(() => {
        if (authContext?.hasCheckedLocalAuthData) {
            if (authContext?.isAuth && id) readReview(id)
            else setFetching(false)
        }
    }, [authContext?.hasCheckedLocalAuthData, authContext?.isAuth, id])

    useEffect(() => {
        if (authContext?.hasCheckedLocalAuthData && album) {
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

    useEffect(() => {
        if (reviewTrackScores && trackScores) {
            if (trackScoresAreSame(trackScores, reviewTrackScores)) setNeedToSave(false)
            else setNeedToSave(true)
        }
    }, [reviewTrackScores, trackScores])

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
        setNewTrackScore,
        hashTrackScores,
        unhashTrackScores,

        albumScore,
    }
}