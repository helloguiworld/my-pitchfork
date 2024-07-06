import express from 'express'
import html2canvasProxy from 'html2canvas-proxy'

const app = express()
export const port = (process.env.PORT || 3000)

app.use('/proxy', html2canvasProxy())

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

