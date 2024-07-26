import axios from "axios"

export const myPitchforkAPIBaseURL =
    import.meta.env.VITE_LOCAL_API ?
        "http://192.168.0.11:8000/" :
        "https://api.mypitchfork.fun/"

const myPitchforkAPI = axios.create({
    baseURL: myPitchforkAPIBaseURL,
})

myPitchforkAPI.interceptors.response.use(function (response) {
    if (import.meta.env.VITE_DEBUG) console.log(response)
    return response
}, async function (error) {
    // if (error.response && error.response.status === 404) {
    //     window.location.reload();
    // }
    console.log(error?.request)
    return Promise.reject(error)
})

export const setAPIAuthToken = (token: string) => {
    if (token)
        myPitchforkAPI.defaults.headers.common['Authorization'] = `Token ${token}`
}
export const removeAPIAuthToken = () => {
    delete myPitchforkAPI.defaults.headers.common['Authorization']
}

export default myPitchforkAPI