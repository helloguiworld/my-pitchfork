import api from "./myPitchforkAPI"
import { Album } from "./spotifyService"

// TYPE
export type AlbumRanking = [{
    position: number
    album: Album
    reviews_count: number
    reviews_avg: number
}]

// CRUD

// CREATE


// READ
export const getNewReleasesRanking = async () => await api.get('ranking/album/')

// UPDATE


// DELETE



const rankingService = {
    getNewReleasesRanking,
}
export default rankingService