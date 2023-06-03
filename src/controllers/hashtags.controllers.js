import { getHashtagsDB } from "../repositories/hashtags.repository.js";

export async function getHashtags(req, res) {
    try {
        const { rows: hashtags } = await getHashtagsDB();

        res.status(200).send(hashtags);
    } catch (err) {
        res.status(500).send(err.message);
    }
}