import Video from "../models/Video.model";
import VideoService from "../services/Video.service";
import S3Storage from "../utils/S3Storage";
import StreamBuffer from "../utils/streamBuffer";

export default class VideoController {
    constructor() {}

    async uploadVideo(req: any, res: any, next: any) {
        try {
            const thumbFile = req.files[0];
            const videoFile = req.files[1];
            const { data } = req.body;
            const video = JSON.parse(data) as Video;
            
            const s3Storage = new S3Storage();

            const videoSaved = await s3Storage.saveFile(videoFile);
            const thumbSaved = await s3Storage.saveFile(thumbFile);

            if(videoSaved?.key && thumbSaved?.key) {
                video.key = videoSaved?.key;
                video.thumb_key = thumbSaved?.key;
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
            const { id } = req.params;

            const result = await new VideoService().getVideo(id);
            if(!result) throw new Error('Id não encontrado');

            StreamBuffer.streamVideo(req, res, result.key);
            
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }

    async getVideo(req: any, res: any, next: any) {
        const { id } = req.params;
        try {
            const result = await new VideoService().getVideo(id);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async listVideos(req: any, res: any, next: any) {
        try {
            const result = await new VideoService().getVideos();
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }
}
