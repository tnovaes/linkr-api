import { db } from "../database/database.connection.js";

export function getTimelineDB(id, offset) {
    return db.query(`
    SELECT
    (
      SELECT json_agg(followers)
      FROM (
        (SELECT EXISTS (SELECT 1 FROM followers WHERE user_id = $1 LIMIT 1) AS has_followers)
      ) AS followers
    ) AS has_followers,
    (
      SELECT json_agg(hashtags)
      FROM (
        SELECT
          COUNT(*) AS hashtag_count,
          hp.hashtag_id,
          h.name
        FROM
          hashtags_posts hp
          JOIN hashtags h ON h.id = hp.hashtag_id
        GROUP BY
          hp.hashtag_id,
          h.name
        ORDER BY
          hashtag_count DESC
        LIMIT 10
      ) AS hashtags
    ) AS hashtag_count,
        (
      SELECT json_agg(posts)
      FROM (
        
SELECT     
 	pe.shared_link,
    	pe.description,
  	pe.user_id,
   	pe.id,
    pe.original_post_id,
    (SELECT count(*) from posts pi where pi.id = pe.original_post_id and pe.original_post_id is not null ) as repost_count,
   	(select exists(SELECT * from posts pi where pi.id = pe.original_post_id and pe.original_post_id is not null )) as isRepost, 
   	(SELECT name FROM users where users.id=(select user_id from posts pi WHERE pi.id=pe.original_post_id  and pe.original_post_id is not null)) AS original_user_name,
   	(SELECT id FROM users where users.id=(select user_id from posts pi WHERE pi.id=pe.original_post_id  and pe.original_post_id is not null)) AS original_user_id,
   	(SELECT name FROM users where users.id=pe.user_id) AS user_name,
   	(SELECT id FROM users where users.id=pe.user_id) AS user_id,
   	(
   	SELECT json_agg(json_build_object(
	   		'id', comments.id,
	   		'text', comments.text,
	   		'writer_id_info', 
	   		(
	   		SELECT json_agg(json_build_object(
	   			'id', users.id , 
	   			'name', users.name,
	   			'avatar', users.avatar,
	   			'isFollowed', (SELECT EXISTS (select * from followers where followers.user_id=$1 and followers.user_followed=comments.writer_id) )  			
	   			))
	   			from users where users.id=comments.writer_id
	   			))) FROM comments where comments.post_id=(select id from posts pi where pi.id=pe.original_post_id  and pe.original_post_id is not null)) AS original_comments,
	
	
   	(SELECT json_agg(json_build_object(
	   		'id', comments.id,
	   		'text', comments.text,
	   		'writer_id_info', 
	   		(
	   		SELECT json_agg(json_build_object(
	   			'id', users.id , 
	   			'name', users.name,
	   			'avatar', users.avatar,
	   			'isFollowed', (SELECT EXISTS (select * from followers where followers.user_id=$1 and followers.user_followed=comments.writer_id) )  			
	   			))
	   			from users where users.id=comments.writer_id
	   			))) FROM comments where comments.post_id=(select id from posts pi where pi.id=pe.id and pe.original_post_id is null)) AS comments,
			
	( SELECT count(l.post_id) from likes l where l.post_id=pe.original_post_id) AS original_likes_number,
	( SELECT count(l.post_id) from likes l where l.post_id=pe.id) AS likes_number,
   (SELECT avatar FROM users where users.id=(select user_id from posts pi WHERE pi.id=pe.original_post_id  and pe.original_post_id is not null)) AS original_avatar,
    (SELECT avatar FROM users where users.id=(select user_id from posts pi WHERE pi.id=pe.id  and pe.original_post_id is null)) AS avatar

FROM posts pe
WHERE (user_id = ANY(ARRAY(SELECT user_followed FROM followers WHERE followers.user_id = $1)) OR user_id = $1 OR (original_post_id = ANY(ARRAY(SELECT original_post_id FROM posts where original_post_id = ANY(ARRAY(SELECT user_followed FROM followers WHERE followers.user_id = $1)))))) 
    ORDER BY
    pe.created_at DESC
    LIMIT 10
    OFFSET $2
      ) AS posts
    ) AS posts;
    `, [id, offset])
}