import axios from "axios"

export const frontBaseURL = "http://localhost:3000"
export const SpotifyAPIBaseURL = "https://api.spotify.com/v1/"
// export const myPitchforkAPIBaseURL = "http://127.0.0.1:8000/api/"

const SpotifyAuthToken = "BQA3zaCrrRDPpy3OzlYubFtcWLW3SN_tbPRleb5Jj1tucATPiFlqFCuo_dZzFS62G7Pv9iYMoe8uTUN16BNOB_2sHJkphelaJgVdjuv37WusKdPgmRg"

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