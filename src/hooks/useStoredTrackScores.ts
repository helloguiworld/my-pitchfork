import useLocalStorage from "./useLocalStorage"

import { TrackScores } from "./useAlbum"

export default function useStoredTrackScores() {
    const [storedTrackScores, setStoredTrackScores, deleteStoredTrackScores] = useLocalStorage<TrackScores | null>('track-scores', {})

    function setStoredTrackScore(id: string, score: number) {
        setStoredTrackScores({ ...storedTrackScores, [id]: score })
    }

    function updateStoredTrackScores(trackScores: TrackScores) {
        setStoredTrackScores({ ...storedTrackScores, ...trackScores })
    }

    function getStoredTrackScoresByIds(trackIds: string[]) {
        return trackIds.reduce((retrievedTrackScores: TrackScores, trackId: string) => {
            if (trackId in storedTrackScores)
                retrievedTrackScores[trackId] = storedTrackScores[trackId]
            return retrievedTrackScores
        }, {})
    }

    return {
        storedTrackScores,
        setStoredTrackScore,
        updateStoredTrackScores,
        getStoredTrackScoresByIds,
        deleteStoredTrackScores,
    }
}