import useLocalStorage from "./useLocalStorage"

import { HashTrackScores } from "./useReview"

export default function useStoredTrackScores() {
    const [storedTrackScores, setStoredTrackScores, deleteStoredTrackScores] = useLocalStorage<HashTrackScores | null>('track-scores', {})

    function setStoredTrackScore(id: string, score: number) {
        setStoredTrackScores({ ...storedTrackScores, [id]: score })
    }

    function updateStoredTrackScores(trackScores: HashTrackScores) {
        setStoredTrackScores({ ...storedTrackScores, ...trackScores })
    }

    function getStoredTrackScoresByIds(trackIds: string[]) {
        return trackIds.reduce((retrievedTrackScores: HashTrackScores, trackId: string) => {
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