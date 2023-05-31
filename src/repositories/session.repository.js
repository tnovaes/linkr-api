import { db } from "../database/database.connection.js";

export function createSession(token, user_id) {
    return db.query(`
        INSERT INTO sessions (token, user_id) VALUES ($1, $2);`,
        [token, user_id]
    );
}
export function removeSession(token, user_id) {
    return db.query(`
        DELETE FROM sessions WHERE token=$1 AND user_id=$2;`,
        [token, user_id]
    );
}