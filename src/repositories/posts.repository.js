import { db } from "../database/database.connection.js";

export function getPostsByUserIDDB(id) {
    return db.query(`
     SELECT 
    posts.shared_link,
    posts.description,
    users.name,
    users.avatar,
    posts.user_id,
    posts.id as post_id,
    COUNT(likes.post_id) AS likes
    FROM
        posts
        JOIN users ON posts.user_id = users.id
        LEFT JOIN likes ON posts.id = likes.post_id
    WHERE
        posts.user_id = $1
    GROUP BY
        posts.shared_link,
        posts.description,
        users.name,
        users.avatar,
        posts.user_id,
        posts.created_at,
        posts.id 
    ORDER BY
        posts.created_at DESC;
`, [id]
    );
}



export function insertPost(user_id, shared_link, description) {
    return db.query(`
        INSERT INTO posts (user_id, shared_link, description)
        VALUES ($1, $2, $3) RETURNING id;`,
        [user_id, shared_link, description]
    );
}

export function listPosts(id, offset) {
    return db.query(`
    SELECT 
    posts.shared_link,
    posts.description,
    posts.user_id,
    posts.id,
    posts.original_post_id,
    CASE WHEN posts.original_post_id IS NULL THEN users.name ELSE original_user.name END AS name,
    CASE WHEN posts.original_post_id IS NULL THEN users.avatar ELSE original_user.avatar END AS avatar,
    CASE WHEN posts.original_post_id IS NULL THEN NULL ELSE repost_user.name END AS reposter_name,
    CASE WHEN posts.original_post_id IS NULL THEN post_likes.likes 
     ELSE (SELECT COUNT(*) FROM likes WHERE post_id = posts.original_post_id) END AS likes,
    CASE WHEN posts.original_post_id IS NULL THEN COALESCE(repost_counts.repost_count, 0)
         ELSE COALESCE(repost_occurrences.repost_count, 0) END AS repost_count
FROM
    posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN posts AS original_posts ON posts.original_post_id = original_posts.id
    LEFT JOIN users AS original_user ON original_posts.user_id = original_user.id
    LEFT JOIN users AS repost_user ON posts.user_id = repost_user.id
    LEFT JOIN (
        SELECT 
            post_id,
            COUNT(*) AS likes
        FROM
            likes
        GROUP BY
            post_id
    ) AS post_likes ON posts.id = post_likes.post_id
    LEFT JOIN (
        SELECT 
            posts.original_post_id,
            COUNT(*) AS likes
        FROM
            posts
            JOIN likes ON posts.original_post_id = likes.post_id
        GROUP BY
            posts.original_post_id
    ) AS original_post_likes ON posts.original_post_id = original_post_likes.original_post_id
    LEFT JOIN (
        SELECT 
            original_post_id,
            COUNT(*) AS repost_count
        FROM
            posts
        WHERE
            original_post_id IS NOT NULL
        GROUP BY
            original_post_id
    ) AS repost_counts ON posts.id = repost_counts.original_post_id
    LEFT JOIN (
        SELECT 
            original_post_id,
            COUNT(*) AS repost_count
        FROM
            posts
        WHERE
            original_post_id IS NOT NULL
        GROUP BY
            original_post_id
    ) AS repost_occurrences ON posts.original_post_id = repost_occurrences.original_post_id
    JOIN followers ON users.id = followers.user_followed
WHERE followers.user_id=$1
GROUP BY
    posts.shared_link,
    posts.description,
    posts.user_id,
    posts.id,
    posts.original_post_id,
    CASE WHEN posts.original_post_id IS NULL THEN users.name ELSE original_user.name END,
    CASE WHEN posts.original_post_id IS NULL THEN users.avatar ELSE original_user.avatar END,
    CASE WHEN posts.original_post_id IS NULL THEN NULL ELSE repost_user.name END,
    post_likes.likes,
    original_post_likes.likes,
    CASE WHEN posts.original_post_id IS NULL THEN COALESCE(repost_counts.repost_count, 0)
         ELSE COALESCE(repost_occurrences.repost_count, 0) END
ORDER BY
    posts.created_at DESC
    LIMIT 10
    OFFSET $2;`,
        [id, offset]);
}

