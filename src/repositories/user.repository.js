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
    return db.query(`SELECT id,name,avatar FROM users WHERE id <> $1 AND name ILIKE $2`, [id, `${searchText}%`]);

}
export function getUserPhotoDB(id) {
    return db.query(`SELECT avatar FROM users WHERE id = $1`, [id]);
}

export function getUserByIDDB(id) {
    return db.query(`SELECT name FROM users WHERE id = $1;`, [id]);
}

export function getUserLikesDB(id) {
    return db.query(`SELECT post_id FROM likes WHERE user_id=$1;`, [id]);
}