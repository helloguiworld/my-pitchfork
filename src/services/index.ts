import axios from "axios"

export const frontBaseURL = "http://localhost:3000"
export const SpotifyAPIBaseURL = "https://api.spotify.com/v1/"
// export const myPitchforkAPIBaseURL = "http://127.0.0.1:8000/api/"

const SpotifyAuthToken = "BQAMQhhT7fsYOTozu0ZYCXbPQ4lZymyommrgrDo1J6mKXY7DANUAV-ueEcccNydoopmBV8pUnFWW63kwx4Ufb5TCmCHA5ypeBVkxhdKYDqnAVCAsyIo"

const spotifyAPI = axios.create({
    baseURL: SpotifyAPIBaseURL,
    headers: {
        'Authorization': `Bearer ${SpotifyAuthToken}`
    },
})

spotifyAPI.interceptors.response.use(function (response) {
    console.log(response)
    return response
}, function (error) {
    console.log(error.request)
    return Promise.reject(error)
})

export const setSpotifyAuthToken = (token: string) => {
    spotifyAPI.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default spotifyAPI