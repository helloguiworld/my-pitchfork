// import { } from 'react'

import Page from '../../components/Page'
import Button from '../../components/Button'
import UseExample from './components/UseExample'

import { useNavigate } from 'react-router-dom'

import searchImg from '../../assets/search.png'
import trackScoresImg from '../../assets/track scores.png'
import albumReviewImg from '../../assets/album review.png'

import './styles.scss'
export type HomePageProps = {
}

export default function HomePage(props: HomePageProps) {
    const navigate = useNavigate()

    return (
        <Page id='home-page'>
            <div className='main'>
                <h2>Welcome to</h2>
                <h1 className='my-pitchfork'>myPitchfork</h1>
                <p>Explore, rate and share music with the world</p>
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
