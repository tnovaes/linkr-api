import { postCommentDB } from "../repositories/comments.repository.js";
import { getPostById } from "../repositories/posts.repository.js";

export async function postComment(req,res){
    const { text } = req.body
    const { id } = req.tokenData
    const { postId } = req.params
    try{
        const post = await getPostById(postId);
        if (!post.rows[0]) return res.sendStatus(405)
        await postCommentDB(text,id,postId)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message);
    }
}