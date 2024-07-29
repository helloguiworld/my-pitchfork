import { useRef, useEffect, FormEvent, ChangeEvent } from 'react'

import Page from '../../components/Page'
import Button from '../../components/Button'
import AlbumCard from '../../components/AlbumCard'
import Error429 from '../../components/Error429'
import Notice from '../../components/Notice'
import Banner from '../../components/Banner'

import Squares from "react-activity/dist/Squares"

import useAlbums from '../../hooks/useAlbums'
import { Album } from '../../services/spotifyServices'
import clickServices from '../../services/clickServices'
import useLocalStorage from '../../hooks/useLocalStorage'

import './styles.scss'
// export type SearchPageProps = {
// }

export default function SearchPage() {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { albums, fetching, error, searchAlbums } = useAlbums()

    const [searchQ, setSearchQ] = useLocalStorage('search-q', "")

    async function handleAlbumSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        searchInputRef.current?.blur()
        const response = await searchAlbums(searchQ)
        if (response?.status == 200) await clickServices.postSearchClick(searchQ)
    }

    useEffect(() => {
        if (searchQ) searchAlbums(searchQ)
    }, [])

    return (
        <Page id='search-page'>
            {
                error?.response?.status == 429 ?
                    <Error429 /> :
                    <>
                        <form className="album-search" onSubmit={fetching ? undefined : handleAlbumSearch}>
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
                                fetching={fetching}
                            >
                                SEARCH
                            </Button>
                        </form >

                        <div className="albums">
                            {
                                fetching ?
                                    <Squares />
                                    : albums?.length > 0 ?
                                        <>
                                            {albums.map((album: Album) => <AlbumCard album={album} key={album.id} />)}
                                            <Banner color='#275ac7'>
                                                <p className='title'>Can't find a new release? 🔍</p>
                                                <p>It might take a few hours for <strong>new albums</strong> to show up. Try again soon! ⏳😉</p>
                                            </Banner>
                                        </>
                                        :
                                        <Notice
                                            items={[
                                                "NO ALBUM LISTED",
                                            ]}
                                        />
                            }
                        </div>
                    </>
            }
        </Page>
    )
}
