import Router from "express";
import { createRoom, joinRoom } from "../controllers/room.controller.js";

const roomRouter = Router();

roomRouter.post("/create", createRoom)
roomRouter.post("/join", joinRoom)

export default roomRouter;