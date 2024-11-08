import { useContext } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import { AuthContext } from '../../../contexts/AuthContext'

import UseExample from '../../../components/UseExample'
import Button from '../../../components/Button'

import saveReviewButtonImg from '../../../assets/images/tutorials/save review button.jpeg'
import reviewUpdatedImg from '../../../assets/images/tutorials/review updated.jpeg'
import reviewTextImg from '../../../assets/images/tutorials/review text.jpeg'
import saveReviewImg from '../../../assets/images/tutorials/save review.jpeg'

import myPageImg from '../../../assets/images/tutorials/my page.jpeg'
import myReviewsListImg from '../../../assets/images/tutorials/my reviews list.jpeg'
import myShareImg from '../../../assets/images/tutorials/my share.jpeg'

import followImg from '../../../assets/images/tutorials/follow.jpeg'
import feedImg from '../../../assets/images/tutorials/feed.jpeg'

export type NewAccountTutorialProps = {
    free?: boolean,
}

export default function NewAccountTutorial(props: NewAccountTutorialProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        (props.free || authContext?.isAuth) ?
            <>
                <div className='tutorials-header'>
                    <h2>Hello 👋😊</h2>
                    <h1 className='my-pitchfork'>{authContext?.authAccount?.user.name}</h1>
                    <p>Here are some important informations you need to know now that you have a <strong>myPitchfork</strong> account.</p>
                </div>

                <UseExample
                    title='Reviews'
                    description='You have a new feature!'
                    texts={['Now you can save reviews 🎉']}
                    img={saveReviewButtonImg}
                />
                <UseExample
                    texts={['After filling in the Track Scores, you must click SAVE REVIEW to save your evaluation.']}
                    img={saveReviewImg}
                />
                <UseExample
                    texts={[
                        'Add flair and share your thoughts! ✍️',
                        'It\'s optional, and you can save without it.'
                    ]}
                    img={reviewTextImg}
                />
                <UseExample
                    texts={['When your review is saved and updated, you will see the message REVIEW UPDATED.']}
                    img={reviewUpdatedImg}
                    spacedBottom
                />

                <UseExample
                    title='My Page'
                    description='A space just for you 🌟'
                    texts={['We are gradually expanding the ways you can use myPitchfork.']}
                    img={myPageImg}
                />
                <UseExample
                    texts={['For this, it\'s extremely important that you SAVE your REVIEWS! They will be the foundation for your future features. ✨']}
                    img={myReviewsListImg}
                    spacedBottom
                />
                {
                    authContext?.authAccount &&
                    <UseExample
                        description='Share your page! 📲'
                        texts={[
                            'You can share your myPitchfork page link with everyone:',
                            `🔗 mypitchfork.fun/my/${authContext?.authAccount?.user.username}`
                        ]}
                        img={myShareImg}
                        spacedBottom
                    />
                }

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
                    spacedBottom
                />

                <Button
                    color='var(--color-blue)'
                    onClick={() => navigate('/my')}
                >
                    I GOT IT!
                </Button>
            </>
            :
            <Navigate to='/login' replace />
    )
}
