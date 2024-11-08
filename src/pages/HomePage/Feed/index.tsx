import { useContext, useEffect } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

import { Squares } from 'react-activity'
import FeedItem from './FeedItem'
import Notice from '../../../components/Notice'
import Button from '../../../components/Button'

import useFeed from '../../../hooks/useFeed'

import './styles.scss'
export type FeedProps = {
}

export default function Feed(props: FeedProps) {
    const authContext = useContext(AuthContext)

    const {
        feedReviews,
        fetching,
        error,
        nextPage,
        fetchingMore,
        readFeed,
    } = useFeed()

    useEffect(() => {
        if (authContext?.isAuth) readFeed()
    }, [authContext?.isAuth])

    return (
        <>
            <div id="feed">
                <div className="title">
                    <p className='title'>Feed</p>
                    <p className='subtitle'>Explore last reviews from your community</p>
                </div>

                {
                    fetching ?
                        <Squares />
                        :
                        feedReviews?.length ?
                            <section id='feed-list'>
                                {
                                    feedReviews?.map((feedReview, index) => (
                                        <FeedItem
                                            key={index}
                                            feedReview={feedReview}
                                        />
                                    ))
                                }

                                {
                                    nextPage &&
                                    <Button
                                        color={'var(--color-blue)'}
                                        fetching={fetchingMore}
                                        onClick={() => { readFeed((nextPage)) }}
                                    >
                                        <span>LOAD MORE</span>
                                    </Button>
                                }
                            </section>
                            :
                            <Notice>
                                <p className="title">NO REVIEW TO SHOW</p>
                                <p>Start reviewing or follow other accounts to see their reviews</p>
                            </Notice>
                }
            </div>
        </>
    )
}
