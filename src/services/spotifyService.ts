import api from './myPitchforkAPI'

export function getAlbumTitle(type: string, tracks: number) {
    if (type != 'single')
        return "ALBUM"

    if (tracks == 1)
        return "TRACK"

    return "TRACK ALBUM"
}

// TYPE
export type AlbumTitle = "TRACK" | "TRACK ALBUM" | "ALBUM"
export type Track = {
    id: string,
    name: string,
    artists: string[],
    explicit: boolean,
    number: number,
}
export type Album = {
    id: string,
    name: string,
    type: string,
    cover: string,
    artists: string[],
    date: string,
    tracks_count: number,
    explicit: boolean,
    reviews_count?: number,
    reviews_score_avg?: number,
    tracks?: Track[],
}

// CRUD

// CREATE


// READ
export const getSearch = async (q: string) => await api.get(`spotify/search/${q}/`)
export const getAlbum = async (id: string) => await api.get(`spotify/albums/${id}/`)

// UPDATE


// DELETE



const spotifyService = {
    getSearch,
    getAlbum,
}
export default spotifyService