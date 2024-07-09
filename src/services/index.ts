import axios from "axios"

export const SpotifyAPIBaseURL = "https://api.spotify.com/v1/"
const client_id = "c91e7e392e8c47f9b7cf853da50c421b"
const client_secret = "4edf8be1661749c8982767a59d7f416d"

const spotifyAPI = axios.create({
    baseURL: SpotifyAPIBaseURL,
})

// export const setSpotifyAccessToken = (token: string) => {
//     spotifyAPI.defaults.headers['Authorization'] = `Bearer ${token}`
//     return token
// }

async function getSpotifyAccessToken() {
    return await axios.post(
        'https://accounts.spotify.com/api/token',
        {
            "grant_type": "client_credentials",
            "client_id": client_id,
            "client_secret": client_secret,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .then(response => {
            setTimeout(getSpotifyAccessToken, response.data.expires_in * 0.9 * 1000)
            return response.data.access_token
        })
        .catch(error => {
            console.error('Error obtaining Spotify access token:', error.message)
            setTimeout(getSpotifyAccessToken, 60 * 1000)
            return null
        })
}

async function initializeSpotifyAccessToken() {
    const spotifyAccessToken = await getSpotifyAccessToken()
    if (spotifyAccessToken) spotifyAPI.defaults.headers['Authorization'] = `Bearer ${spotifyAccessToken}`
}
initializeSpotifyAccessToken()

// spotifyAPI.interceptors.request.use(async function (config) {
//     return config
// })

spotifyAPI.interceptors.response.use(function (response) {
    // console.log(response)
    return response
}, async function (error) {
    const originalRequest = error.config
    if (error.response.status == 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const spotifyAccessToken = await getSpotifyAccessToken()
        if (spotifyAccessToken) spotifyAPI.defaults.headers['Authorization'] = `Bearer ${spotifyAccessToken}`
        return spotifyAPI.request(originalRequest)
    }

    console.log(error.request)
    return Promise.reject(error)
})

export default spotifyAPI