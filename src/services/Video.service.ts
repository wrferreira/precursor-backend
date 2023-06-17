import { db } from '../db.config';
import Video from "../models/Video.model";
import moment from 'moment';

export default class VideoService {

    constructor() {}

    async save(video: Video): Promise<Video> {
        const { rows } = await db.query("INSERT INTO videos(title, initial_text, letter, key, allow_download, create_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [
            video.title,
            video.initialText,
            video.letter,
            video.key,
            video.allowDownload,
            moment().format('MM-DD-YYYY')
        ]);

        return rows;
    }
}