import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsers } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.get("/users", authenticate, getUsers);

export default userRouter;