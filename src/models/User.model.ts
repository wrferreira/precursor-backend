export default class User {
    
    constructor() {}

    id?: number;
    name?: string;
    email!: string;
    password!: string;
    terms?: string;
    google_id?: string | null;
    picture?: string;
    birth_date?: Date; 
}