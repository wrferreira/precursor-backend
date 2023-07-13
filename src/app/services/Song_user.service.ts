import moment from 'moment';
import SongUser from '../models/Song_user.model';
import { db } from '../../config/connection';

export default class SongUserService {

    constructor() {}

    async save(song: SongUser): Promise<SongUser> {
        const { rows } = await db.query("INSERT INTO songs_users (song_id, user_id, sing_date, key) VALUES ($1, $2, $3, $4) RETURNING id",
        [
            song.song_id,
            song.user_id,
            moment.utc().format('YYYY-MM-DD HH:mm:ss'),
            song.key,
        ]);

        return rows;
    }

    async getSongById(id: number): Promise<SongUser> {
        const { rows } = await db.query('SELECT * FROM songs_users WHERE id=$1', [id]);
        return rows[0];
    }

    async getSongsByUser(idUser: number): Promise<SongUser> {
        const { rows } = await db.query('SELECT songs.id, songs.title, users.email, users.name FROM songs_users INNER JOIN songs ON songs.id = song_id INNER JOIN users ON users.id = user_id WHERE user_id =$1', [idUser]);
        return rows;
    }
}