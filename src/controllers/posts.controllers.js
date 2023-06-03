import { addHashtagPostDB, createHashtagDB, findHashtagDB, hashtagTop10DB } from "../repositories/hashtags.repository.js";
import { insertPost, listLast20Posts, getPostsByUserIDDB, getPostsByHashtagDB } from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
    const { id } = req.tokenData;
    const { shared_link, description } = req.body;
    const postHashtags = description.match(/#\w+/g);
    try {
        const  { rows : response } = await insertPost(id, shared_link, description);
        const postID = response[0].id;
        if (postHashtags) {
            for (let i = 0; i < postHashtags.length; i++) {
                const findResponse = await findHashtagDB(postHashtags[i]);
                let hashtagID = "";
                if (findResponse.rowCount === 0){
                    const createResponse  = await createHashtagDB(postHashtags[i])
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
    try {
        const posts = await listLast20Posts();
        const { rows: hashtags } = await hashtagTop10DB();
        if (!posts.rowCount) return res.status(204).send({ message: "There are no posts yet" });

        const postsWithMetadata = await getMetadataForEachLink(posts.rows);

        const response = [postsWithMetadata, hashtags];
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function getMetadataForEachLink(posts) {
    const metadataPromises = posts.map(async (post) => {
        try {
            const metadata = await urlMetadata(post.shared_link);
            return {
                name: post.name,
                avatar: post.avatar,
                description: post.description,
                shared_link: post.shared_link,
                post_owner: post.user_id,
                link_title: metadata.title,
                link_description: metadata.description,
                link_image: metadata.image
            };
        } catch (error) {
            console.error(`Error to obtain metadata for URL: ${post.shared_link}`, error);
            return {
                name: post.name,
                avatar: post.avatar,
                description: post.description,
                shared_link: post.shared_link,
                post_owner: post.user_id,
                link_title: null,
                link_description: null,
                link_image: null
            };
        }
    });


    return Promise.all(metadataPromises);
}

export async function getPostsByUserID(req, res) {
    try {
        const { id } = req.params
        const user = await getPostsByUserIDDB(id)
        res.send(user.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPostsByHashtagName(req, res) {
    try {
        const { name } = req.params
        const hashtag = "#"+name;
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