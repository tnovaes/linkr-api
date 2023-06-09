import { db } from "../database/database.connection.js";

export function getLikeByUserIDAndPostID(user_id, post_id) {
    return db.query(`SELECT * FROM likes WHERE user_id=$1 and post_id=$2;`, [user_id, post_id]);
}
export function getPostsLikesDB(post_id) {
    return db.query(`SELECT users.name, users.id FROM likes JOIN users ON likes.user_id = users.id WHERE likes.post_id = $1;`, [post_id]);
}

export function removeLikeByUserIDAndPostID(user_id, post_id) {
    return db.query(`DELETE FROM likes WHERE user_id=$1 and post_id=$2;`, [user_id, post_id]);
}

export function addLikeByUserIDAndPostID(user_id, post_id){
    return db.query(`
        INSERT INTO likes (user_id, post_id) VALUES ($1, $2);`,
        [user_id, post_id]
    );
}
