import Page from '../../components/Page'
import Button from '../../components/Button'
import UseExample from '../../components/UseExample'

import { useNavigate } from 'react-router-dom'

import searchImg from '../../assets/images/home/search.png'
import trackScoresImg from '../../assets/images/home/track scores.png'
import albumReviewImg from '../../assets/images/home/album review.png'

import './styles.scss'
// export type HomePageProps = {
// }

export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Page id='home-page' banners={['news']}>
            <div className='main'>
                <h2>Welcome to</h2>
                <h1 className='my-pitchfork'>myPitchfork</h1>
                <p>explore, rate and share music with the world</p>
                <Button color={"#ff3530"} onClick={() => navigate('/search')}>START NOW!</Button>
            </div>

            <UseExample
                title='1. Search'
                description='for albums'
                img={searchImg}
            />
            <UseExample
                title='2. Rate'
                description='the tracks'
                img={trackScoresImg}
            />
            <UseExample
                title='3. Share'
                description='with the world'
                img={albumReviewImg}
            />

            <Button color={"#ff3530"} onClick={() => navigate('/search')}>GO TO SEARCH</Button>
        </Page>
    )
}
