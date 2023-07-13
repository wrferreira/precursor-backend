
import moment from 'moment';
import Song from '../models/Song.model';
import { db } from '../../config/connection';

export default class SongService {

    constructor() {}

    async save(song: Song): Promise<Song> {
        const { rows } = await db.query("INSERT INTO songs (title, initial_text, letter, key, allow_download, create_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
        [
            song.title,
            song.initial_text,
            song.letter,
            song.key,
            song.allow_download,
            moment().format('MM-DD-YYYY'),
        ]);

        return rows;
    }

    async getSong(id: number): Promise<Song> {
        const { rows } = await db.query('SELECT * FROM songs WHERE id=$1', [id]);
        return rows[0];
    }

    async getSongs(): Promise<Song> {
        const { rows } = await db.query('SELECT id, title, initial_text, letter, allow_download FROM songs');
        return rows;
    }
}