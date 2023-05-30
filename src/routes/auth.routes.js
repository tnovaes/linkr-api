import { Router } from "express";
import { userSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { signUp } from "../controllers/auth.controllers.js";
import { signIn } from "../controllers/auth.controllers.js";
import { authenticate } from "../middlewares/auth.middlewares.js";
import { accountSchema } from "../schemas/account.schema.js";

const authRouter = Router();

authRouter.post("/signin", validateSchema(accountSchema), signIn);
authRouter.post("/signup", validateSchema(userSchema), signUp);

export default authRouter;