import { useContext } from 'react'
import { AuthContext } from '../../../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import shareLink from '../../../../../../functions/shareLink'

import Button from '../../../../../../components/Button'

import './styles.scss'
// export type ProfileButtonsProps = {
// }

export default function ProfileOwnerButtons() {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <div className='my-profile-owner-buttons'>
            {
                Boolean(navigator.share) &&
                <Button
                    className={'share'}
                    color="var(--color-blue)"
                    colorFilled
                    onClick={() => {
                        shareLink(
                            `https://mypitchfork.fun/my/${authContext?.authAccount.user.username}`,
                            'My Page',
                            'Hey, check out my latest *music reviews*! 🎶',
                        )
                    }}
                >
                    <span>SHARE</span>
                </Button>
            }
            <Button
                className={'tutorial'}
                color="var(--color-blue)"
                colorFilled={!Boolean(navigator.share)}
                onClick={() => {
                    navigate('/tutorials/account')
                }}
            >
                <span>TUTORIAL</span>
            </Button>
            <Button
                className={'logout'}
                color="var(--color-red)"
                onClick={() => {
                    authContext?.logout()
                    navigate('/')
                }}
            >
                <span>LOGOUT</span>
            </Button>
        </div>
    )
}
