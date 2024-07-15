import api from "./myPitchforkAPI"

// TYPE
export type Sharetype = 'square' | 'stories'
export type Share = {
    id?: number,
    album_id: string,
    album_name: string,
    type: Sharetype,
    creation_date?: string,
}

// CRUD

// CREATE
export const postShare = async (shareItem: Share) => await api.post(`share/`, shareItem)

// READ
export const getShares = async () => await api.get(`share/`)

// UPDATE


// DELETE



const shareServices = {
    postShare,
    getShares,
}
export default shareServices;