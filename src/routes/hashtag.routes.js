import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getHashtags } from "../controllers/hashtags.controllers.js";

const hastagRouter = Router();

hastagRouter.get("/hashtags", authenticate, getHashtags);

export default hastagRouter;