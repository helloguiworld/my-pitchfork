import { ChangeEvent, useEffect } from 'react'

import { FaRankingStar } from "react-icons/fa6"

import Page from '../../components/Page'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import AlbumsList from '../../components/AlbumsList'
import Error429 from '../../components/Error429'
import Notice from '../../components/Notice'
import Banner from '../../components/Banner'

import Squares from "react-activity/dist/Squares"

import useSearch from '../../hooks/useSearch'
import useRanking from '../../hooks/useRanking'
import clickService from '../../services/clickService'
import useLocalStorage from '../../hooks/useLocalStorage'

import './styles.scss'
// export type SearchPageProps = {
// }

export default function SearchPage() {
    const [searchMode, setSearchMode] = useLocalStorage<'search' | 'ranking'>('search-list-mode', 'ranking')
    const [searchQ, setSearchQ] = useLocalStorage<string>('search-q', '')

    const { searchResults, lastSearchQ, fetching: fetchingSearch, error: searchError, searchAlbums } = useSearch()
    const { ranking, fetching: fetchingRanking, readRanking } = useRanking()

    async function performSearch() {
        if (searchQ && !fetchingSearch && !fetchingRanking) {
            const cleanSearchQ = searchQ.trimEnd()
            setSearchQ(cleanSearchQ)
            const response = await searchAlbums(cleanSearchQ)
            if (response?.status == 200) await clickService.postSearchClick(cleanSearchQ)
        }
    }

    async function handleAlbumSearch() {
        setSearchMode('search')
        performSearch()
    }

    useEffect(() => {
        if (searchMode == 'ranking') readRanking()
    }, [])

    return (
        <Page id='search-page' banners={['news', 'ranking']}>
            {
                searchError?.response?.status == 429 ?
                    <Error429 /> :
                    <>
                        <div className="search-header">
                            <SearchBar
                                value={searchQ}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setSearchQ(event.target.value.toLowerCase())
                                }}
                                onSubmit={handleAlbumSearch}
                                onClick={() => {
                                    if (searchMode == 'search' || !searchResults?.length) performSearch()
                                    else setSearchMode('search')
                                }}
                                colorFilled={searchMode == 'search'}
                                inactive={!searchQ}
                                fetching={fetchingSearch}
                            />

                            <Button
                                biggerIcon
                                color='var(--color-yellow)'
                                colorFilled={searchMode == 'ranking'}
                                onClick={() => {
                                    if (searchMode != 'ranking' && !fetchingRanking && !fetchingSearch) {
                                        setSearchMode('ranking')
                                        if (!ranking) readRanking()
                                    }
                                }}
                                fetching={fetchingRanking}
                            >
                                <FaRankingStar />
                            </Button>
                        </div>

                        {
                            searchMode == 'search' ?
                                fetchingSearch ?
                                    <Squares className='spaced' />
                                    : searchResults?.length > 0 ?
                                        <AlbumsList
                                            message={`your last search results for "${lastSearchQ}"`}
                                            albums={searchResults}
                                            footerContent={
                                                <Banner color='#275ac7'>
                                                    <p className='title'>Can't find a new release? 🔍</p>
                                                    <p>It might take a few hours for <strong>new albums</strong> to show up. Try again soon! ⏳😉</p>
                                                </Banner>
                                            }
                                        />
                                        :
                                        <Notice
                                            items={[
                                                "NO ALBUM LISTED",
                                            ]}
                                        />
                                :
                                fetchingRanking ?
                                    <Squares className='spaced' />
                                    : (ranking && ranking?.length > 0) ?
                                        <AlbumsList
                                            ranking
                                            message={`TOP#${ranking.length} new releases`}
                                            albums={ranking.map(item => item.album)}
                                        />
                                        :
                                        <Notice
                                            items={[
                                                "NO ALBUM RANKED",
                                            ]}
                                        />
                        }
                    </>
            }
        </Page>
    )
}
