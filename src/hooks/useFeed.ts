import { useState } from "react"
import { AxiosError } from "axios"
import { FeedReview } from "../services/myService"
import myService from "../services/myService"

export default function useFeed() {
    const [feedReviews, setFeedReviews] = useState<FeedReview[]>()
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    const [nextPage, setNextPage] = useState<number>()

    const [fetchingMore, setFetchingMore] = useState<boolean>(false)

    async function readFeed(page?: number) {
        const IS_FIRST_LOAD = !page || page == 1

        if (IS_FIRST_LOAD) setFetching(true)
        else setFetchingMore(true)

        return myService.getFeed(page)
            .then((response) => {
                if (response.status == 200) {
                    if (IS_FIRST_LOAD || !feedReviews) setFeedReviews(response.data['results'])
                    else setFeedReviews([...feedReviews, ...response.data['results']])

                    if (response.data['next']) setNextPage(page ? page + 1 : 2)
                    else setNextPage(undefined)
                }
                return response
            })
            .catch((error) => {
                setError(error)
                return error.response
            })
            .finally(() => {
                if (IS_FIRST_LOAD) setFetching(false)
                else setFetchingMore(false)
            })
    }

    return {
        feedReviews,
        fetching,
        error,
        nextPage,
        fetchingMore,
        readFeed,
    }
}