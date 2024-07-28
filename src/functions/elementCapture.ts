import html2canvas, { Options } from 'html2canvas-pro'

export default function elementCapture(selector: string, fileName?: string, options?: Partial<Options>) {
    const elementToCapture = document.querySelector<HTMLElement>(selector)
    if (!elementToCapture) {
        console.error('Element not found.')
        return
    }

    function shareImage(file: File) {
        if (navigator.share) {
            navigator.share({
                files: [file],
            }).then(() => {
                console.log('Share successful')
            }).catch(err => {
                console.error('Share failed:', err)
            })
        } else {
            alert('Unable to save using this browser, please try another one.')
        }
    }

    html2canvas(
        elementToCapture,
        {
            proxy: `/proxy`,
            // scrollY: 0,
            ...options
        }
        
    ).then(canvas => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        if (isMobile) {
            canvas.toBlob(blob => {
                if (blob) {
                    const file = new File([blob], `myPytchfork - ${fileName || "CAPTURE"}.png`, { type: 'image/png' })
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