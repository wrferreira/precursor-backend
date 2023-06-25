import { db } from '../db.config';
import Video from "../models/Video.model";
import moment from 'moment';

export default class VideoService {

    constructor() {}

    async save(video: Video): Promise<Video> {
        const { rows } = await db.query("INSERT INTO videos(title, initial_text, letter, key, allow_download, create_at, thumb_key) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
        [
            video.title,
            video.initialText,
            video.letter,
            video.key,
            video.allowDownload,
            moment().format('MM-DD-YYYY'),
            video.thumbKey
        ]);

        return rows;
    }

    async getVideo(id: number): Promise<Video> {
        const { rows } = await db.query('SELECT * FROM videos WHERE id=$1', [id]);
        return rows[0];
    }

    async listVideos(): Promise<Video> {
        const a = await db.query('SELECT id, title, initial_text, letter, allow_download, thumb_key FROM videos');
        console.log(a);
        return a;
    }
}