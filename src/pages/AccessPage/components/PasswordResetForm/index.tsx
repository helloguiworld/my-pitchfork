import { useState, FormEvent } from 'react'

import Banner from '../../../../components/Banner'
import Button from "../../../../components/Button"
import FormInput from '../../../../components/FormInput'

import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import usePasswordReset from '../../../../hooks/Access/usePasswordReset'

export type RegisterError = {
    [key: string]: string[],
}

export default function PasswordResetForm() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const u_id = queryParams.get("u_id")
    const token = queryParams.get("token")

    if (!u_id || !token)
        return <Navigate to="/login" replace />

    const navigate = useNavigate()

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const [passwordConfirmationErrors, setPasswordConfirmationErrors] = useState<string[]>()

    const [passwordIsReset, setPasswordIsReset] = useState(false)
    const [invalidLink, setInvalidLink] = useState(false)

    const {
        fetching,
        generalErrors,
        cleanErrors,
        passwordReset,
    } = usePasswordReset()

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

        // @ts-ignore
        const response = await passwordReset(u_id, token, password)
        if (response?.status == 200)
            setPasswordIsReset(true)
        else if (response?.status == 404)
            setInvalidLink(true)
    }

    return (
        <>
            <div className="title">
                <h1>Time to reset!</h1>
                <h2>Enter your new password below</h2>
            </div>

            {
                invalidLink ?
                    <>
                        <Banner color='var(--color-yellow)'>
                            <p className='title'>Invalid link ⚠️</p>
                            <p>Please try requesting a new one.</p>
                        </Banner>

                        <Button
                            type='button'
                            color='var(--color-yellow)'
                            onClick={() => navigate('/forgot-password')}
                        >
                            REQUEST NEW LINK
                        </Button>
                    </>
                    :
                    passwordIsReset ?
                        <Banner color='var(--color-blue)'>
                            <p className='title'>Your password has been reset 👏</p>
                            <p>Login now with your new credentials.</p>
                        </Banner>
                        :
                        <form onSubmit={handleSubmit}>
                            <FormInput
                                type="password"
                                id="password"
                                placeholder='enter your ********'
                                label='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
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
                                generalErrors={generalErrors}
                                showGeneralErrors
                            />

                            <Button
                                type='submit'
                                color="var(--color-purple)"
                                colorFilled
                                fetching={fetching}
                            >
                                RESET PASSWORD
                            </Button>
                        </form >
            }

            <Button
                type='button'
                onClick={() => navigate('/login')}
                color={passwordIsReset ? 'var(--color-blue)' : undefined}
            >
                {
                    passwordIsReset ?
                        "GO TO LOGIN"
                        :
                        "BACK TO LOGIN"
                }
            </Button>
        </>
    )
}
