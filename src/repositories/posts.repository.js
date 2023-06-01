import { db } from "../database/database.connection.js";

export function getPostsByUserIDDB(id) {
    return db.query(`SELECT u.name, u.avatar, json_agg(json_build_object('shared_link', p.shared_link, 'description', p.description)) as posts FROM posts p LEFT JOIN users u on p.user_id=u.id WHERE p.user_id=$1 GROUP BY u.name, u.avatar`, [id]);
}