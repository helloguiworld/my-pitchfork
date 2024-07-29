import { createContext, ReactNode, useState, useEffect } from 'react'

import { setAPIAuthToken, removeAPIAuthToken } from '../services/myPitchforkAPI'

import { Account } from '../services/accessServices'
import useLocalStorage from '../hooks/useLocalStorage'
import myServices from '../services/myServices'

type AuthContextType = {
    authToken: string | null,
    authAccount: Account,
    isAuth: boolean,
    fetching: boolean,
    hasCheckedLocalAuth: boolean,
    login: (token: string) => any,
    logout: () => void,
    authConsole: (...args: any[]) => void,
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderType = {
    children: ReactNode,
}

const AuthProvider = (props: AuthProviderType) => {
    const [authToken, setAuthToken, removeAuthToken] = useLocalStorage('auth-token', null)
    const [authAccount, setAuthAccount, removeAuthAccount] = useLocalStorage('auth-account', null)
    const [isAuth, setIsAuth] = useState(false)
    const [hasCheckedLocalAuth, sethasCheckedLocalAuth] = useState(false)
    const [fetching, setFetching] = useState(false)

    const logout = () => {
        removeAPIAuthToken()
        removeAuthToken()
        removeAuthAccount()
        setIsAuth(false)
    }

    const login = async (token: string) => {
        setFetching(true)
        setAPIAuthToken(token)
        return myServices.getAccount()
            .then((response) => {
                const myAccount = response.data
                setIsAuth(true)
                setAuthToken(token)
                setAuthAccount(myAccount)
                return response
            })
            .catch((error) => {
                if (error.response.status == 401)
                    logout()
                return error
            })
            .finally(() => setFetching(false))
    }

    const authConsole = (...args: any[]) => {
        if (isAuth) console.log(args)
    }

    const checkLocalAuthData = async () => {
        const response = await login(authToken)
        if (response.status == 200)
            console.log('LOCAL AUTH LOGIN')
        sethasCheckedLocalAuth(true)
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