import { useContext } from 'react'
import { AuthContext } from '../../../../contexts/AuthContext'

import { Profile } from '../../../../hooks/useProfile'

import MyHeader from './components/MyHeader'
import ProfileOwnerButtons from './components/ProfileOwnerButtons'
import ReviewsList from '../../../../components/ReviewsList'

import './styles.scss'
export type MyProfileProps = {
    profile: Profile
}

export default function MyProfile(props: MyProfileProps) {
    const authContext = useContext(AuthContext)

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
                props.profile.new_releases.length > 0 &&
                <>
                    <ReviewsList
                        reviews={props.profile.new_releases}
                        count
                        small
                        headerTitle='New Releases'
                    />
                </>
            }

            {
                props.profile.latest.length > 0 &&
                <>
                    <ReviewsList
                        reviews={props.profile.latest}
                        count
                        small
                        headerTitle='Latest Reviews'
                    />
                </>
            }
        </>
    )
}
