import { db } from "../database/database.connection.js";

export function postCommentDB(text,writer_id,post_id){
    return db.query(`
    INSERT INTO comments (text,writer_id,post_id) VALUES ($1,$2,$3)
    `,[text,writer_id,post_id])
}
export function getComments(){
    return db.query(`
    SELECT c.text, c.post_id, u.avatar AS writer_avatar, p.user_id AS post_owner,
    CASE WHEN f.user_followed IS NOT NULL THEN TRUE ELSE FALSE END AS is_following
    FROM comments c 
    JOIN posts p ON p.id = c.post_id
    JOIN users u ON u.id = c.writer_id
    LEFT JOIN followers f ON f.user_followed = c.writer_id
    `)
}