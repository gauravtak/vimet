import Router from "express";
import { createRoom, joinRoom } from "../controllers/room.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const roomRouter = Router();

roomRouter.post("/create", authMiddleware, createRoom);
roomRouter.post("/join", authMiddleware, joinRoom);
export default roomRouter;
