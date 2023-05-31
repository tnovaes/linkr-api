import { getUsersDB } from "../repositories/user.repository.js";

export async function getUsers(req, res) {
    const { id } = req.tokenData;
    try {
        const users = await getUsersDB(id)
        res.send(users.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}