import { db } from '../db.config';
import User from '../models/User.model';

export default class UserService {

    constructor() {}
    
    async getUsers(): Promise<Array<User>> {
       const { rows } = await db.query('SELECT * FROM users');
       return rows;
    }
    
}
