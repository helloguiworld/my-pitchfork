export default function shareLink(link: string, title: string, text: string) {
    const content: any = {}

    if (link) content['url'] = link
    if (title) content['title'] = title
    if (text) content['text'] = text

    if (navigator.share) {
        navigator.share(
            content
        ).then(() => {
            console.log('Share link successful')
        }).catch(err => {
            console.error('Share link failed:', err)
        })
    } else {
        alert('Unable to save using this browser, please try another one.')
    }
}