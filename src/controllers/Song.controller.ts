import Song from "../models/Song.model";
import SongService from "../services/Song.service";
import S3Storage from "../utils/S3Storage";
import StreamBuffer from "../utils/streamBuffer";

export default class SongController {
    constructor() {}

    async uploadSong(req: any, res: any, next: any) {
        try {
           
            const { data } = req.body;
            const song = JSON.parse(data) as Song;

            const songFile = req.files[0];

            const s3Storage = new S3Storage();
            const songSaved = await s3Storage.saveFile(songFile);

            if(songSaved?.key) {
                song.key = songSaved?.key;
                const result = await new SongService().save(song);
                return res.status(200).send(result);
            } else {
                throw new Error('Erro ao gravar o arquivo');
            }
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async getSong(req: any, res: any, next: any) {
        const { id } = req.params;
        try {
            const result = await new SongService().getSong(id);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async listSongs(req: any, res: any, next: any) {
        try {
            const result = await new SongService().getSongs();
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async stream(req: any, res: any, next: any) {
        try {
            const { id } = req.params;

            const result = await new SongService().getSong(id);
            if(!result) throw new Error('Id não encontrado');

            StreamBuffer.streamVideo(req, res, result.key);
            
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
}
