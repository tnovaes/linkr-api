import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { postSchema } from "../schemas/post.schema.js";
import { getPosts, getPostsByHashtagName, publishPost } from "../controllers/posts.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getPostsByUserID } from "../controllers/posts.controllers.js";
import { validateHashtagID } from "../middlewares/hashtags.middleware.js";

const postRouter = Router();

postRouter.post("/post", authenticate, validateSchema(postSchema), publishPost);
postRouter.get("/posts", authenticate, getPosts);
postRouter.get("/posts/users/:id", authenticate, getPostsByUserID);
postRouter.get("/posts/hashtag/:name", authenticate, validateHashtagID ,getPostsByHashtagName);

export default postRouter;