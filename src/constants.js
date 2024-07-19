import "dotenv/config";
import process from "node:process";
import path from "node:path";

export const PUBLIC_DIR = path.join(process.cwd(), "public");

export const {
  //==========================
  // API SETTINGS
  //==========================
  PORT = 3000,
  API_HOST = "http://localhost:3000",
  FRONTEND_HOST = "http://localhost:5173",
  JWT_SECRET,

  //==========================
  // DB SETTINGS
  //==========================
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,

  //==========================
  // EMAIL SETTINGS
  //==========================
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
} = process.env;

if (!DB_NAME) {
  throw "DB_NAME not set in environment";
}
