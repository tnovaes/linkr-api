import { createUser, getUserByEmail } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";

export async function signUp(req, res) {
    const { name, email, password, avatar } = req.body;

    try {
        const user = getUserByEmail(email);
        if (user.rowCount) return res.status(400).send({ message: "Email already registered." });

        const hash = bcrypt.hashSync(password, 10);
        await createUser(name, email, hash, avatar);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}