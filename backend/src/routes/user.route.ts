import Router from "express";
import { getAuthUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authMiddleware, getAuthUser);

export default userRouter;
