import api from "./myPitchforkAPI"

// TYPE
export type Sharetype = 'square' | 'stories'
export type Share = {
    id?: number,
    album_id: string,
    album_name: string,
    review_score: number,
    type: Sharetype,
    creation_date?: string,
}

// CRUD

// CREATE
export const postSearchClick = async (q: string) => await api.post(`report/search-click/`, {q})
export const postAlbumClick = async (id: string, name: string) => await api.post(`report/album-click/`, {
    'album_id': id,
    'album_name': name,
})
export const postShareClick = async (shareItem: Share) => await api.post(`report/share-click/`, shareItem)

// READ

// UPDATE


// DELETE



const clickService = {
    postSearchClick,
    postAlbumClick,
    postShareClick,
}
export default clickService