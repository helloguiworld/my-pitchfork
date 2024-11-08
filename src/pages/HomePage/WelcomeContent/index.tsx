import Button from '../../../components/Button'
import UseExample from '../../../components/UseExample'

import searchImg from '../../../assets/images/home/search.png'
import trackScoresImg from '../../../assets/images/home/track scores.png'
import albumReviewImg from '../../../assets/images/home/album review.png'

import { useNavigate } from 'react-router-dom'

import './styles.scss'
export type WelcomeContentProps = {
}

export default function WelcomeContent(props: WelcomeContentProps) {
    const navigate = useNavigate()

    return (
        <div id='welcome-content'>
            <div className='main'>
                <h2>Welcome to</h2>
                <h1 className='my-pitchfork'>myPitchfork</h1>
                <p>explore, rate and share music with the world</p>
                <Button color={"var(--color-red)"} onClick={() => navigate('/search')}>START NOW!</Button>
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

            <Button color={"var(--color-red)"} onClick={() => navigate('/search')}>GO TO SEARCH</Button>
        </div >
    )
}
