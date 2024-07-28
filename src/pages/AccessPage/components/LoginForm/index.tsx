import { useState, FormEvent, useContext } from 'react'

import { AuthContext } from '../../../../contexts/AuthContext'

import Button from "../../../../components/Button"
import FormInput from '../../../../components/FormInput'

import normalizeUsername from '../../../../functions/normalizeUsername'
import { useNavigate } from 'react-router-dom'
import useAccess from '../../../../hooks/useAccess'

// import './styles.scss'
// export type LoginFormProps = {
// }
export type LoginError = {
    [key: string]: string[],
}

export default function LoginForm() {
    const authContext = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const {
        fetching,
        errors,
        generalErrors,
        login,
    } = useAccess()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const response = await login(username, password)
        if (response?.status == 200)
            navigate('/search')
    }

    return (
        <>
            {
                authContext?.isAuth ?
                    <>
                        <div className="title">
                            <h1>Hello!</h1>
                            <h2>You are logged in 🔑</h2>
                        </div>

                        < Button
                            type='submit'
                            color={"#ff9876"}
                            onClick={() => {
                                authContext.logout()
                            }}
                        >
                            LOGOUT
                        </Button>
                    </>
                    :
                    <>
                        <div className="title">
                            <h1>OMG hiiii!</h1>
                            <h2>We've missed you 😊</h2>
                        </div>

                        <form className='login' onSubmit={handleSubmit}>
                            <FormInput
                                type="text"
                                id="username"
                                placeholder='enter your username'
                                label='Username'
                                value={username}
                                onChange={(e) => setUsername(normalizeUsername(e.target.value))}
                                required
                                errors={errors.username}
                                generalErrors={generalErrors}
                            />
                            <FormInput
                                type="password"
                                id="password"
                                placeholder='enter your ********'
                                label='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                errors={errors.password}
                                generalErrors={generalErrors}
                                showGeneralErrors
                            />

                            <Button
                                type='submit'
                                colorFilled
                                fetching={fetching}
                            >
                                LOGIN
                            </Button>
                        </form >

                        <Button
                            type='button'
                            color={"#193caf"}
                            onClick={() => navigate('/register')}
                        >
                            SIGN UP
                        </Button>
                    </>
            }
        </>
    )
}
