import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import Page from '../../components/Page'
import Button from '../../components/Button'
import UseExample from '../../components/UseExample'

import { useNavigate } from 'react-router-dom'

import saveReviewButtonImg from '../../assets/images/tutorials/save review button.jpeg'
import reviewIsUpdatedImg from '../../assets/images/tutorials/review is updated.jpeg'
import saveReviewImg from '../../assets/images/tutorials/save review.jpeg'

import myPageHeaderImg from '../../assets/images/tutorials/my page header.jpeg'
import myPageMessageImg from '../../assets/images/tutorials/my page message.jpeg'

import './styles.scss'
// export type HomePageProps = {
// }

export default function TutorialsPage() {
    const authContext = useContext(AuthContext)

    const navigate = useNavigate()

    return (
        <Page id='tutorials-page' hideHeader hideBanners>
            <div className='tutorials-header'>
                <h2>Hello 👋😊</h2>
                <h1 className='my-pitchfork'>{authContext?.authAccount.user.name}</h1>
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
                img={myPageHeaderImg}
            />
            <UseExample
                spacedBottom
                texts={['For this, it\'s extremely important that you remember to save your reviews! They will be the foundation for your future features. ✨']}
                img={myPageMessageImg}
            />

            <Button
                color='var(--color-blue)'
                onClick={() => navigate('/search')}
            >
                I GOT IT!
            </Button>
        </Page>
    )
}
