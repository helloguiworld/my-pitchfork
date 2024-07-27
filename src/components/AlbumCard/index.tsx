// import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Album, getAlbumTitleByType } from '../../services/spotifyServices'
import clickServices from '../../services/clickServices'

import Card from '../Card'

import './styles.scss'
export type AlbumCardProps = {
    // children?: ReactNode | ReactNode[],
    album: Album,
}

export default function AlbumCard(props: AlbumCardProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/review/${props.album.id}`)
        clickServices.postAlbumClick(props.album.id, props.album.name)
    }

    return (
        <Card className='album-card' onClick={handleClick}>
            <img
                className="cover"
                src={props.album.cover}
                alt={`${props.album.name} album cover`}
            />

            <div className="album-names">
                <p className='name'>{props.album.name}</p>
                <p className="artists">{props.album.artists.join(' / ')}</p>
            </div>

            <div className="tracks-data">
                <p className='album-type'>{getAlbumTitleByType(props.album.type, props.album.tracks?.length)}</p>
                {
                    props.album.tracks?.length > 1 &&
                    <p className="total-tracks">
                        {`${props.album.tracks?.length} tracks`}
                    </p>
                }
            </div>
        </Card>
    )
}
