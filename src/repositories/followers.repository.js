import { db } from "../database/database.connection.js";

export function addFollower(user_id, followerID){
    return db.query(`
        INSERT INTO followers (user_id, user_followed) VALUES ($1, $2);`,
        [user_id, followerID]
    );
}
export function removeFollower(user_id, followerID){
    return db.query(`
        DELETE FROM followers WHERE (user_id=$1 AND user_followed=$2);`,
        [user_id, followerID]
    );
}
export function getIsFollowingDB(user_id, followerID){
    return db.query(`
        select count(*) from followers WHERE user_id=$1 AND user_followed=$2;`,
        [user_id, followerID]
    );
}
