import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getUsersBySearchText, getUserPhoto, getUserLikes, getUserProfilePhoto, toggleFollow, getIsFollowing } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.post("/users", authenticate, getUsersBySearchText);
userRouter.get("/users/profilePhotoUrl", authenticate, getUserProfilePhoto);
userRouter.get("/users/:id/profilePhotoUrl", authenticate, getUserPhoto);
userRouter.post("/users/:id/follow", authenticate, toggleFollow);
userRouter.get("/users/:id/following", authenticate, getIsFollowing);
userRouter.get("/users/likes", authenticate, getUserLikes);

export default userRouter;