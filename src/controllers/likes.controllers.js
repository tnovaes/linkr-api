import { addLikeByUserIDAndPostID, getLikeByUserIDAndPostID, getPostsLikesDB, removeLikeByUserIDAndPostID } from "../repositories/likes.repository.js";

export async function toggleLike(req, res) {
    try {
        const { id } = req.tokenData;
        const { post_id } = req.params
        const likes = await getLikeByUserIDAndPostID(id, post_id)
        if (likes.rowCount > 0) {
            removeLikeByUserIDAndPostID(id, post_id)
        } else {
            addLikeByUserIDAndPostID(id, post_id)
        }
        res.send();
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function getPostsLikes(req, res) {
    try {
        const { post_id } = req.params
        const likes = await getPostsLikesDB(post_id)
        res.send(likes.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}