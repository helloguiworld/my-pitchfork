import { Profile } from '../../../../hooks/useProfile'

import MyHeader from './components/MyHeader'
import ProfileOwnerButtons from './components/ProfileOwnerButtons'
import ReviewsList from '../../../../components/ReviewsList'
import Banner from '../../../../components/Banner'

export type MyProfileProps = {
    profile: Profile
}

export default function MyProfile(props: MyProfileProps) {
    const IS_ACCOUNT_OWNER = props.profile.is_account_owner

    const NEW_RELEASES_MIN = props.profile.min_new_releases_to_unlock
    const LATEST_MIN = props.profile.min_latest_to_unlock

    const newReleasesLeftMessage = props.profile.new_releases.length > 0 ? <>You need <strong>{NEW_RELEASES_MIN - props.profile.new_releases.length} more</strong>. 🔑</> : <>You have <strong>none</strong> yet. 👀</>
    const latestLeftMessage = props.profile.latest.length > 0 ? <>You need <strong>{LATEST_MIN - props.profile.latest.length} more</strong>. 🔑</> : <>You have <strong>none</strong> yet. 👀</>

    return (
        <>
            <MyHeader
                account={props.profile.account}
                reviewsCount={props.profile.reviews_count}
                content={
                    (IS_ACCOUNT_OWNER) ?
                        <ProfileOwnerButtons /> : undefined
                }
            />

            {
                props.profile.new_releases.length >= NEW_RELEASES_MIN ?
                    <ReviewsList
                        reviews={props.profile.new_releases}
                        count
                        small
                        headerTitle='New Releases'
                    />
                    : (
                        IS_ACCOUNT_OWNER &&
                        <Banner>
                            <p className='title'>New Releases Reviews 🔒</p>
                            <p>Review <strong>{NEW_RELEASES_MIN} albums or tracks from the last 4 weeks</strong> to unlock this feature. {newReleasesLeftMessage}</p>
                        </Banner>
                    )
            }

            {
                props.profile.latest.length >= LATEST_MIN ?
                    <ReviewsList
                        reviews={props.profile.latest}
                        count
                        small
                        headerTitle='Latest Reviews'
                        footerContent={
                            props.profile.latest.length == 20 ?
                                <Banner>
                                    <p>Soon, you’ll be able to see <strong>all your reviews</strong>. 🙏🏼</p>
                                </Banner>
                                : undefined
                        }
                    />
                    : (
                        IS_ACCOUNT_OWNER &&
                        <Banner>
                            <p className='title'>Latest Reviews 🔒</p>
                            <p>Review <strong>{LATEST_MIN} albums or tracks</strong> to unlock this feature. {latestLeftMessage}</p>
                        </Banner>
                    )
            }

            {
                IS_ACCOUNT_OWNER &&
                <div className="group">
                    <Banner color='var(--color-blue)'>
                        <p className='title'>This is just the beginning!</p>
                        <p>New features <strong>coming soon</strong>. ✨</p>
                    </Banner>
                    <Banner color='var(--color-yellow)'>
                        <p className='title'>This page is under construction 🏗️</p>
                        <p>If you have any issues, <strong><a href="mailto:mypitchfork.fun@gmail.com">contact us</a></strong>.</p>
                    </Banner>
                </div>
            }
        </>
    )
}
