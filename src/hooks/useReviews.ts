import { useState } from "react"
import { AxiosError } from "axios"
import { DynamicReview, ReviewsPageParams } from "../services/myService"
import myService from "../services/myService"

export default function useReviews() {
    const [reviews, setReviews] = useState<DynamicReview[]>([])
    const [totalReviews, setTotalReviews] = useState<number>()
    const [fetching, setFetching] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    const [nextPageParams, setNextPageParams] = useState<ReviewsPageParams | null>()

    const [fetchingMore, setFetchingMore] = useState<boolean>(false)

    async function readReviews(pageParams?: ReviewsPageParams) {
        const IS_FIRST_LOAD = !pageParams?.page || pageParams?.page == 1

        if (IS_FIRST_LOAD) setFetching(true)
        else setFetchingMore(true)

        return myService.getReviews(pageParams)
            .then((response: any) => {
                if (response.status == 200) {
                    if (IS_FIRST_LOAD) setReviews(response.data['results'])
                    else setReviews([...reviews, ...response.data['results']])

                    setTotalReviews(response.data['count'])

                    if (response.data['next']) setNextPageParams({
                        page: pageParams?.page ? pageParams?.page + 1 : 2,
                        q: pageParams?.q,
                        order: pageParams?.order,
                    })
                    else setNextPageParams(null)
                }
                return response
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => {
                if (IS_FIRST_LOAD) setFetching(false)
                else setFetchingMore(false)
            })
    }

    return {
        reviews,
        totalReviews,
        fetching,
        error,
        nextPageParams,
        fetchingMore,
        readReviews,
    }
}