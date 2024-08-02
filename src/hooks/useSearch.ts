import { useState } from 'react'
import spotifyService, { Album } from '../services/spotifyService'

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
                const albums = response.data
                setSearchResults(albums)
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