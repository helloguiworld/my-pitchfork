import { useRef, useState, useEffect } from 'react'

import ScoreDisplay from '../../../../components/ScoreDisplay'

import { Album, getAlbumType, AlbumType } from '../../../../services/spotifyServices'

import './styles.scss'
export type AlbumReviewProps = {
    album: Album,
    isBestNew: boolean,
    score: number | null,
    author: string,
}

export default function AlbumReview(props: AlbumReviewProps) {
    const albumBoxRef = useRef<HTMLDivElement>(null)

    const [albumType, setAlbumType] = useState<AlbumType>()
    const [needTextResizing, setNeedTextResizing] = useState(false)

    function calcTextSizeFactor(text: string) {
        return [...text].reduce((acc, curr) => acc + ('A' <= curr && curr <= 'Z' ? 1.3 : 1), 0)
    }

    function checkTextAmount() {
        const albumNameElement = document.querySelector('p.name')
        const albumArtistsElement = document.querySelector('p.artists')
        if (albumNameElement?.textContent && albumArtistsElement?.textContent) {
            const albumNameTextSizeFactor = calcTextSizeFactor(albumNameElement.textContent)
            const albumArtistsTextSizeFactor = calcTextSizeFactor(albumArtistsElement.textContent)
            setNeedTextResizing(
                albumNameTextSizeFactor > 55 ||
                albumNameTextSizeFactor + albumArtistsTextSizeFactor > 80
            )
        }
    }

    useEffect(() => {
        if (props.album && props.album.tracks) {
            setAlbumType(getAlbumType(props.album.type, props.album.tracks?.length))
            checkTextAmount()
        }
    }, [props.album])

    return (
        <div className="album-review">
            <div
                className={
                    "review" +
                    (albumType == "TRACK" ? " track-review" : "") +
                    (needTextResizing ? " resized-text" : "")
                }
                ref={albumBoxRef}
            >
                <div className="text">
                    <p className="type">{albumType + "S"}</p>
                    <p className="name">{props.album.name}</p>
                    <p className="artists">{props.album.artists.join(' / ')}</p>
                    <p className="year">{props.album.date.split('-')[0]}</p>
                </div>
                <div className={"others" + (props.isBestNew ? " best-new" : "")}>
                    <div className="cover-box">
                        <img
                            className="cover"
                            src={props.album.cover}
                            alt={`${props.album.name} album cover`}
                        />
                    </div>

                    <ScoreDisplay
                        score={props.score}
                        isBestNew={props.isBestNew}
                        typeTitle={albumType}
                    />
                </div>
            </div>
            {props.author && <p className="author">By {props.author}</p>}
        </div>
    )
}
