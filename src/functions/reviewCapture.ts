import html2canvas from 'html2canvas'
// import { port } from '../services/html2canvasProxy.js'

export default function reviewCapture(selector: string, fileName?: string) {
    const elementToCapture = document.querySelector<HTMLElement>(selector)
    if (!elementToCapture) {
        console.error('Element not found.')
        return
    }

    html2canvas(
        elementToCapture,
        {
            proxy: `http://192.168.0.30:3000/proxy`,
            scrollY: 0,
            windowWidth: 432,
            height: 768,
        }
    ).then(canvas => {
        let link = document.createElement('a')
        link.download = `myPytchfork - ${fileName || "album review"}.png`
        link.href = canvas.toDataURL()
        link.click()
    })
}