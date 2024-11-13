import { useState } from "react"

import { AxiosError } from "axios"
import accessService from "../../services/accessService"

export default function useForgotPassword() {
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState<AxiosError>()
    const [generalErrors, setGeneralErrors] = useState<string[]>()
    
    function cleanErrors() {
        setError(undefined)
        setGeneralErrors(undefined)
    }

    async function forgotPassword(email: string) {
        if (email) {
            setFetching(true)
            cleanErrors()
            return accessService.forgotPassword(email)
                .then(response => response)
                .catch(error => {
                    setError(error)
                    if (error.response.data?.error) setGeneralErrors(error.response.data.error)
                    return error.response
                })
                .finally(() => { setFetching(false) })
        }
    }

    return {
        fetching,
        error,
        generalErrors,
        cleanErrors,
        forgotPassword,
    }
}