require('dotenv').config();

const { Pool } = require('pg');

export const db = new Pool({
    connectionString: process.env.POSTGRES_URL
})

db.connect();
