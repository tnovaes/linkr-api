import { addLikeByUserIDAndPostID, getLikeByUserIDAndPostID, removeLikeByUserIDAndPostID } from "../repositories/likes.repository.js";

export async function toggleLike(req, res) {
    try {
        const { id } = req.tokenData;
        const { post_id } = req.params
        console.log(post_id)
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