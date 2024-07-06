declare module 'html2canvas-proxy' {
    import { RequestHandler } from 'express';

    function html2canvasProxy(): RequestHandler;
    export default html2canvasProxy;
}