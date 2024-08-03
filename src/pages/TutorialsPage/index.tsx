import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import Page from '../../components/Page'
import Button from '../../components/Button'
import UseExample from '../../components/UseExample'

import { useNavigate, Navigate } from 'react-router-dom'

import saveReviewButtonImg from '../../assets/images/tutorials/save review button.jpeg'
import reviewIsUpdatedImg from '../../assets/images/tutorials/review is updated.jpeg'
import saveReviewImg from '../../assets/images/tutorials/save review.jpeg'

import myPageImg from '../../assets/images/tutorials/my page.jpeg'
import myReviewsListImg from '../../assets/images/tutorials/my reviews list.jpeg'
import myShareImg from '../../assets/images/tutorials/my share.jpeg'

import './styles.scss'
export type TutorialsPageProps = {
    free?: boolean,
}

export default function TutorialsPage(props: TutorialsPageProps) {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <Page id='tutorials-page' hideHeader hideBanners>
            {
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
                            texts={['When your review is saved and updated, you will see the message REVIEW IS UPDATED.']}
                            img={reviewIsUpdatedImg}
                        />

                        <UseExample
                            spacedTop
                            title='My Page'
                            description='A space just for you 🌟'
                            texts={['We are gradually expanding the ways you can use myPitchfork.']}
                            img={myPageImg}
                        />
                        <UseExample
                            spacedBottom
                            texts={['For this, it\'s extremely important that you SAVE your REVIEWS! They will be the foundation for your future features. ✨']}
                            img={myReviewsListImg}
                        />
                        {
                            authContext?.authAccount &&
                            <UseExample
                                spacedBottom
                                description='Share your page! 📲'
                                texts={[
                                    'You can share your myPitchfork page with everyone. Just use your link:',
                                    `🔗 mypitchfork.fun/my/${authContext?.authAccount?.user.username}`
                                ]}
                                img={myShareImg}
                            />
                        }

                        <Button
                            color='var(--color-blue)'
                            onClick={() => navigate('/my')}
                        >
                            I GOT IT!
                        </Button>
                    </>
                    :
                    <Navigate to='/login' replace />
            }
        </Page>
    )
}
