import { useState } from 'react'
import rankingService, { AlbumRanking } from '../services/rankingService'

import { AxiosError } from 'axios'

export default function useRanking() {
    const [ranking, setRanking] = useState<AlbumRanking>()
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    async function readRanking() {
        setFetching(true)
        return rankingService.getNewReleasesRanking()
            .then(response => {
                setError(undefined)
                const ranking = response.data
                setRanking(ranking)
                return response
            })
            .catch((error) => {
                setError(error)
                setRanking(undefined)
                return error
            })
            .finally(() => setFetching(false))
    }

    return {
        ranking,
        fetching,
        error,
        readRanking,
    }
}