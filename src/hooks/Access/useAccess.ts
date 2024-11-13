import { useState, useContext } from "react"

import { AuthContext } from "../../contexts/AuthContext"

import accessService, { Account } from "../../services/accessService"

export type Errors = {
    [key: string]: string[],
}

export default function useAccess() {
    const authContext = useContext(AuthContext)

    const [fetching, setFetching] = useState(false)

    const [errors, setErrors] = useState<Errors>({})
    const [userErrors, setUserErrors] = useState<Errors>({})
    const [generalErrors, setGeneralErrors] = useState<string[]>()

    function cleanErrors() {
        setErrors({})
        setUserErrors({})
        setGeneralErrors(undefined)
    }

    async function login(username: string, password: string) {
        if (authContext) {
            setFetching(true)
            cleanErrors()
            const response = await accessService.login(username, password)
                .then((response) => {
                    return response
                })
                .catch((error) => {
                    if (error.response) {
                        const errors = error.response.data
                        setErrors(errors)
                        setGeneralErrors(errors.non_field_errors)
                    }
                    setFetching(false)
                    return error
                })

            if (response?.status == 200) {
                const token = response.data.token
                return authContext.login(token)
                    .catch((error) => {
                        if (error.response.status == 403)
                            setGeneralErrors(["This user don't have an account."])
                        setFetching(false)
                        return error
                    })
            } else setFetching(false)

            return response
        }
    }

    async function register(newAccount: Account) {
        setFetching(true)
        cleanErrors()
        return accessService.register(newAccount)
            .then((response: any) => {
                return response
            })
            .catch((error) => {
                const errors = error.response.data
                setErrors(errors)
                setUserErrors(errors.user)
                setGeneralErrors(errors.non_field_errors)
                setFetching(false)
                return error
            })
    }

    return {
        fetching,
        errors,
        userErrors,
        generalErrors,
        cleanErrors,
        login,
        register,
    }
}