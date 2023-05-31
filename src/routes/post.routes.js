import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { postSchema } from "../schemas/post.schema.js";
import { publishPost } from "../controllers/posts.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const postRouter = Router();

postRouter.post("/post", authenticate, validateSchema(postSchema), publishPost);

export default postRouter;