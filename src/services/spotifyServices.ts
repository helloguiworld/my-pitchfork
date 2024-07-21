import api from './myPitchforkAPI'

export function getAlbumTitleByType(type: string, tracks: number) {
    if (type != 'single')
        return "ALBUM"

    if (tracks == 1)
        return "TRACK"

    return "TRACK ALBUM"
}

// TYPE
export type Track = {
    id: string,
    name: string,
    artists: string[],
    number: number,
}
export type Album = {
    id: string,
    name: string,
    type: string,
    cover: string,
    artists: string[],
    date: string,
    tracks?: Track[],
    totalTracks: number,
}

// CRUD

// CREATE


// READ
export const getSearch = async (q: string) => await api.get(`spotify/search?q=${q}`)
export const getAlbum = async (id: string) => await api.get(`spotify/albums/${id}/`)

// UPDATE


// DELETE



const spotifyService = {
    getSearch,
    getAlbum,
}
export default spotifyService;