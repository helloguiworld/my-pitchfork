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
    login: (token: string) => void,
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
    const [fetching, setFetching] = useState(false)

    const logout = () => {
        removeAPIAuthToken()
        removeAuthToken()
        removeAuthAccount()
        setIsAuth(false)
    }

    const login = async (token: string) => {
        setAPIAuthToken(token)
        setFetching(true)
        return myServices.getAccount()
            .then((response) => {
                const myAccount = response.data
                setAuthToken(token)
                setAuthAccount(myAccount)
                setIsAuth(true)
                return myAccount
            })
            .catch((error) => {
                logout()
                return false
            })
            .finally(() => setFetching(false))
    }

    const authConsole = (...args: any[]) => {
        if (isAuth) console.log(args)
    }

    useEffect(() => {
        if (authToken) login(authToken)
    }, [authToken])

    return (
        <AuthContext.Provider
            value={{
                authToken,
                authAccount,
                isAuth,
                fetching,
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