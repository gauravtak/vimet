import authRouter from "./auth.route.js";
import roomRouter from "./room.route.js";
import userRouter from "./user.route.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/room", roomRouter);

export default router;
