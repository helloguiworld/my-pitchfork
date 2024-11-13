import { useState } from "react"

import { AxiosError } from "axios"
import accessService from "../../services/accessService"

export default function usePasswordReset() {
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState<AxiosError>()
    const [generalErrors, setGeneralErrors] = useState<string[]>()
    
    function cleanErrors() {
        setError(undefined)
        setGeneralErrors(undefined)
    }

    async function passwordReset(uId: string, token: string, newPassword: string) {
        if (uId && token && newPassword) {
            setFetching(true)
            cleanErrors()
            return accessService.passwordReset(uId, token, newPassword)
                .then(response => response)
                .catch(error => {
                    setError(error)
                    if (error.response.data?.error) setGeneralErrors(error.response.data.error)
                    return error.response
                })
                .finally(() => setFetching(false))
        }
    }

    return {
        fetching,
        error,
        generalErrors,
        cleanErrors,
        passwordReset,
    }
}