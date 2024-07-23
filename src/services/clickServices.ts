import api from "./myPitchforkAPI"

// TYPE

// CRUD

// CREATE
export const postSearchClick = async (q: string) => await api.post(`search-click/`, {q})

// READ

// UPDATE


// DELETE



const clickServices = {
    postSearchClick,
}
export default clickServices