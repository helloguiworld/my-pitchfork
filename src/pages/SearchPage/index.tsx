import { useState, ChangeEvent } from 'react'

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

    const { albums, fetching, error, searchAlbums } = useAlbums()

    return (
        <Page id='search-page'>
            <div className="search">
                <input
                    type='text'
                    placeholder='Search'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQ(event.target.value)}
                />
                <Button onClick={() => searchAlbums(searchQ)}>SEARCH</Button>
            </div>

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
