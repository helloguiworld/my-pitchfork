import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import myServices from '../services/myServices'
import { Account } from '../services/accessServices'
import { Review } from '../services/myServices'
import { Album } from '../services/spotifyServices'
import { AxiosError } from 'axios'

export type ProfileReview = Review & {
    album: Album
}
export type Profile = {
    is_account_owner: boolean
    account: Account
    reviews_count: number
    top: ProfileReview[]
}

export default function useProfile(username: string | undefined) {
    const authContext = useContext(AuthContext)

    const [profile, setProfile] = useState<Profile | null>(null)
    const [fetching, setFetching] = useState<boolean>(true)
    // const [saving, setSaving] = useState<boolean>(false)
    const [error, setError] = useState<AxiosError>()

    async function readProfile(username: string) {
        setFetching(true)
        return myServices.getProfile(username)
            .then((response: any) => {
                if (response.status == 200) {
                    const profile: Profile = response.data
                    setProfile(profile)
                }
                return response
            })
            .catch((error) => {
                setError(error)
            })
            .finally(() => setFetching(false))
    }

    useEffect(() => {
        if (authContext?.hasCheckedLocalAuth) {
            if (username) readProfile(username)
            else setFetching(false)
        }
    }, [authContext?.hasCheckedLocalAuth, authContext?.isAuth, username])

    return {
        profile,
        fetching,
        error,
        readProfile,
    }
}