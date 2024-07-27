import api from "./myPitchforkAPI"

// TYPE
export type TrackScore = {
    track: string
    score: number
}
export type Review = {
    album: string
    score: number
    is_best_new: boolean
    track_scores: TrackScore[]
}

// CRUD

// CREATE
export const postReview = async (review: Review) => await api.post(`my/reviews/`, review)

// READ
export const getAccount = async () => await api.get('my/account/')
export const getReviews = async () => await api.get(`my/reviews/`)
export const getReview = async (album: string) => await api.get(`my/reviews/${album}/`)

// UPDATE
export const putReview = async (review: Review) => await api.put(`my/reviews/${review.album}/`, review)

// DELETE



const myServices = {
    getAccount,
    postReview,
    getReviews,
    getReview,
    putReview,
}
export default myServices