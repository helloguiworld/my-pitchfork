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
export const forgotPassword = async (email: string) => await api.post('users/password-reset-request', { email })
export const passwordReset = async (uId: string, token: string, newPassword: string) => (
    await api.post(`users/password-reset/${uId}/${token}/`, { new_password: newPassword })
)

// READ


// UPDATE


// DELETE



const accessService = {
    login,
    register,
    forgotPassword,
    passwordReset,
}
export default accessService