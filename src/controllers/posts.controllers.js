import { insertPost, listLast20Posts } from "../repositories/posts.repository.js";
import { getUserByEmail } from "../repositories/user.repository.js";
import urlMetadata from "url-metadata";

export async function publishPost(req, res) {
    const { email, shared_link, description } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (!user.rowCount) return res.status(401).send({ message: "Unauthorized" });

        const user_id = user.rows[0].id;
        await insertPost(user_id, shared_link, description);

        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await listLast20Posts();
        
        if(!posts.rowCount) return res.status(204).send({message: "There are no posts yet"});
        
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
                description: post.description,
                shared_link: post.shared_link,
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
                link_title: null,
                link_description: null,
                link_image: null
            };
        }
    });

    return Promise.all(metadataPromises);
}