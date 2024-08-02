// import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { Album, getAlbumTitle } from '../../../services/spotifyService'
import clickService from '../../../services/clickService'

import { MdExplicit } from "react-icons/md"

import Card from '../../Card'

import './styles.scss'
export type AlbumCardProps = {
    album: Album
    small?: boolean
    color?: string
    extra?: JSX.Element | JSX.Element[]
}

export default function AlbumCard(props: AlbumCardProps) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/review/${props.album.id}`)
        clickService.postAlbumClick(props.album.id, props.album.name)
    }

    return (
        <Card
            className={'album-card' + (props.small ? ' small' : '')}
            onClick={handleClick}
            color={props.color}
        >
            <img
                className="cover"
                src={props.album.cover}
                alt={`${props.album.name} album cover`}
            />

            <div className="album-names">
                <p className='album'>
                    {props.album.explicit && <MdExplicit className='explicit' />}
                    {props.album.name}
                </p>
                <p className="artists">{props.album.artists.join(' / ')}</p>
            </div>

            <div className="tracks-data">
                <p className='album-type'>{getAlbumTitle(props.album.type, props.album.tracks_count)}</p>
                {
                    props.album.tracks_count > 1 &&
                    <p className="total-tracks">
                        {`${props.album.tracks_count} tracks`}
                    </p>
                }

                {
                    props.extra &&
                    <div className="extra">
                        {props.extra}
                    </div>
                }
            </div>
        </Card>
    )
}
