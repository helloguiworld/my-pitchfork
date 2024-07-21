import { useRef, useState, useEffect } from 'react'

import Crown from '../../../../components/Crown'

import { Album, getAlbumTitleByType } from '../../../../services/spotifyServices'

import './styles.scss'
export type AlbumReviewProps = {
    album: Album,
    isBestNew: boolean,
    score: number,
    author: string,
}

export default function AlbumReview(props: AlbumReviewProps) {
    const albumBoxRef = useRef<HTMLDivElement>(null)

    const [albumTypeTitle, setAlbumTypeTitle] = useState('')
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
        if (props.album) {
            setAlbumTypeTitle(getAlbumTitleByType(props.album.type, props.album.totalTracks))
            checkTextAmount()
        }
    }, [props.album])

    return (
        <div className="album-review">
            <div
                className={
                    "review" +
                    (albumTypeTitle == "TRACK" ? " track-review" : "") +
                    (needTextResizing ? " resized-text" : "")
                }
                ref={albumBoxRef}
            >
                <div className="text">
                    <p className="type">{albumTypeTitle + "S"}</p>
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

                    <div className="score-box">
                        {props.isBestNew &&
                            <Crown />
                        }

                        <p className="score">{props.score.toFixed(1)}</p>

                        {props.isBestNew &&
                            <p className="target">
                                {`BEST NEW ${albumTypeTitle == "TRACK" ? "TRACK" : "MUSIC"}`}
                            </p>
                        }
                    </div>
                </div>
            </div>
            {props.author && <p className="author">By {props.author}</p>}
        </div>
    )
}
