import { db } from "../database/database.connection.js";

export function getPostsByUserIDDB(id) {
    return db.query(`
        SELECT posts.shared_link, posts.description, users.name, users.avatar, posts.user_id
            FROM posts
            JOIN users ON posts.user_id = users.id
            JOIN hashtags_posts ON hashtags_posts.post_id = posts.id
            WHERE posts.user_id = $1
            ORDER BY posts.created_at DESC;`,
        [id]
    );
}

export function insertPost(user_id, shared_link, description) {
    return db.query(`
        INSERT INTO posts (user_id, shared_link, description)
        VALUES ($1, $2, $3) RETURNING id;`,
        [user_id, shared_link, description]
    );
}

export function listLast20Posts() {
    return db.query(`
    SELECT posts.shared_link, posts.description, posts.user_id, posts.id, users.name, users.avatar
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
    LIMIT 20;
    `);
}

export function getPostsByHashtagDB(name){
    return db.query(`
        SELECT posts.shared_link, posts.description, posts.user_id, users.name, users.avatar, 
        hashtags_posts.hashtag_id, hashtags.name AS hashtag_name
        FROM posts
        JOIN users ON posts.user_id = users.id
        JOIN hashtags_posts ON hashtags_posts.post_id = posts.id
        JOIN hashtags ON hashtags_posts.hashtag_id = hashtags.id
        WHERE hashtags.name = $1
        ORDER BY posts.created_at DESC;`,
        [name]
    );
}

export function getOwner(id){
    return db.query(`
    SELECT posts.user_id
    FROM posts
    WHERE id=$1
    `,[id])
}

export function deletePost(id){
    return db.query(`
    DELETE
    FROM Posts
    WHERE id=$1
    `,[id])
}

export function deleteHashtag(id){
    return db.query(`
    DELETE
    FROM hashtags_posts
    WHERE post_id=$1
    `,[id])
}