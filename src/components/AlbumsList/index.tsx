// import { } from 'react'

import { Album } from '../../services/spotifyServices'

import AlbumCard from './AlbumCard'

import './styles.scss'
export type AlbumsListProps = {
    message?: string
    albums: Album[]
    small?: boolean
    headerTitle?: string
    headerContent?: JSX.Element | JSX.Element[]
    footerContent?: JSX.Element | JSX.Element[]
}

export default function AlbumsList(props: AlbumsListProps) {
    return (
        <div className="albums-list">
            {
                (props.headerTitle || props.headerContent) &&
                <div className="albums-list-header">
                    {props.headerTitle && <p className='title'>{props.headerTitle}</p>}
                    {props.headerContent}
                </div>
            }

            {props.message && <span className='list-message'>{props.message}</span>}

            {props.albums.map((album: Album) =>
                <AlbumCard
                    album={album}
                    small={props.small}
                    key={album.id}
                />
            )}

            {props.footerContent}
        </div>
    )
}
