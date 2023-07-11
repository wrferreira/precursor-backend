import S3Storage from './S3Storage';

require('dotenv').config();

export default class StreamBuffer { 
    static async streamVideo(req: any, res: any, key: string) {
        try {
            const s3Storage = new S3Storage();
            const videoSize = await s3Storage.getVideoSize(key) || 0;
            const rangeHeader = req.headers.range;

            let startByte = 0;
            let endByte = videoSize - 1;
            let chunkSize = videoSize;

            if (rangeHeader) {
                const range = rangeHeader.match(/bytes=(\d+)-(\d*)/);

                if (range) {
                    startByte = parseInt(range[1], 10);
                    endByte = range[2] ? parseInt(range[2], 10) : videoSize - 1;
                    chunkSize = endByte - startByte + 1;
                }
            }

            const videoStream = await s3Storage.getVideoStream(key, startByte, endByte);

            res.writeHead(206, {
                'Content-Range': `bytes ${startByte}-${endByte}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4',
            });

            videoStream.pipe(res);
        } catch (error) {
            console.error('Erro durante o streaming do vídeo:', error);
            res.sendStatus(500);
        }
    }
}