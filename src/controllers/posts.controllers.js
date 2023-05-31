import { insertPost } from "../repositories/post.repository.js";
import { getUserByEmail } from "../repositories/user.repository.js";

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