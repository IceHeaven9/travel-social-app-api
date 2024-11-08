import { getPool } from './getPool.js';

async function buildTravelJournalDatabase() {
  const pool = await getPool();
  const connection = await pool.getConnection();

  await connection.query('DROP DATABASE IF EXISTS `travel-journal`');
  console.log('Database Dropped');

  await connection.query('CREATE DATABASE `travel-journal`');
  console.log('Database Created');

  await connection.query('USE `travel-journal`');
  console.log('Database Selected');

  await connection.query(`
        CREATE TABLE users (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(256) UNIQUE NOT NULL,
            username VARCHAR(256) UNIQUE NOT NULL,
            name VARCHAR(256) NOT NULL,
            password VARCHAR(256) NOT NULL,
            role enum("ADMIN","USER") DEFAULT "USER" NOT NULL,
            avatar VARCHAR(256),
            address VARCHAR(256),
            phoneNumber VARCHAR(256),
            validationCode VARCHAR(256),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP
        )
    `);
  console.log('Users Table Created');

  await connection.query(`
        CREATE TABLE travels (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(256) NOT NULL,
            description TEXT,
            rating TINYINT NOT NULL,
            userId INTEGER UNSIGNED NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        )
    `);
  console.log('Travels Table Created');

  await connection.query(`
        CREATE TABLE travelImages(
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            url VARCHAR(256) NOT NULL,
            travelId INTEGER UNSIGNED NOT NULL,
            FOREIGN KEY (travelId) REFERENCES travels(id)
        )
    `);
  console.log('Travel Images Table Created');

  await connection.query(`
        CREATE TABLE reactions(
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            reactionType TINYINT NOT NULL,
            travelId INTEGER UNSIGNED NOT NULL,
            userId INTEGER UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (travelId) REFERENCES travels(id)
        )
    `);
  console.log('Reactions Table Created');

  await connection.query(`
        CREATE TABLE comments(
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            message VARCHAR(1024) NOT NULL,
            travelId INTEGER UNSIGNED NOT NULL,
            userId INTEGER UNSIGNED NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id),
            FOREIGN KEY (travelId) REFERENCES travels(id)
        )
    `);
  console.log('Comments Table Created');

  console.log('Travel Journal Database Successfully Created');

  await connection.release();

  process.exit(0);
}

buildTravelJournalDatabase();
