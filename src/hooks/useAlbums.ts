import { useState } from 'react'
import spotifyService, { Album } from '../services/spotifyService'

export default function useAlbums() {
    const [albums, setAlbums] = useState<Album[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState({})

    async function searchAlbums(q: string) {
        console.log(q)
        setFetching(true)
        return spotifyService.getAlbums(q)
            .then(response => {
                setAlbums(
                    response.data.albums.items.map(
                        (album: any) => ({
                            id: album.id,
                            name: album.name,
                            type: album.album_type,
                            cover: album.images[0].url,
                            artists: album.artists.map((artist: any) => artist.name),
                            date: album.release_date,
                            totalTracks: album.total_tracks,
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