import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

export const router = Router();

router.get("/register", register);
router.get("/login", login);
