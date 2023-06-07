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
    return db.query(`
    SELECT u.id, u.name, u.avatar,
    CASE WHEN f.user_followed IS NOT NULL THEN TRUE ELSE FALSE END AS is_following
    FROM users u LEFT JOIN followers f ON f.user_followed = u.id AND f.user_id = $1
    WHERE 
    u.id <> $1 AND u.name ILIKE $2 ORDER BY f.user_followed;`, [id, `${searchText}%`]);
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