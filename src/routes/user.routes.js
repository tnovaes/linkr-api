import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsersBySearchText, getUserPhoto, getUserLikes } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", authenticate, getUsersBySearchText);
userRouter.get("/users/profilePhotoUrl", authenticate, getUserPhoto);
userRouter.get("/users/likes", authenticate, getUserLikes);

export default userRouter;