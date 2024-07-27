import { useState, FormEvent, useContext, useEffect } from 'react'

import { AuthContext } from '../../../../contexts/AuthContext'

import Button from "../../../../components/Button"
import FormInput from '../../../../components/FormInput'

import { useNavigate } from 'react-router-dom'
import useAccess from '../../../../hooks/useAccess'

// import './styles.scss'
// export type RegisterFormProps = {
// }
export type RegisterError = {
    [key: string]: string[],
}

export default function RegisterForm() {
    const authContext = useContext(AuthContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    // const [errors, setErrors] = useState<RegisterError>({})
    // const [userErrors, setUserErrors] = useState<RegisterError>({})
    // const [generalErrors, setGeneralErrors] = useState<string[]>()
    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>()
    // const [fetching, setFetching] = useState(false)

    const navigate = useNavigate()

    const {
        fetching,
        errors,
        userErrors,
        generalErrors,
        register,
    } = useAccess()

    function checkPasswords(password: string, passwordConfirmation: string) {
        console.log(password, passwordConfirmation)
        if (password == passwordConfirmation) {
            setPasswordConfirmationErrors(undefined)
            return true
        }
        setPasswordConfirmationErrors(['Passwords do not match.'])
        return false
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (!checkPasswords(password, passwordConfirmation))
            return

        const newAccount = {
            user: {
                username,
                password,
                email,
                name,
            }
        }
        console.log(newAccount)
        const response = await register(newAccount)
        if (response?.status == 201) {
            console.log('NEW USER', response.data)
        }
    }

    return (
        <>
            {
                authContext?.isAuth ?
                    <>
                        <div className="title">
                            <h1>Hello!</h1>
                            <h2>you are logged in</h2>
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
                            <h1>New here?</h1>
                            <h2>Let's get you started 😃</h2>
                        </div>

                        <form className='login' onSubmit={handleSubmit}>
                            <FormInput
                                id="username"
                                placeholder='enter your @username'
                                label='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                errors={userErrors.username}
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
                                errors={userErrors.password}
                                generalErrors={generalErrors}
                            />
                            <FormInput
                                type="password"
                                id="password-confirmation"
                                placeholder='repeat your ********'
                                label='Password confirmation'
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                                errors={passwordConfirmationErrors}
                                errorColor="#FFAB08"
                            />
                            <FormInput
                                type="email"
                                id="email"
                                placeholder='enter your email'
                                label='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                errors={userErrors.email}
                                generalErrors={generalErrors}
                            />
                            <FormInput
                                id="name"
                                placeholder='enter your name'
                                label='Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                errors={userErrors.name}
                                generalErrors={generalErrors}
                            />

                            <Button
                                type='submit'
                                color="#193caf"
                                fetching={fetching}
                            >
                                REGISTER
                            </Button>
                        </form >
                    </>
            }
        </>
    )
}
