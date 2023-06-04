import { db } from "../database/database.connection.js";

export function getHashtagsDB(){
    return db.query(`
        SELECT * FROM hashtags;`
    );
}

export function findHashtagByIDDB(id){
    return db.query(`
        SELECT * FROM hashtags
        WHERE id = $1 ;`,
        [id]
    );
}

export function hashtagTop10DB(){
    return db.query(`
        SELECT COUNT(*) AS hashtag_count, hashtags_posts.hashtag_id, hashtags.name AS name
        FROM hashtags_posts
        JOIN hashtags ON hashtags.id = hashtags_posts.hashtag_id
        GROUP BY hashtags_posts.hashtag_id, hashtags.name
        ORDER BY hashtag_count DESC
        LIMIT 10;
    `)
}

export function findHashtagDB(hashtag){
    return db.query(`
        SELECT * FROM hashtags
        WHERE name ILIKE $1 ;`,
        [hashtag]
    );
}

export function createHashtagDB(hashtag){
    return db.query(`
        INSERT INTO hashtags (name)
        VALUES ($1) RETURNING id;`,
        [hashtag]
    );
}

export function addHashtagPostDB(postID, hashtagID){
    return db.query(`
        INSERT INTO hashtags_posts (post_id, hashtag_id)
        VALUES ($1, $2);`,
        [postID, hashtagID]
    );
}