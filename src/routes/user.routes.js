import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsersBySearchText } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", authenticate, getUsersBySearchText);

export default userRouter;