export function getPostsByHashtagDB(name) {
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

export function getOwner(id) {
    return db.query(`
    SELECT posts.user_id
    FROM posts
    WHERE id=$1
    `, [id])
}

export function deletePost(id) {
    return db.query(`
    DELETE
    FROM posts
    WHERE id=$1
    `, [id])
}

export function deleteHashtag(id) {
    return db.query(`
    DELETE
    FROM hashtags_posts
    WHERE post_id=$1
    `, [id])
}

export function editPostDB(id, description) {
    return db.query(`
    UPDATE posts
    SET description=$1
    WHERE id=$2
    `, [description, id])
}

export function getPostById(id) {
    return db.query(`SELECT * FROM posts WHERE id=$1;`, [id])
}

export function insertRepostIntoPosts(user_id, shared_link, description, original_post_id) {
    return db.query(`
        INSERT INTO posts (user_id, shared_link, description, original_post_id)
        VALUES ($1, $2, $3, $4);`,
        [user_id, shared_link, description, original_post_id]
    );
}

export function getAllPostsAndRepostsInfo() {
    return db.query(`
    SELECT 
    posts.shared_link,
    posts.description,
    posts.user_id,
    posts.id,
    posts.original_post_id,
    CASE WHEN posts.original_post_id IS NULL THEN users.name ELSE original_user.name END AS name,
    CASE WHEN posts.original_post_id IS NULL THEN users.avatar ELSE original_user.avatar END AS avatar,
    CASE WHEN posts.original_post_id IS NULL THEN NULL ELSE repost_user.name END AS reposter_name,
    CASE WHEN posts.original_post_id IS NULL THEN post_likes.likes 
     ELSE (SELECT COUNT(*) FROM likes WHERE post_id = posts.original_post_id) END AS likes,
    CASE WHEN posts.original_post_id IS NULL THEN COALESCE(repost_counts.repost_count, 0)
         ELSE COALESCE(repost_occurrences.repost_count, 0) END AS repost_count
FROM
    posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN posts AS original_posts ON posts.original_post_id = original_posts.id
    LEFT JOIN users AS original_user ON original_posts.user_id = original_user.id
    LEFT JOIN users AS repost_user ON posts.user_id = repost_user.id
    LEFT JOIN (
        SELECT 
            post_id,
            COUNT(*) AS likes
        FROM
            likes
        GROUP BY
            post_id
    ) AS post_likes ON posts.id = post_likes.post_id
    LEFT JOIN (
        SELECT 
            posts.original_post_id,
            COUNT(*) AS likes
        FROM
            posts
            JOIN likes ON posts.original_post_id = likes.post_id
        GROUP BY
            posts.original_post_id
    ) AS original_post_likes ON posts.original_post_id = original_post_likes.original_post_id
    LEFT JOIN (
        SELECT 
            original_post_id,
            COUNT(*) AS repost_count
        FROM
            posts
        WHERE
            original_post_id IS NOT NULL
        GROUP BY
            original_post_id
    ) AS repost_counts ON posts.id = repost_counts.original_post_id
    LEFT JOIN (
        SELECT 
            original_post_id,
            COUNT(*) AS repost_count
        FROM
            posts
        WHERE
            original_post_id IS NOT NULL
        GROUP BY
            original_post_id
    ) AS repost_occurrences ON posts.original_post_id = repost_occurrences.original_post_id
GROUP BY
    posts.shared_link,
    posts.description,
    posts.user_id,
    posts.id,
    posts.original_post_id,
    CASE WHEN posts.original_post_id IS NULL THEN users.name ELSE original_user.name END,
    CASE WHEN posts.original_post_id IS NULL THEN users.avatar ELSE original_user.avatar END,
    CASE WHEN posts.original_post_id IS NULL THEN NULL ELSE repost_user.name END,
    post_likes.likes,
    original_post_likes.likes,
    CASE WHEN posts.original_post_id IS NULL THEN COALESCE(repost_counts.repost_count, 0)
         ELSE COALESCE(repost_occurrences.repost_count, 0) END
ORDER BY
    posts.created_at DESC;`,
    );
}