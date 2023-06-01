import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsersBySearchText, getPostsByUserID } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", authenticate, getUsersBySearchText);
userRouter.get("/users/:id", authenticate, getPostsByUserID);

export default userRouter;