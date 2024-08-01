import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'
// import { useNavigate } from 'react-router-dom'

import { Profile } from '../../../../hooks/useProfile'

import MyHeader from './components/MyHeader'
import ProfileOwnerButtons from './components/ProfileOwnerButtons'
import ReviewsList from '../../../../components/ReviewsList'

// import Button from '../../../../components/Button'

import './styles.scss'
export type MyProfileProps = {
    profile: Profile
}

export default function MyProfile(props: MyProfileProps) {
    const authContext = useContext(AuthContext)

    // const navigate = useNavigate()

    return (
        <>
            <MyHeader
                account={props.profile.account}
                reviewsCount={props.profile.reviews_count}
                content={
                    (props.profile.is_account_owner && authContext?.isAuth) ?
                        <ProfileOwnerButtons /> : undefined
                }
            />

            {
                props.profile.latest.length > 0 &&
                <>
                    <ReviewsList
                        reviews={props.profile.latest}
                        small
                        headerTitle='Latest'
                    />
                </>
            }
        </>
    )
}
