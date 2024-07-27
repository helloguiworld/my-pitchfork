import elementCapture from './elementCapture'

export default async function trackScoresCapture(albumName: string) {
    elementCapture(
        'div.track-scores',
        `${albumName} [Track Scores]`,
        {
            scrollY: 0,
            windowWidth: 432,
            scale: 1080 / 432,
        }
    )
}
