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
                const album = response.data
                setAlbum({
                    id: album.id,
                    name: album.name,
                    type: album.album_type,
                    cover: album.images[0].url,
                    artists: album.artists.map((artist: any) => artist.name),
                    date: album.release_date,
                    tracks: album.tracks.items.map((track: any, index: number) => ({
                        id: track.id,
                        name: track.name,
                        artists: track.artists.map((artist: any) => artist.name),
                        number: index + 1,
                    })),
                    totalTracks: album.total_tracks,
                })
                return response
            })
            .catch((error) => setError(error))
            .finally(() => setFetching(false))
            // .finally(() => setTimeout(() => setFetching(false), 500))
    }

    useEffect(() => {
        if (id)
            readAlbum(id)
    }, [id])

    useEffect(() => {
        if (album?.tracks) {
            const albumTrackIds = album.tracks.map(track => track.id)
            const retrievedTrackScores = getStoredTrackScoresByIds(albumTrackIds)
            setTrackScores(retrievedTrackScores)
        }
    }, [album])

    useEffect(() => {
        if (album && trackScores) {
            const scores = Object.values(trackScores)
            const scoresSum = scores.reduce((acc, curr) => acc + curr, 0)
            const newAlbumScore = scoresSum / album.totalTracks
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