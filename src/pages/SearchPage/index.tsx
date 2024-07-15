import { useRef, useEffect, FormEvent, ChangeEvent } from 'react'

import Page from '../../components/Page'
import Button from '../../components/Button'
import AlbumCard from '../../components/AlbumCard'
import Error429 from '../../components/Error429'
import Notice from '../../components/Notice'

import Squares from "react-activity/dist/Squares"

import useAlbums from '../../hooks/useAlbums'
import { Album } from '../../services/spotifyService'
import useLocalStorage from '../../hooks/useLocalStorage'

import './styles.scss'
// export type SearchPageProps = {
// }

export default function SearchPage() {
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { albums, fetching, error, searchAlbums } = useAlbums()

    const [searchQ, setSearchQ] = useLocalStorage('search-q', "")

    function handleAlbumSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        searchInputRef.current?.blur()
        searchAlbums(searchQ)
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
                        <form className="album-search" onSubmit={handleAlbumSearch}>
                            <input
                                type='text'
                                placeholder='Search'
                                value={searchQ}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQ(event.target.value)}
                                ref={searchInputRef}
                            />
                            <Button type='submit'>SEARCH</Button>
                        </form >

                        <div className="albums">
                            {
                                fetching ?
                                    <Squares />
                                    : albums?.length > 0 ?
                                        albums.map((album: Album) => <AlbumCard album={album} key={album.id} />)
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
