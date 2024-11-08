import { useContext } from 'react'
import { AuthContext } from '../../../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import shareLink from '../../../../../../functions/shareLink'

import Button from '../../../../../../components/Button'

import './styles.scss'
export type ProfileButtonsProps = {
    username: string
}

export default function ProfileOwnerButtons(props: ProfileButtonsProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <div className='my-profile-owner-buttons'>
            <Button
                className={'my-reviews'}
                colorFilled
                onClick={() => {
                    navigate(`/my/${props.username}/reviews/`)
                }}
            >
                <span>MY REVIEWS</span>
            </Button>
            {
                Boolean(navigator.share) &&
                <Button
                    className={'share'}
                    color="var(--color-blue)"
                    colorFilled
                    onClick={() => {
                        shareLink(
                            `https://mypitchfork.fun/my/${props.username}`,
                            'My Page',
                            'Hey, check out my latest *music reviews*! 🎶',
                        )
                    }}
                >
                    <span>SHARE</span>
                </Button>
            }
            <div className="line">
                <Button
                    className={'tutorial'}
                    color="var(--color-blue)"
                    onClick={() => {
                        navigate('/tutorials/new-account')
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
        </div>
    )
}
