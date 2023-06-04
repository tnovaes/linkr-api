import { insertPost, listLast20Posts, getPostsByUserIDDB, getOwner, deletePost, deleteHashtag } from "../repositories/posts.repository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
    const { id } = req.tokenData;
    const { shared_link, description } = req.body;

    try {
        await insertPost(id, shared_link, description);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await listLast20Posts();

        if (!posts.rowCount) return res.status(204).send({ message: "There are no posts yet" });

        const postsWithMetadata = await getMetadataForEachLink(posts.rows)

        res.status(200).send(postsWithMetadata);
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
                post_id: post.id,
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
                post_id: post.id,
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

export async function deleteByID(req,res) {
    const data = req.tokenData
    const {id} = req.params
    try{
        const owner = await getOwner(id);
        if(!owner.rows[0] || owner.rows[0].user_id!=data.id){return res.sendStatus(405)}
        await deleteHashtag(id);
        await deletePost(id);
        res.sendStatus(200)
    }catch (err) {
        res.status(500).send(err.message);
    }
}