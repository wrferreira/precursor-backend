export default class User {
    
    constructor() {}

    id!: number;
    name!: string;
    password!: string;
    Terms!: boolean;
    google_id?: string;
    picture?: string;
    birth_date?: Date; 
}