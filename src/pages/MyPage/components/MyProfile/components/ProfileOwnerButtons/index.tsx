import { useContext } from 'react'
import { AuthContext } from '../../../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

import Button from '../../../../../../components/Button'

import './styles.scss'
// export type ProfileButtonsProps = {
// }

export default function ProfileOwnerButtons() {
    const authContext = useContext(AuthContext)
    
    const navigate = useNavigate()
    
    return (
        <div className='my-profile-owner-buttons'>
            <Button
                className={'logout'}
                color="var(--color-blue)"
                colorFilled
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
