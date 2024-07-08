import axios from "axios"
import useSpotifyAccessToken from "./useSpotifyAccessToken"
import { useEffect } from "react"

export const SpotifyAPIBaseURL = "https://api.spotify.com/v1/"

export default function useSpotifyAPI() {
    const { spotifyAccessToken } = useSpotifyAccessToken()

    const spotifyAPI = axios.create({
        baseURL: SpotifyAPIBaseURL,
    })

    spotifyAPI.interceptors.response.use(
        function (response) {
            console.log(response);
            return response;
        },
        function (error) {
            console.log(error.request);
            return Promise.reject(error);
        }
    )

    function setSpotifyAccessToken(token: string) {
        spotifyAPI.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    useEffect(() => {
        if (spotifyAccessToken) setSpotifyAccessToken(spotifyAccessToken)
    }, [spotifyAccessToken])

    return { spotifyAPI, setSpotifyAccessToken }
}