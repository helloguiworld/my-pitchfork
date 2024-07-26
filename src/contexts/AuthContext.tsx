import { createContext, ReactNode, useState, useEffect } from 'react'
import { setAPIAuthToken, removeAPIAuthToken } from '../services/myPitchforkAPI'

import useLocalStorage from '../hooks/useLocalStorage'

type AuthContextType = {
    authToken: string | null,
    isAuth: boolean,
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
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if (authToken) {
            setAPIAuthToken(authToken)
            setAuthToken(authToken)
            setIsAuth(true)
        }
    }, [authToken])

    const login = (token: string) => {
        setAPIAuthToken(token)
        setAuthToken(token)
    }

    const logout = () => {
        removeAPIAuthToken()
        removeAuthToken()
        setIsAuth(false)
    }

    const authConsole = (...args: any[]) => {
        if (isAuth) console.log(args)
    }

    return (
        <AuthContext.Provider value={{ authToken, isAuth, login, logout, authConsole }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }