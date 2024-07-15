import elementCapture from './elementCapture'

export default async function squareReviewCapture(albumName?: string) {
    const authorElement = document.querySelector("p.author")

    elementCapture(
        '#root',
        albumName,
        {
            scrollY: 0,
            windowWidth: 432,
            windowHeight: 432,
            height: 432,
            scale: 1080 / 432,
            ignoreElements: (element) => element === authorElement
        }
    )
}
