import { useState, useContext, useEffect } from "react"

import { AuthContext } from "../contexts/AuthContext"

// import { useNavigate } from "react-router-dom"
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

    // const navigate = useNavigate()

    function cleanErrors() {
        setErrors({})
        setUserErrors({})
        setGeneralErrors(undefined)
    }

    async function login(username: string, password: string) {
        setFetching(true)
        return accessServices.login(username, password)
            .then((response) => {
                const token = response.data.token
                authContext?.login(token)
                return response
            })
            .catch((error) => {
                const errors = error.response.data
                console.log('LOGIN ERRORS', errors)
                setErrors(errors)
                setGeneralErrors(errors.non_field_errors)
            })
            .finally(() => setFetching(false))
    }

    async function register(newAccount: Account) {
        setFetching(true)
        return accessServices.register(newAccount)
            .then((response: any) => {
                cleanErrors()
                return response
            })
            .catch((error) => {
                const errors = error.response.data
                console.log('REGISTER ERRORS', errors)
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
        login,
        register,
    }
}