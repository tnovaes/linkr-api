import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsersBySearchText, getUserPhoto } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", authenticate, getUsersBySearchText);
userRouter.get("/users/profilePhotoUrl", authenticate, getUserPhoto);

export default userRouter;