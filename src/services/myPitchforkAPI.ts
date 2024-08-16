import axios from "axios"

const NETWORK_IP = "192.168.0.12"
// const LOCALHOST = "localhost"

export const myPitchforkAPIBaseURL =
    import.meta.env.VITE_LOCAL_API ?
        `http://${NETWORK_IP}:8000/` :
        "https://api.mypitchfork.fun/"

const myPitchforkAPI = axios.create({
    baseURL: myPitchforkAPIBaseURL,
})

export const setAPIAuthToken = (token: string) => {
    if (token)
        myPitchforkAPI.defaults.headers.common['Authorization'] = `Token ${token}`
}
export const removeAPIAuthToken = () => {
    delete myPitchforkAPI.defaults.headers.common['Authorization']
}

export const LOCAL_AUTH_TOKEN_KEY = 'auth-token'
export const LOCAL_AUTH_ACCOUNT_KEY = 'auth-account'

myPitchforkAPI.interceptors.response.use(function (response) {
    if (import.meta.env.VITE_DEBUG) console.log(response)
    return response
}, async function (error) {
    if (error.response?.status === 401) {
        console.log('LOCAL AUTH NOT AUTH')
        removeAPIAuthToken()
        localStorage.removeItem(LOCAL_AUTH_TOKEN_KEY)
        localStorage.removeItem(LOCAL_AUTH_ACCOUNT_KEY)
        window.location.reload()
    }
    // if (error.response && error.response.status === 404) {
    //     window.location.reload()
    // }
    console.log(error.request)
    return Promise.reject(error)
})

export default myPitchforkAPI