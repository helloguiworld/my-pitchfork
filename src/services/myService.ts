import api from "./myPitchforkAPI"
import { Album } from "./spotifyService"
import { User } from "./accessService"

// TYPE
export type TrackScore = {
    track: string
    score: number
}
export type Review = {
    album: string
    score: number
    is_best_new: boolean
    text: string
    track_scores: TrackScore[]
}
export type DynamicReview = Review & {
    album: Album
    track_scores?: TrackScore[]
}
export type ReviewsOrder = 'created_at' | '-created_at' | 'score' | '-score'
export type ReviewsPageParams = {
    page?: number
    q?: string
    order?: ReviewsOrder
}
export type FeedReview = {
    review: DynamicReview
    account_user: User
    created_at: string
}

// CRUD

// CREATE
export const postReview = async (review: Review) => await api.post('my/reviews/', review)

// READ
export const getAccount = async () => await api.get('my/account/')
export const getReview = async (album: string) => await api.get(`my/reviews/${album}/`)
export const getReviews = async (pageParams?: ReviewsPageParams) => (
    await api.get(
        `my/reviews/?page=${pageParams?.page || 1}&search=${pageParams?.q || ''}&ordering=${pageParams?.order || '-created_at'}`
    )
)
export const getFeed = async (page?: number) => await api.get(`my/feed/${page ? `?page=${page}`: ''}`)
export const getProfile = async (username: string) => await api.get(`my/profile/${username}/`)
export const postFollow = async (username: string) => await api.post(`my/profile/${username}/follow/`)
export const postUnfollow = async (username: string) => await api.post(`my/profile/${username}/unfollow/`)

// UPDATE
export const putReview = async (review: Review) => await api.put(`my/reviews/${review.album}/`, review)

// DELETE



const myService = {
    getAccount,

    getReview,
    postReview,
    putReview,

    getReviews,
    getFeed,

    getProfile,
    postFollow,
    postUnfollow,
}
export default myService