import { useState, FormEvent } from 'react'

import Button from "../../../../components/Button"
import FormInput from '../../../../components/FormInput'

import { useNavigate } from 'react-router-dom'
import useForgotPassword from '../../../../hooks/Access/useForgotPassword'
import Banner from '../../../../components/Banner'

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    const navigate = useNavigate()

    const {
        fetching,
        generalErrors,
        forgotPassword,
    } = useForgotPassword()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const response = await forgotPassword(email)
        if (response?.status == 200) setEmailSent(true)
    }

    return (
        <>
            <div className="title">
                <h1>Forgot your password?</h1>
                <h2>We’ve got you covered 😉</h2>
                <p className='margin'>Enter your <b>email address</b>, and we’ll<br /> send you a link to reset your password.</p>
            </div>

            {
                emailSent ?
                    <Banner color='var(--color-purple)'>
                        <p className='title'>We've sent you a recovery email 📧</p>
                        <p>It may take a few minutes to arrive.</p>
                        <p className='little'>Please also check your <b>spam folder</b>.</p>
                    </Banner>
                    :
                    <form className='forgot-password' onSubmit={handleSubmit}>
                        <FormInput
                            type="email"
                            id="email"
                            placeholder='enter your email'
                            label='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            generalErrors={generalErrors}
                            showGeneralErrors
                        />

                        <Button
                            type='submit'
                            color={"var(--color-purple)"}
                            colorFilled
                            fetching={fetching}
                        >
                            SEND EMAIL
                        </Button>
                    </form >
            }

            <div className="buttons">
                <Button
                    onClick={() => navigate('/login')}
                >
                    BACK TO LOGIN
                </Button>
            </div>
        </>
    )
}
