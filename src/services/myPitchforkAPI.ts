import axios from "axios"

export const myPitchforkAPIBaseURL =
    import.meta.env.VITE_LOCAL_API ?
        "http://127.0.0.1:8000/" :
        "https://api.mypitchfork.fun/"

const myPitchforkAPI = axios.create({
    baseURL: myPitchforkAPIBaseURL,
})

myPitchforkAPI.interceptors.response.use(function (response) {
    if (import.meta.env.VITE_DEBUG) console.log(response)
    return response
}, async function (error) {
    console.log(error?.request)
    return Promise.reject(error)
})

export default myPitchforkAPI