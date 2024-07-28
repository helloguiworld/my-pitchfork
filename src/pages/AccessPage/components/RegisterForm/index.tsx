import { useState, FormEvent } from 'react'

import Button from "../../../../components/Button"
import FormInput from '../../../../components/FormInput'

import { useNavigate } from 'react-router-dom'
import useAccess from '../../../../hooks/useAccess'
import normalizeUsername from '../../../../functions/normalizeUsername'

// import './styles.scss'
// export type RegisterFormProps = {
// }
export type RegisterError = {
    [key: string]: string[],
}

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>()

    const navigate = useNavigate()

    const {
        fetching,
        userErrors,
        generalErrors,
        cleanErrors,
        login,
        register,
    } = useAccess()

    function checkPasswords(password: string, passwordConfirmation: string) {
        if (password == passwordConfirmation) {
            setPasswordConfirmationErrors(undefined)
            return true
        }
        setPasswordConfirmationErrors(['Passwords do not match.'])
        return false
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        cleanErrors()
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
        const response = await register(newAccount)
        if (response?.status == 201) {
            const response = await login(username, password)
            if (response?.status == 200) navigate('/tutorials/account')
            else navigate('/login')
        }
    }

    return (
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
                    onChange={(e) => setUsername(normalizeUsername(e.target.value))}
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
                    message='important for future password reset'
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
                    colorFilled
                    fetching={fetching}
                >
                    CREATE MY ACCOUNT
                </Button>
            </form >

            <Button
                type='button'
                onClick={() => navigate('/login')}
            >
                I ALREADY HAVE ONE!
            </Button>
        </>
    )
}
