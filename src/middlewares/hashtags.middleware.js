import { findHashtagByIDDB } from "../repositories/hashtags.repository.js";

export async function validateHashtagID(req, res, next) {
    const { id } = req.params;
    try {
        const response = await findHashtagByIDDB(id);
        if (response.rowCount === 0) return res.status(404).send({ message: "Hashtag não encontrada" });
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}