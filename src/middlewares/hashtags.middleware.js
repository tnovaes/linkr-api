import { findHashtagDB } from "../repositories/hashtags.repository.js";

export async function validateHashtagID(req, res, next) {
    const { name } = req.params;
    const hashtag = "#"+name;
    try {
        const response = await findHashtagDB(hashtag);
        if (response.rowCount === 0) return res.status(404).send({ message: "Hashtag não encontrada" });
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}