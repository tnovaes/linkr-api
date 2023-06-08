import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { postComment } from "../controllers/comments.controllers.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { commentSchema } from "../schemas/comment.schema.js";

const commentRoute = Router();

commentRoute.post("/comment/:postId", authenticate, validateSchema(commentSchema), postComment)

export default commentRoute