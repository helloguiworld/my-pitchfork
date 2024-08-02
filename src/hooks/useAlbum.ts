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
                setAlbum(album)
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