import { Request, Response } from "express";
import { roomRepository, userRepository } from "../db/repositories/index.js";

export const createRoom = async (req: Request, res: Response) => {
    const { hostId } = req.body;

    try {
        const host = await userRepository.findOne({ where: { id: hostId } });
        if (!host) {
            return res.status(404).json({ message: "Host not found" });
        }
        const room = roomRepository.create({ hostId });
        await roomRepository.save(room);
        res.status(201).json({ room });
    } catch (error) {
        console.error("Error in creating room", error)
        res.status(500).json({ message: "Internal server error" });
    }
};

export const joinRoom = async (req: Request, res: Response) => {
    const { roomId, userId } = req.body;
    try {
        console.log("Room joined successfully");
        res.status(200).json({ message: "Room joined successfully" });
    } catch (error) {
        console.error("Error in joining room", error)
        res.status(500).json({ message: "Internal server error" });
    }
}