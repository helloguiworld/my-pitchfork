import api from "./myPitchforkAPI"

// TYPE


// CRUD

// CREATE
export const login = async (username: string, password: string) => await api.post('users/token-auth/', {
    username,
    password,
})

// READ


// UPDATE


// DELETE



const accessServices = {
    login,
}
export default accessServices