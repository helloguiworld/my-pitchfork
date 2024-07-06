import { useState, useRef, FormEvent, ChangeEvent } from 'react'

import Page from '../../components/Page'
import Button from '../../components/Button'
import AlbumCard from '../../components/AlbumCard'

import Squares from "react-activity/dist/Squares"

import useAlbums from '../../hooks/useAlbums'
import { Album } from '../../services/spotifyService'

import './styles.scss'
export type SearchPageProps = {
}

export default function SearchPage(props: SearchPageProps) {
    const [searchQ, setSearchQ] = useState<string>('')
    const searchInputRef = useRef<HTMLInputElement>(null);

    const { albums, fetching, error, searchAlbums } = useAlbums()

    function handleAlbumSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (searchInputRef.current)
            searchInputRef.current.blur()
        searchAlbums(searchQ)
    }

    return (
        <Page id='search-page'>
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
                        : albums?.length ?
                            albums.map((album: Album) => <AlbumCard album={album} key={album.id} />)
                            : <span>NO ALBUM LISTED</span>
                }
            </div>
        </Page>
    )
}
