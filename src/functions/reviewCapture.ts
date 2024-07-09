import html2canvas from 'html2canvas'

export default function reviewCapture(selector: string, fileName?: string) {
    const elementToCapture = document.querySelector<HTMLElement>(selector)
    if (!elementToCapture) {
        console.error('Element not found.')
        return
    }

    function shareImage(file: File) {
        if (navigator.share) {
            navigator.share({
                // title: `myPytchfork - Album Review`,
                // text: 'Check out my album review!',
                files: [file],
            }).then(() => {
                console.log('Share successful')
            }).catch(err => {
                console.error('Share failed:', err)
            })
        } else {
            alert('Web Share API is not supported in this browser.')
        }
    }

    html2canvas(
        elementToCapture,
        {
            proxy: `/proxy`,
            scrollY: 0,
            windowWidth: 432,
            height: 768,
            scale: 1080 / 432,
        }
    ).then(canvas => {
        const userAgent = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent)
        if (isMobile && navigator.canShare()) {
            canvas.toBlob(blob => {
                if (blob) {
                    const file = new File([blob], `myPytchfork - ${fileName || "Album Review"}.png`, { type: 'image/png' })
                    shareImage(file)
                }
            })
        } else {
            let link = document.createElement('a')
            link.download = `myPytchfork - ${fileName || "Album Review"}.png`
            link.href = canvas.toDataURL()
            link.click()
        }
    })
}