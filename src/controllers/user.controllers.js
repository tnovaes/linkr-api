import { getUsersBySearchTextDB } from "../repositories/user.repository.js";

export async function getUsersBySearchText(req, res) {
    const { id } = req.tokenData;
    const {searchText} = req.body
    try {
        const users = await getUsersBySearchTextDB(id,searchText)
        res.send(users.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}