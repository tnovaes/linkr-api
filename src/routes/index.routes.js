import { Router } from "express";
import authRouter from "./auth.routes.js";
import postRouter from "./post.routes.js";
import userRouter from "./user.routes.js";
import hastagRouter from "./hashtag.routes.js";
import likesRouter from "./likes.routes.js";

const router = Router();

router.use(authRouter);
router.use(postRouter);
router.use(userRouter);
router.use(hastagRouter);
router.use(likesRouter);

export default router;