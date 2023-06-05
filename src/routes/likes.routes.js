import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getPostsLikes, toggleLike } from "../controllers/likes.controllers.js";

const likesRouter = Router();

likesRouter.post("/likes/:post_id", authenticate, toggleLike);
likesRouter.get("/likes/:post_id", authenticate, getPostsLikes);

export default likesRouter;