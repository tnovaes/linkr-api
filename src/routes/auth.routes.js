import { Router } from "express";
import { userSchema } from "../schemas/user.schema.js";
import { validateSchema } from "../middlewares/validateSchemas.js";
import { signUp } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(userSchema), signUp);

export default authRouter;