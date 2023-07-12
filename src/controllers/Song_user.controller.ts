import SongUser from "../models/Song_user.model";
import SongUserService from "../services/Song_user.service";
import S3Storage from "../utils/S3Storage";
import StreamBuffer from "../utils/streamBuffer";

export default class SongUserController {
    constructor() {}

    async uploadSong(req: any, res: any, next: any) {
        try {
           
            const { data } = req.body;
            const song = JSON.parse(data) as SongUser;
            
            const songFile = req.files[0];

            const s3Storage = new S3Storage();
            const songSaved = await s3Storage.saveFile(songFile);

            if(songSaved?.key) {
                song.key = songSaved?.key;
                const result = await new SongUserService().save(song);
                return res.status(200).send(result);
            } else {
                throw new Error('Erro ao gravar o arquivo');
            }
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async getSongById(req: any, res: any, next: any) {
        const { id } = req.params;
        try {
            const result = await new SongUserService().getSongById(id);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async listSongsByUser(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const result = await new SongUserService().getSongsByUser(id);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(400).send(err);
        }
    }

    async stream(req: any, res: any, next: any) {
        try {
            const { id } = req.params;

            const result = await new SongUserService().getSongById(id);
            if(!result) throw new Error('Id não encontrado');

            StreamBuffer.streamVideo(req, res, result.key);
            
        } catch (err) {
            console.error(err);
            res.sendStatus(500);
        }
    }
}
