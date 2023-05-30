import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
export async function authenticate(req, res, next) {
    try{
        const { authorization } = req.headers
        if (!authorization) return res.status(401).send()
        const token = authorization?.replace("Bearer ", "")
        const data = jwt.verify(token, process.env.JWT_PASSWORD)
        req.tokenData = data
        next()
    } catch (e) {
        res.status(401).send()
    }
} 