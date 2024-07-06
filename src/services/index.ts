import axios from "axios"

export const frontBaseURL = "http://localhost:3000"
export const SpotifyAPIBaseURL = "https://api.spotify.com/v1/"
// export const myPitchforkAPIBaseURL = "http://127.0.0.1:8000/api/"

const SpotifyAuthToken = "BQDQTeJODHACdKjsU_ltbB0l3Y7T8KnQXDfOsu318PErC-HDIFQyb0jLuF4TQwO81roXI3PYgCSywqEDvlUz0_uCkD1vgOQJZrYwuBEQjqUMld2gCJE"

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