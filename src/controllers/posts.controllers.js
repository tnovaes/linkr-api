import { addHashtagPostDB, createHashtagDB, findHashtagDB, hashtagTop10DB } from "../repositories/hashtags.repository.js";
import { insertPost, listPosts, getPostsByUserIDDB, getPostsByHashtagDB, deleteHashtag, deletePost, getOwner, editPostDB, insertRepostIntoPosts, getPostById } from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";
import { getUserByIDDB } from "../repositories/user.repository.js";
import { hasFriendsAsFollowed } from "../repositories/followers.repository.js";
import { getComments } from "../repositories/comments.repository.js";
import { getTimelineDB } from "../repositories/timeline.query.js";

export async function publishPost(req, res) {
    const { id } = req.tokenData;
    const { shared_link, description } = req.body;
    const postHashtags = description.match(/#\w+/g);
    try {
        const { rows: response } = await insertPost(id, shared_link, description);
        const postID = response[0].id;
        if (postHashtags) {
            for (let i = 0; i < postHashtags.length; i++) {
                const findResponse = await findHashtagDB(postHashtags[i]);
                let hashtagID = "";
                if (findResponse.rowCount === 0) {
                    const createResponse = await createHashtagDB(postHashtags[i])
                    hashtagID = createResponse.rows[0].id;
                } else {
                    hashtagID = findResponse.rows[0].id;
                }
                await addHashtagPostDB(postID, hashtagID);
            }
        } else {
            console.log("nao possuo hashtags")
        }
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPosts(req, res) {
    const { id } = req.tokenData
    const { page } = req.query;
    const offset = page ? Number(page) * 10 : 0;
    try {
        const hasFriendsAdded = await hasFriendsAsFollowed(id)
        const hasFriends = hasFriendsAdded.rowCount > 0
        const [posts, { rows: hashtags }] = await Promise.all([listPosts(id, offset), hashtagTop10DB()])
        console.log(posts.rows);
        const postsWithMetadata = await getMetadataForEachLink(posts.rows);
        const PostsWithComments = await addCommentOnPosts(postsWithMetadata);
        const response = [PostsWithComments, hashtags, { hasFriends }];
        res.status(200).send(response);
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}
export async function getTimeline(req, res) {
    const { id } = req.tokenData
    const { page } = req.query;
    const offset = page ? Number(page) * 10 : 0;
    try {
        const response = await getTimelineDB(id, offset)
        console.log(response.rows)
        const Posts = response.rows[0].posts.map(item=> {
            return item.isrepost ? ({
                shared_link:item.shared_link,
                description: item.description,
                user_id:item.user_id,
                id:item.id,
                isRepost: item.isrepost,
                repost_count: item.repost_count,
                original_name: item.original_user_name,
                user_name: item.user_name,
                original_post_id:item.original_post_id,
                comments: item.original_comments ? item.original_comments: [],
                avatar:item.original_avatar ? item.original_avatar : null,
                likes: item.original_likes_number,
                original_id: item.original_user_id,
                user_id: item.user_id,
            }) : ({
                shared_link:item.shared_link,
                description: item.description,
                user_id:item.user_id,
                id:item.id,
                original_id: item.original_user_id,
                repost_count: item.repost_count,
                isRepost: item.isrepost,
                original_name: item.original_user_name,
                user_name: item.user_name,
                comments: item.comments ? item.comments: [],
                avatar:item.avatar ? item.avatar : null,
                likes: item.likes_number
            })
        })
        // res.status(200).send(response.rows[0].posts);
        res.status(200).send({posts: Posts, hashtag_count: response.rows[0].hashtag_count, hasFriendsAsFollowed:response.rows[0].has_followers[0].has_followers });
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    }
}



export async function getPostsByUserID(req, res) {
    try {
        const { id } = req.params
        const posts = await getPostsByUserIDDB(id);
        const { rows: hashtags } = await hashtagTop10DB();
        if (!posts.rowCount) return res.status(204).send({ message: "There are no posts yet" });
        const { rows: user } = await getUserByIDDB(id);
        const postsWithMetadata = await getMetadataForEachLink(posts.rows);
        const PostsWithComments = await addCommentOnPosts(postsWithMetadata);
        const response = [PostsWithComments, hashtags, user];
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPostsByHashtagName(req, res) {
    try {
        const { name } = req.params
        const hashtag = "#" + name;
        const posts = await getPostsByHashtagDB(hashtag);
        const { rows: hashtags } = await hashtagTop10DB();
        if (!posts.rowCount) return res.status(204).send({ message: "There are no posts yet" });

        const postsWithMetadata = await getMetadataForEachLink(posts.rows);

        const response = [postsWithMetadata, hashtags];
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function deleteByID(req, res) {
    const data = req.tokenData
    const { id } = req.params
    try {
        const owner = await getOwner(id);
        if (!owner.rows[0] || owner.rows[0].user_id != data.id) { return res.sendStatus(405) }
        await deleteHashtag(id);
        await deletePost(id);
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function editPost(req, res) {
    const { id } = req.params
    const data = req.tokenData
    const { description } = req.body
    try {
        const owner = await getOwner(id);
        if (!owner.rows[0] || owner.rows[0].user_id != data.id) { return res.sendStatus(405) }
        await editPostDB(id, description);
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function addCommentOnPosts(posts) {
    const { rows: cm } = await getComments()
    const newPostArray = posts.map((post) => {
        const comments = cm.filter(comment => {
            if (post.original_post_id) {
              return comment.post_id === post.original_post_id;
            } else {
              return comment.post_id === post.post_id;
            }
          });
        return { ...post, comments };
    })

    return newPostArray
}

async function getMetadataForEachLink(posts) {
    const metadataPromises = posts.map(async (post) => {
        try {
            const metadata = await urlMetadata(post.shared_link);
            return {
                name: post.name,
                avatar: post.avatar,
                post_id: post.id || post.post_id,
                original_post_id: post.original_post_id || null,
                likes: post.likes,
                description: post.description,
                shared_link: post.shared_link,
                post_owner: post.user_id,
                reposter_name: post.reposter_name || null,
                repost_count: post.repost_count,
                link_title: metadata.title,
                link_description: metadata.description,
                link_image: metadata.image
            };
        } catch (error) {
            console.error(`Error to obtain metadata for URL: ${post.shared_link}`, error);
            return {
                name: post.name,
                avatar: post.avatar,
                post_id: post.id || post.post_id,
                original_post_id: post.original_post_id || null,
                likes: post.likes,
                description: post.description,
                shared_link: post.shared_link,
                post_owner: post.user_id,
                reposter_name: post.reposter_name || null,
                repost_count: post.repost_count,
                link_title: null,
                link_description: null,
                link_image: null
            };
        }
    });


    return Promise.all(metadataPromises);
}

export async function sharePost(req, res) {
    const { id } = req.tokenData;
    const { post_id } = req.body;

    try {
        const og_post = await getPostById(post_id);
        console.log(og_post);
        if (!og_post.rowCount) return res.status(404).send({ message: "Original post doesn't exist" })

        const repost = {
            user_id: id,
            shared_link: og_post.rows[0].shared_link,
            description: og_post.rows[0].description,
            original_post_id: post_id
        }

        await insertRepostIntoPosts(repost.user_id, repost.shared_link, repost.description, repost.original_post_id);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
