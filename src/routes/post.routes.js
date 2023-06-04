import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { postSchema } from "../schemas/post.schema.js";
import { deleteByID, getPosts, publishPost } from "../controllers/posts.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { getPostsByUserID } from "../controllers/posts.controllers.js";

const postRouter = Router();

postRouter.post("/post", authenticate, validateSchema(postSchema), publishPost);
postRouter.get("/posts", authenticate, getPosts);
postRouter.get("/posts/users/:id", authenticate, getPostsByUserID);
postRouter.delete("/post/:id", authenticate, deleteByID)

export default postRouter;