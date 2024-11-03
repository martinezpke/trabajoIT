import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DB_URL, // Asegúrate de que coincida con el nombre de la variable en tu .env
});

export default pool;
