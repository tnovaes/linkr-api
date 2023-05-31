import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../repositories/user.repository.js";
import bcrypt from "bcrypt";
import { createSession, removeSession } from "../repositories/session.repository.js";

export async function signUp(req, res) {
    const { name, email, password, avatar } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (user.rowCount) return res.status(400).send({ message: "Email already registered." });

        const hash = bcrypt.hashSync(password, 10);
        await createUser(name, email, hash, avatar);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function signIn(req, res) {
    const { email, password } = req.body;
    try {
        const user =  await getUserByEmail(email);
        if (user.rowCount===0) return res.status(401).send({ message: "Unauthorized" });
        const user_id = user.rows[0].id;
        const isValidPassword = bcrypt.compareSync(password, user.rows[0].password);
        if (!isValidPassword) return res.status(401).send({ message: "Unauthorized" });
        const token = jwt.sign({id: user_id}, process.env.JWT_PASSWORD);
        createSession(token, user_id);
        res.send({token});
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export async function logout(req, res) {
    const { id } = req.tokenData;
    const { authorization } = req.headers
    const token = authorization.replace("Bearer ", "")
    try {
        const result = await removeSession(token, id)
        if (result.rowCount>0){
            return res.sendStatus(200);
        }
        return res.sendStatus(404)
    } catch (err) {
        res.status(500).send(err.message);
    }
}