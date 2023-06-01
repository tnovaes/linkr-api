import { getPostsByUserIDDB } from "../repositories/posts.repository.js";
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

export async function getPostsByUserID(req, res) {
    try {
    const {id} = req.params
    const user = await getPostsByUserIDDB(id)
    res.send(user.rows[0])
    } catch (err) {
        res.status(500).send(err.message);
    }
}