import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext'

import UseExample from '../../../components/UseExample'
import Button from '../../../components/Button'

import deleteButtonImg from '../../../assets/images/tutorials/delete button.jpeg'
import deleteReviewImg from '../../../assets/images/tutorials/delete review.jpeg'

import reviewSectionImg from '../../../assets/images/tutorials/review section.jpeg'
import searchImg from '../../../assets/images/tutorials/search.jpeg'

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
                    <h2>Check out our</h2>
                    <h1 className='my-pitchfork'>Latest Updates!</h1>
                    {/* <p>Are you ready to connect? 👀</p> */}
                </div>

                <UseExample
                    title='Keep It Tidy'
                    titleText={['Not happy with a review?']}
                    description='Just hit DELETE 🗑️'
                    img={deleteButtonImg}
                />
                <UseExample
                    texts={['You can find the DELETE REVIEW button at the bottom of your review section.']}
                    img={deleteReviewImg}
                    spacedBottom
                />

                <UseExample
                    title='Explore the Artist'
                    description='Discover more with just one click! 👆'
                    texts={['In a review page, click the artist\'s name to instantly search for it.']}
                    img={reviewSectionImg}
                />
                <UseExample
                    texts={['This way, you\'ll easily find a variety of related content.']}
                    img={searchImg}
                    spacedBottom
                />

                <UseExample
                    title='Reviews'
                    description='You can add flair and share your thoughts! ✍️'
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
                    texts={['Your homepage features your feed, with the latest reviews from your community.']}
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
                            'You can follow an account on its profile page.',
                            'Share your profile page link with others and ask them to send you theirs:',
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
                    description={'Account'}
                    texts={['Update your informations, reset your password, delete your account.']}
                    spacedBottom
                    textCenter
                />
            </>
            :
            <Navigate to='/login' replace />
    )
}
