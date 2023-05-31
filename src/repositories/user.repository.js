import { db } from "../database/database.connection.js";

export function getUserByEmail(email) {
    return db.query(`SELECT * FROM users WHERE email = $1;`, [email]);
}

export function createUser(name, email, password, avatar) {
    return db.query(`
        INSERT INTO users (name, email, password, avatar) VALUES ($1, $2, $3, $4);`,
        [name, email, password, avatar]
    );
}

export function getUsersBySearchTextDB(id, searchText) {
    return db.query(`SELECT * FROM users WHERE id <> $1 AND name ILIKE $2`, [id, `${searchText}%`]);

}