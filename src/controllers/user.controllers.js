import { getUserPhotoDB, getUsersBySearchTextDB } from "../repositories/user.repository.js";

export async function getUsersBySearchText(req, res) {
    const { id } = req.tokenData;
    const { searchText } = req.body
    try {
        const users = await getUsersBySearchTextDB(id, searchText)
        res.send(users.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getUserPhoto(req, res) {
    try {
        const { id } = req.tokenData
        const avatar = await getUserPhotoDB(id)
        res.send(avatar.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}