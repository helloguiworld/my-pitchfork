// import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Album, getAlbumType } from '../../../services/spotifyServices'
import clickServices from '../../../services/clickServices'

import Card from '../../Card'

import './styles.scss'
export type AlbumCardProps = {
    album: Album
    small?: boolean
}

export default function AlbumCard(props: AlbumCardProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/review/${props.album.id}`)
        clickServices.postAlbumClick(props.album.id, props.album.name)
    }

    return (
        <Card
            className={'album-card' + (props.small ? ' small' : '')}
            onClick={handleClick}
        >
            <img
                className="cover"
                src={props.album.cover}
                alt={`${props.album.name} album cover`}
            />

            <div className="album-names">
                <p className='album'>{props.album.name}</p>
                <p className="artists">{props.album.artists.join(' / ')}</p>
            </div>

            <div className="tracks-data">
                <p className='album-type'>{getAlbumType(props.album.type, props.album.tracks_count)}</p>
                {
                    props.album.tracks_count > 1 &&
                    <p className="total-tracks">
                        {`${props.album.tracks_count} tracks`}
                    </p>
                }
            </div>
        </Card>
    )
}
