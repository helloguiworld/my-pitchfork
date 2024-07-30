import { useState, useContext } from "react"

import { AuthContext } from "../contexts/AuthContext"

import accessServices, { Account } from "../services/accessServices"

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
            const response = await accessServices.login(username, password)
                .then((response) => {
                    return response
                })
                .catch((error) => {
                    const errors = error.response.data
                    setErrors(errors)
                    setGeneralErrors(errors.non_field_errors)
                    return error.response
                })
                .finally(() => setFetching(false))

            if (response?.status == 200) {
                const token = response.data.token
                return authContext.login(token)
                    .catch((error) => {
                        if (error.response.status == 403)
                            setGeneralErrors(["This user don't have an account."])
                        return error
                    })
            }

            return response
        }
    }

    async function register(newAccount: Account) {
        setFetching(true)
        cleanErrors()
        return accessServices.register(newAccount)
            .then((response: any) => {
                return response
            })
            .catch((error) => {
                const errors = error.response.data
                setErrors(errors)
                setUserErrors(errors.user)
                setGeneralErrors(errors.non_field_errors)
            })
            .finally(() => setFetching(false))
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