import { useState } from 'react'
import spotifyService, { Album } from '../services/spotifyServices'

import useLocalStorage from './useLocalStorage'

import { AxiosError } from 'axios'

export default function useSearch() {
    const [lastSearchQ, setLastSearchQ] = useLocalStorage('last-search-q', '')
    const [searchResults, setSearchResults] = useLocalStorage<Album[]>('search-results', [])
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    async function searchAlbums(q: string) {
        setFetching(true)
        return spotifyService.getSearch(q)
            .then(response => {
                setError(undefined)
                setLastSearchQ(q)
                setSearchResults(
                    response.data.map(
                        (album: any) => ({
                            id: album.id,
                            name: album.name,
                            type: album.type,
                            cover: album.cover,
                            artists: album.artists,
                            date: album.date,
                            total_tracks: album.total_tracks,
                        })
                    )
                )
                return response
            })
            .catch((error) => {
                setError(error)
                setLastSearchQ('')
                setSearchResults([])
            })
            .finally(() => setFetching(false))
    }

    return {
        searchResults,
        lastSearchQ,
        fetching,
        error,
        searchAlbums,
    }
}