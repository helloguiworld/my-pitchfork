// import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Album, getAlbumTitleByType } from '../../services/spotifyService'

import Card from '../Card'

import './styles.scss'
export type AlbumCardProps = {
    // children?: ReactNode | ReactNode[],
    album: Album,
}

export default function AlbumCard(props: AlbumCardProps) {
    const navigate = useNavigate();

    return (
        <Card className='album-card' onClick={() => navigate(`/review/${props.album.id}`)}>
            <img
                className="cover"
                src={props.album.cover}
                alt={`${props.album.name} album cover`}
            />

            <div className="album-names">
                <p className='name'>{props.album.name}</p>
                <p className="artists">{props.album.artists.join(' / ')}</p>
                {/* <p className="artists">{props.album.id}</p> */}
            </div>

            <div className="tracks-data">
                <p className='album-type'>{getAlbumTitleByType(props.album.type, props.album.totalTracks)}</p>
                {
                    props.album.totalTracks > 1 &&
                    <p className="total-tracks">
                        {`${props.album.totalTracks} tracks`}
                    </p>
                }
            </div>
        </Card>
    )
}
