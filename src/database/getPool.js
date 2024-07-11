import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
        database: DB_NAME,
        timezone: 'Z',
      });
    }

    return pool;
  } catch (err) {
    console.error(err);
  }
};

export { getPool };
