import elementCapture from './elementCapture'

export default function storiesReviewCapture(albumName?: string) {
    elementCapture(
        '#root',
        albumName,
        {
            scrollY: 0,
            windowWidth: 432,
            height: 768,
            scale: 1080 / 432,
        }
    )
}
