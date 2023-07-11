import { db } from '../db.config';
import User from '../models/User.model';
import { Encrypt } from '../utils/encrypt';

export default class UserService {

    constructor() {}
    
    async getUsers(): Promise<Array<User>> {
       const { rows } = await db.query('SELECT * FROM users');
       return rows;
    }
    

    async getUserEmail(): Promise<User> {
        const { rows } = await db.query('SELECT * FROM users');
        return rows;
    }

    async getUserGoogle(user: User): Promise<User> {
        const password = await Encrypt.cryptPassword(user.password);
        const { rows } = await db.query("INSERT INTO users(name, email, password, terms, google_id, picture, birth) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (google_id) DO NOTHING RETURNING *",
        [
            user.name,
            user.email,
            password,
            user.terms,
            user.google_id,
            user.picture,
            user.birth_date
        ]);

        if (!rows.length) {
            const { rows } = await db.query('SELECT * FROM users WHERE google_id=$1', [user.google_id]);
            return rows;
        } else {
            return rows;
        }
    }

    async login(user: User): Promise<User | null> {
        const { rows } = await db.query('SELECT * FROM users WHERE email =$1', [user.email]);

        if(rows[0].password && user.password) {
            if (await Encrypt.comparePassword(user.password, rows[0].password)) {
                return rows;  
            }
        }
        return null;
    }

    async register(user: User): Promise<User> {
        const password = await Encrypt.cryptPassword(user.password);
        const { rows } = await db.query("INSERT INTO users(name, email, password, terms, google_id, picture, birth) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [
            user.name,
            user.email,
            password,
            user.terms,
            user.google_id,
            user.picture,
            user.birth_date
        ]);

        return rows;
    }
}
