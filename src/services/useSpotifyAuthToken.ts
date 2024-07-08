import { useState, useEffect } from "react"
import axios from "axios"
import useLocalStorage from "../hooks/useLocalStorage"

const client_id = "c91e7e392e8c47f9b7cf853da50c421b"
const client_secret = "4edf8be1661749c8982767a59d7f416d"

export default function useSpotifyAccessToken() {
    const [storedSpotifyAccessToken, setStoredSpotifyAccessToken] = useLocalStorage('spotify-auth-token', null);
    const [spotifyAccessToken, setSpotifyAccessToken] = useState<string | null>(storedSpotifyAccessToken)

    async function getSpotifyAccessToken() {
        await axios.post(
            'https://accounts.spotify.com/api/token',
            {
                "grant_type": "client_credentials",
                "client_id": client_id,
                "client_secret": client_secret,
            },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(response => {
                setSpotifyAccessToken(response.data.access_token)
                setStoredSpotifyAccessToken(response.data.access_token)
                setTimeout(getSpotifyAccessToken, response.data.expires_in * 0.90 * 1000)
            })
            .catch(error => {
                console.error('Error obtaining Spotify access token:', error.message);
                setTimeout(getSpotifyAccessToken, 30 * 1000);
            })
    }

    useEffect(() => {
        getSpotifyAccessToken()
    }, [])

    return {
        spotifyAccessToken,
        getSpotifyAccessToken,
    }
}