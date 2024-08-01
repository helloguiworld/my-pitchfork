import { useRef, FormEvent, ChangeEvent } from 'react'

import Page from '../../components/Page'
import Button from '../../components/Button'
import AlbumsList from '../../components/AlbumsList'
import Error429 from '../../components/Error429'
import Notice from '../../components/Notice'
import Banner from '../../components/Banner'

import Squares from "react-activity/dist/Squares"

import useSearch from '../../hooks/useSearch'
import clickServices from '../../services/clickServices'
import useLocalStorage from '../../hooks/useLocalStorage'

import './styles.scss'
// export type SearchPageProps = {
// }

export default function SearchPage() {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { searchResults, lastSearchQ, fetching, error, searchAlbums } = useSearch()

    const [searchQ, setSearchQ] = useLocalStorage('search-q', '')

    async function handleAlbumSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (searchQ && !fetching) {
            searchInputRef.current?.blur()
            const response = await searchAlbums(searchQ)
            if (response?.status == 200) await clickServices.postSearchClick(searchQ)
        }
    }

    return (
        <Page id='search-page' banners={['news']}>
            {
                error?.response?.status == 429 ?
                    <Error429 /> :
                    <>
                        <form className="album-search" onSubmit={handleAlbumSearch}>
                            <input
                                type='text'
                                placeholder='album or artist'
                                maxLength={50}
                                value={searchQ}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQ(event.target.value.toLowerCase())}
                                ref={searchInputRef}
                            />
                            <Button
                                type='submit'
                                inactive={!searchQ}
                                fetching={fetching}
                            >
                                SEARCH
                            </Button>
                        </form >

                        {
                            fetching ?
                                <Squares className='spaced' />
                                : searchResults?.length > 0 ?
                                    <AlbumsList
                                        message={`your last search results for ${lastSearchQ}`}
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
                        }
                    </>
            }
        </Page>
    )
}
