import { db } from "../database/database.connection.js";

export function createSession(token, user_id) {
    return db.query(`
        INSERT INTO sessions (token, user_id) VALUES ($1, $2);`,
        [token, user_id]
    );
}