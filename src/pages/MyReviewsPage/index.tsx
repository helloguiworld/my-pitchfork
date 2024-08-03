import { ChangeEvent, useContext, useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import useLocalStorage from '../../hooks/useLocalStorage'

import Page from '../../components/Page'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import ReviewsList from '../../components/ReviewsList'
import Banner from '../../components/Banner'

import useReviews from '../../hooks/useReviews'

import './styles.scss'
// export type MyReviewsPageProps = {
// }
export type MyReviewsPageParams = {
    username?: string,
}

export default function MyReviewsPage() {
    const authContext = useContext(AuthContext)

    const [listMode, setListMode] = useState<'search' | 'all'>('all')
    const [searchQ, setSearchQ] = useState('')
    const [lastSearchQ, setLastSearchQ] = useLocalStorage<string>('my-reviews-search-q', '')

    const { username } = useParams<MyReviewsPageParams>()

    const { reviews, totalReviews, fetching, nextPageParams, fetchingMore, readReviews } = useReviews()

    async function performSearch(searchQ: string) {
        if (searchQ && !fetching) {
            const cleanSearchQ = searchQ.trimEnd()
            setSearchQ(cleanSearchQ)
            readReviews({ q: cleanSearchQ })
            setLastSearchQ(cleanSearchQ)
        }
    }

    async function handleAlbumSearch() {
        if (listMode != 'search') setListMode('search')
        if (searchQ) performSearch(searchQ)
    }

    useEffect(() => {
        if (authContext?.authAccount?.user.username == username)
            readReviews()
    }, [authContext?.authAccount?.user.username, username])

    useEffect(() => {
        if (lastSearchQ) setSearchQ(lastSearchQ)
    }, [])

    return (
        <Page id='my-reviews-page' hideBanners>
            {
                authContext?.isAuth && authContext?.authAccount?.user.username == username ?
                    <>
                        <Banner color='var(--color-blue)'>
                            <p className='title'>This page is under development 👨‍💻</p>
                            <p>Only you can access all your reviews for now.</p>
                        </Banner>

                        <div className="search-header">
                            <SearchBar
                                value={searchQ}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setSearchQ(event.target.value.toLowerCase())
                                }}
                                onSubmit={handleAlbumSearch}
                                colorFilled={listMode == 'search'}
                                inactive={!searchQ}
                                fetching={listMode == 'search' && fetching}
                            />
                            <Button
                                color='var(--color-blue)'
                                colorFilled={listMode == 'all'}
                                onClick={() => {
                                    if (listMode != 'all' && !fetching) {
                                        setListMode('all')
                                        readReviews()
                                    }
                                }}
                                fetching={listMode == 'all' && fetching}
                            >
                                <span>ALL</span>
                            </Button>
                        </div>

                        {
                            <ReviewsList
                                reviews={reviews}
                                small
                                headerTitle='My Reviews'
                                message={listMode == 'all' ? 'all your review history' : `search results for "${lastSearchQ}"`}
                                count={totalReviews}
                                fetching={fetching}
                                footerContent={
                                    nextPageParams ?
                                        <Button
                                        color={listMode == 'all' ? 'var(--color-blue)': undefined}
                                            fetching={fetchingMore}
                                            onClick={() => {
                                                console.log(nextPageParams)
                                                readReviews(nextPageParams)
                                            }}
                                        >
                                            <span>LOAD MORE</span>
                                        </Button>
                                        : undefined
                                }
                            />
                        }
                    </>
                    :
                    <Navigate to={`/my/${username}`} replace />
            }
        </Page>
    )
}
