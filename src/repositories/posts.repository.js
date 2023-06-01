import { db } from "../database/database.connection.js";

export function getPostsByUserIDDB(id) {
    return db.query(`SELECT u.name, u.avatar, json_agg(json_build_object('shared_link', p.shared_link, 'description', p.description)) as posts FROM posts p LEFT JOIN users u on p.user_id=u.id WHERE p.user_id=$1 GROUP BY u.name, u.avatar`, [id]);
}

export function insertPost(user_id, shared_link, description) {
    return db.query(`
        INSERT INTO posts (user_id, shared_link, description)
        VALUES ($1, $2, $3);`,
        [user_id, shared_link, description]
    );
}

export function listLast20Posts() {
    return db.query(`
    SELECT posts.shared_link, posts.description, users.name, users.avatar
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
    LIMIT 20;
    `);
}