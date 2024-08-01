import api from "./myPitchforkAPI"

// TYPE
export type User = {
    password?: string,
    username: string,
    email?: string,
    name: string,
}
export type Account = {
    id?: number,
    user: User,
    bio?: string,
    updated_at?: string,
}

// CRUD

// CREATE
export const login = async (username: string, password: string) => await api.post('users/token-auth/', {
    username,
    password,
})
export const register = async (newAccount: Account) => await api.post('accounts/', newAccount)

// READ


// UPDATE


// DELETE



const accessServices = {
    login,
    register,
}
export default accessServices