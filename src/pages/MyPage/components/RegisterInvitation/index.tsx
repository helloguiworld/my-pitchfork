// import { } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '../../../../components/Button'
import Message from '../../../../components/Message'

// import './styles.scss'
// export type RegisterInvitationProps = {
// }

export default function RegisterInvitation() {
    const navigate = useNavigate()

    return (
        <>
            <Message title='Make myPitchfork Yours!'>
                <p>How about having a place <br />where you can find all your <strong>reviews</strong>, <strong>album rankings</strong>, <strong>favorites</strong>, and <strong>more</strong>?</p>
                <p>👀🎶</p>
                <p className='special'>Sign up now to have it! 🌟</p>
            </Message>

            <Button
                className={'sign-up'}
                color="var(--color-blue)"
                colorFilled
                onClick={() => {
                    navigate('/register')
                }}
            >
                <span>SIGN UP</span>
            </Button>
        </>
    )
}
