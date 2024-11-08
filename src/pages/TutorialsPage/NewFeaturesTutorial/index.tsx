import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext'

import UseExample from '../../../components/UseExample'
import Button from '../../../components/Button'

import reviewUpdatedImg from '../../../assets/images/tutorials/review updated.jpeg'
import reviewTextImg from '../../../assets/images/tutorials/review text.jpeg'

import myShareImg from '../../../assets/images/tutorials/my share.jpeg'

import followImg from '../../../assets/images/tutorials/follow.jpeg'
import feedImg from '../../../assets/images/tutorials/feed.jpeg'


// import './styles.scss'
export type NewFeaturesTutorialProps = {
    free?: boolean,
}

export default function NewFeaturesTutorial(props: NewFeaturesTutorialProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        (props.free || authContext?.isAuth) ?
            <>
                <div className='tutorials-header'>
                    <h2>We have some</h2>
                    <h1 className='my-pitchfork'>New Features!</h1>
                    <p>Are you ready to connect? 👀</p>
                </div>

                <UseExample
                    title='Reviews'
                    description='Now you can add flair and share your thoughts! ✍️'
                    img={reviewUpdatedImg}
                />
                <UseExample
                    texts={['It\'s optional, and you can save without it.']}
                    img={reviewTextImg}
                    spacedBottom
                />

                <UseExample
                    title='Feed'
                    description='Connect and share 📢'
                    texts={['Your homepage now features your feed, with the latest reviews from your community.']}
                    img={feedImg}
                />
                <UseExample
                    description='Create your community 👥'
                    texts={['Follow your friends and see what they’re vibing about! 🎧']}
                    img={followImg}
                />
                {
                    authContext?.authAccount &&
                    <UseExample
                        description='How to follow?'
                        texts={[
                            'You can follow an account on its page.',
                            'Share your page link with others and ask them to send you theirs:',
                            `🔗 mypitchfork.fun/my/${authContext?.authAccount?.user.username}`,
                        ]}
                        img={myShareImg}
                        spacedBottom
                    />
                }


                <Button
                    color='var(--color-blue)'
                    onClick={() => navigate(-1)}
                >
                    I GOT IT!
                </Button>

                <UseExample
                    title='Spoilers'
                    description={'Whats\'s next? 👀'}
                    textCenter
                    />
                <UseExample
                    description={'Album reviews'}
                    texts={['See all the reviews for an album.']}
                    textCenter
                    />
                <UseExample
                    description={'Like ❤️'}
                    texts={['React to reviews.']}
                    textCenter
                    />
                <UseExample
                    description={'Search accounts'}
                    texts={['Easily search for accounts by usernames.']}
                    textCenter
                    />
                <UseExample
                    description={'Delete review'}
                    texts={['Delete a review you made.']}
                    textCenter
                    />
                <UseExample
                    description={'Account'}
                    texts={['Update your informations, reset your password, or delete your account.']}
                    spacedBottom
                    textCenter
                />
            </>
            :
            <Navigate to='/login' replace />
    )
}
