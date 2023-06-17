import Video from "../models/Video.model";
import VideoService from "../services/Video.service";
import S3Storage from "../utils/S3Storage";
import StreamBuffer from "../utils/streamBuffer";

export default class VideoController {
    constructor() {}

    async uploadVideo(req: any, res: any, next: any) {
        try {
            const { file } = req;
            const { data } = req.body;
            const video = JSON.parse(data) as Video;

            const s3Storage = new S3Storage();

            const fileSaved = await s3Storage.saveFile(file);

            if(fileSaved?.key) {
                video.key = fileSaved?.key;
                const result = await new VideoService().save(video);
                return res.status(200).send(result);
            } else {
                throw new Error('Erro ao gravar o arquivo');
            }
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async stream(req: any, res: any, next: any) {
        try {
            const s3Storage = new S3Storage();
            const videoBuffer = await s3Storage.getFile(req.params.id);
            const videoStream = StreamBuffer.createStreamFromBuffer(videoBuffer);
            res.setHeader('Content-Type', 'video/mp4');

            videoStream.pipe(res);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        }
    }

    async getVideo(req: any, res: any, next: any) {
        
    }

}

