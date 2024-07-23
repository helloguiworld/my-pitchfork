import api from "./myPitchforkAPI"

// TYPE

// CRUD

// CREATE
export const postSearchClick = async (q: string) => await api.post(`search-click/`, {q})
export const postAlbumClick = async (id: string, name: string) => await api.post(`album-click/`, {
    'album_id': id,
    'album_name': name,
})

// READ

// UPDATE


// DELETE



const clickServices = {
    postSearchClick,
    postAlbumClick,
}
export default clickServices