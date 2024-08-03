import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'

import myService from '../services/myService'
import { Account } from '../services/accessService'
import { DynamicReview } from '../services/myService'
import { AxiosError } from 'axios'

export type Profile = {
    is_account_owner: boolean
    account: Account
    reviews_count: number

    new_releases: DynamicReview[]
    min_new_releases_to_unlock: number
    
    latest: DynamicReview[]
    min_latest_to_unlock: number
}

export default function useProfile(username: string | undefined) {
    const authContext = useContext(AuthContext)

    const [profile, setProfile] = useState<Profile | null>(null)
    const [fetching, setFetching] = useState<boolean>(true)
    const [error, setError] = useState<AxiosError>()

    async function readProfile(username: string) {
        setFetching(true)
        return myService.getProfile(username)
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