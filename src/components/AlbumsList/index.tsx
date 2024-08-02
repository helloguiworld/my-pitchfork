// import { } from 'react'

import { Album } from '../../services/spotifyService'

import AlbumCard from './AlbumCard'

import './styles.scss'
export type AlbumsListProps = {
    albums: Album[]
    message?: string
    ranking?: boolean
    small?: boolean
    headerTitle?: string
    headerContent?: JSX.Element | JSX.Element[]
    footerContent?: JSX.Element | JSX.Element[]
}

export default function AlbumsList(props: AlbumsListProps) {
    function getRankingColor(position: number) {
        if (position == 1) return 'var(--color-top1)'
        if (position == 2) return 'var(--color-top2)'
        if (position == 3) return 'var(--color-top3)'
        return 'var(--color-light-grey)'
    }

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

            {props.albums.map((album: Album, index: number) =>
                <AlbumCard
                    key={album.id}
                    album={album}
                    small={props.small}
                    color={props.ranking ? getRankingColor(index + 1) : undefined}
                    extra={
                        props.ranking ?
                            <span className={'ranking-position' + (index + 1 <= 3 ? ' top3' : '')}>
                                #{index + 1}
                            </span>
                            : undefined
                    }
                />
            )}

            {props.footerContent}
        </div>
    )
}
