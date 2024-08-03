import { createContext, ReactNode, useState, useEffect } from 'react'
import { AxiosResponse } from "axios"

import {
    setAPIAuthToken,
    removeAPIAuthToken,
    LOCAL_AUTH_TOKEN_KEY
} from '../services/myPitchforkAPI'

import { Account } from '../services/accessService'
import useLocalStorage from '../hooks/useLocalStorage'
import myService from '../services/myService'

type AuthContextType = {
    authToken: string | null,
    authAccount?: Account,
    isAuth: boolean,
    fetching: boolean,
    hasCheckedLocalAuth: boolean,
    didFirstAuth: boolean,
    login: (token: string) => Promise<AxiosResponse>,
    logout: () => void,
    authConsole: (...args: any[]) => void,
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderType = {
    children: ReactNode,
}

const AuthProvider = (props: AuthProviderType) => {
    const [authToken, setAuthToken, removeAuthToken] = useLocalStorage(LOCAL_AUTH_TOKEN_KEY, null)
    const [authAccount, setAuthAccount] = useState()
    const [didFirstAuth, setDidFirstAuth] = useLocalStorage('first-auth', false)
    const [isAuth, setIsAuth] = useState(false)
    const [hasCheckedLocalAuth, sethasCheckedLocalAuth] = useState(false)
    const [fetching, setFetching] = useState(false)

    const logout = () => {
        removeAPIAuthToken()
        removeAuthToken()
        setIsAuth(false)
    }

    const login = async (token: string) => {
        setFetching(true)
        setAPIAuthToken(token)
        return myService.getAccount()
            .then((response) => {
                const myAccount = response.data
                if (!didFirstAuth) setDidFirstAuth(true)
                setIsAuth(true)
                setAuthToken(token)
                setAuthAccount(myAccount)
                return response
            })
            .catch((error) => {
                logout()
                return Promise.reject(error)
            })
            .finally(() => setFetching(false))
    }

    const authConsole = (...args: any[]) => {
        if (isAuth) console.log(args)
    }

    const checkLocalAuthData = async () => {
        return login(authToken)
            .then((response) => {
                if (response.status == 200) console.log('LOCAL AUTH LOGIN')
                return response
            })
            .catch((error) => {
                console.log('LOCAL AUTH LOGIN FAILED')
                return error
            })
            .finally(() => sethasCheckedLocalAuth(true))
    }

    useEffect(() => {
        if (authToken) checkLocalAuthData()
        else sethasCheckedLocalAuth(true)
    }, [])

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authAccount,
                isAuth,
                fetching,
                hasCheckedLocalAuth,
                didFirstAuth,
                login,
                logout,
                authConsole
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }