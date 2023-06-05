import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { toggleLike } from "../controllers/likes.controllers.js";

const likesRouter = Router();

likesRouter.post("/likes/:post_id", authenticate, toggleLike);

export default likesRouter;