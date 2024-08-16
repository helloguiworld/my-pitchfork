import Button from '../../../../../../components/Button'

import './styles.scss'
export type ProfileAuthButtonsProps = {
    isFollowing: boolean
    isFollowedBy: boolean
    fetchingFollow: boolean
    follow: Function
    unfollow: Function
}

export default function ProfileAuthButtons(props: ProfileAuthButtonsProps) {
    return (
        <div className='my-profile-auth-buttons'>
            <Button
                className={props.isFollowing ? 'unfollow' : 'follow'}
                color={props.isFollowing ? 'var(--color-blue)' : undefined}
                colorFilled={props.isFollowing}
                onClick={() => {
                    if (!props.fetchingFollow) {
                        if (props.isFollowing)
                            props.unfollow()
                        else
                            props.follow()
                    }
                }}
                fetching={props.fetchingFollow}
            >
                <span>
                    {
                        props.isFollowing ?
                            props.isFollowedBy ?
                                "MUTUALS"
                                :
                                "FOLLOWING"
                            :
                            "FOLLOW"
                    }
                </span>
            </Button >
        </div>
    )
}
