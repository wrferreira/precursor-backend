import { db } from '../db.config';
import SongUser from '../models/Song_user.model';

export default class SongUserService {

    constructor() {}

    async save(song: SongUser): Promise<SongUser> {
        const { rows } = await db.query("INSERT INTO songs_users (song_id, user_id, sing_date, key) VALUES ($1, $2, $3, $4) RETURNING id",
        [
            song.song_id,
            song.user_id,
            null,
            song.key,
        ]);

        return rows;
    }

    async getSong(id: number): Promise<SongUser> {
        const { rows } = await db.query('SELECT * FROM songs_users WHERE id=$1', [id]);
        return rows[0];
    }

    async getSongs(): Promise<SongUser> {
        const { rows } = await db.query('SELECT id, title, initial_text, letter, allow_download FROM songs_users');
        return rows;
    }
}