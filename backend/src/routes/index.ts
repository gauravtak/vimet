import { Router } from "express";
import { router as authRouter } from "./auth";

const router = Router();

router.use("/auth", authRouter);

export default router;
