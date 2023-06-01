import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { postSchema } from "../schemas/post.schema.js";
import { getPosts, publishPost } from "../controllers/posts.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";

const postRouter = Router();

postRouter.post("/post", authenticate, validateSchema(postSchema), publishPost);
postRouter.get("/posts", authenticate, getPosts);

export default postRouter;