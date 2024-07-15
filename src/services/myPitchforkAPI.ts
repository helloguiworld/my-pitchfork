import axios from "axios"

export const myPitchforkAPIBaseURL = "https://api.mypitchfork.fun/"

const myPitchforkAPI = axios.create({
    baseURL: myPitchforkAPIBaseURL,
})

myPitchforkAPI.interceptors.response.use(function (response) {
    // console.log(response)
    return response
}, async function (error) {
    console.log(error?.request)
    return Promise.reject(error)
})

export default myPitchforkAPI