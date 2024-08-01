import { useState, useEffect } from 'react'
import spotifyService, { Album } from '../services/spotifyServices'

import { AxiosError } from 'axios'

export default function useAlbum(id: string | undefined) {
    const [album, setAlbum] = useState<Album | null>(null)
    const [fetching, setFetching] = useState<boolean>(true)
    const [error, setError] = useState<AxiosError>()

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
                    tracks_count: album.tracks_count,
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

    return {
        album,
        fetching,
        error,
        readAlbum,
    }
}