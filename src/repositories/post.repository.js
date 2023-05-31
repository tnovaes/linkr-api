import { db } from "../database/database.connection.js";

export function insertPost(user_id, shared_link, description) {
    return db.query(`
        INSERT INTO posts (user_id, shared_link, description)
        VALUES ($1, $2, $3);`,
        [user_id, shared_link, description]
    );
}