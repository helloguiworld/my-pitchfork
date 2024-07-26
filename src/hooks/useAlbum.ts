import { useState, useEffect } from 'react'
import spotifyService, { Album } from '../services/spotifyServices'

import useStoredTrackScores from './useStoredTrackScores'

import { AxiosError } from 'axios'

export type TrackScores = {
    [key: string]: number,
}

export default function useAlbum(id: string | undefined) {
    const [album, setAlbum] = useState<Album | null>(null)
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()
    const [trackScores, setTrackScores] = useState<TrackScores>({})
    const [albumScore, setAlbumScore] = useState<number>(0)

    const { setStoredTrackScore, getStoredTrackScoresByIds } = useStoredTrackScores()

    function setNewTrackScore(id: string, score: number) {
        setTrackScores(prevTrackScores => ({ ...prevTrackScores, [id]: score }))
        setStoredTrackScore(id, score)
    }

    async function readAlbum(id: string) {
        setFetching(true)
        return spotifyService.getAlbum(id)
            .then((response: any) => {
                const album: Album = response.data
                setAlbum({
                    id: album.id,
                    name: album.name,
                    type: album.type,
                    cover: album.cover,
                    artists: album.artists,
                    date: album.date,
                    tracks: album.tracks,
                })
                return response
            })
            .catch((error) => setError(error))
            .finally(() => setFetching(false))
    }

    useEffect(() => {
        if (id)
            readAlbum(id)
    }, [id])

    useEffect(() => {
        if (album?.tracks) {
            const albumTrackIds = album.tracks.map(track => track.id)
            const retrievedTrackScores = getStoredTrackScoresByIds(albumTrackIds)
            const newTrackScores = albumTrackIds.reduce((ts: TrackScores, ts_id: string) => {
                ts[ts_id] = retrievedTrackScores[ts_id] || 0
                return ts
            }, {})
            setTrackScores(newTrackScores)
        }
    }, [album])

    useEffect(() => {
        if (album && trackScores) {
            const scores = Object.values(trackScores)
            const scoresSum = scores.reduce((acc, curr) => acc + curr, 0)
            const newAlbumScore = scoresSum / scores.length
            setAlbumScore(newAlbumScore)
        }
    }, [trackScores])

    return {
        album,
        fetching,
        error,
        readAlbum,
        trackScores,
        setNewTrackScore,
        albumScore,
    }
}