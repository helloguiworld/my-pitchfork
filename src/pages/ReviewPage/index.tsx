import { useParams } from 'react-router-dom'

import Page from '../../components/Page'
import TrackItem from '../../components/TrackItem'

import useAlbum from '../../hooks/useAlbum'
import { albumTypeTitle, Track } from '../../services/spotifyService'

import './styles.scss'
export type ReviewPageProps = {
}
export type ReviewPageParams = {
    id: string,
}

export default function ReviewPage(props: ReviewPageProps) {
    const { id } = useParams<ReviewPageParams>()

    const { album, fetching, error, setNewTrackScore, albumScore } = useAlbum(id)

    return (
        <Page id='review-page'>
            {
                album &&
                <>
                    <div className="album-data">
                        <div className="text">
                            <p className="type">{albumTypeTitle(album.type, album.totalTracks) + "S"}</p>
                            <p className="name">{album.name}</p>
                            <p className="artists">{album.artists.join(' / ')}</p>
                            <p className="year">{album.date.split('-')[0]}</p>
                        </div>
                        <div className="others">
                            <img
                                className="cover"
                                src={album.cover}
                                alt={`${album.name} album cover`}
                            />
                            <p className="score">{albumScore.toFixed(1)}</p>
                        </div>
                    </div>

                    <div className="scores">
                        <p className='title'>Track Scores</p>
                        <div className="tracks">
                            {
                                album.tracks?.map(
                                    (track: Track) =>
                                        <TrackItem
                                            key={track.id}
                                            track={track}
                                            setNewTrackScore={setNewTrackScore}/>
                                )
                            }
                        </div>
                    </div>
                </>
            }
        </Page>
    )
}
