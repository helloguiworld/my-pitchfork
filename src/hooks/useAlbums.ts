import { useState } from 'react'
import spotifyService, { Album } from '../services/spotifyServices'

import { AxiosError } from 'axios'

export default function useAlbums() {
    const [albums, setAlbums] = useState<Album[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    async function searchAlbums(q: string) {
        setFetching(true)
        return spotifyService.getSearch(q)
            .then(response => {
                setAlbums(
                    response.data.map(
                        (album: any) => ({
                            id: album.id,
                            name: album.name,
                            type: album.type,
                            cover: album.cover,
                            artists: album.artists,
                            date: album.date,
                            tracks: album.tracks,
                        })
                    )
                )
                return response
            })
            .catch((error) => {
                setAlbums([])
                setError(error)
            })
            .finally(() => setFetching(false))
    }

    return {
        albums,
        fetching,
        error,
        searchAlbums,
    }
}