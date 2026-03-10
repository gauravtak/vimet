import { AuthRequest } from "../common/auth.js";
import { Response } from "express";
import {
  roomParticipantRepository,
  roomRepository,
  userRepository
} from "../db/repositories/index.js";

export const createRoom = async (req: AuthRequest, res: Response) => {
  const { name } = req.body;
  const hostId = req.user.id;
  try {
    const existingRoom = await roomRepository.findOneBy(hostId);
    if (existingRoom) {
      return res.status(500).json("Room already exists");
    }
    const newRoom = roomRepository.create({ name: name, hostId: hostId });
    await roomRepository.save(newRoom);
    res.status(201).json({ name: newRoom.name, hostId: newRoom.hostId, roomId: newRoom.id });
  } catch (err) {
    res.status(500).json("Error creating room");
  }
};

export const joinRoom = async (req: AuthRequest, res: Response) => {
  const { roomId } = req.body;
  const userId = req.user.id;
  try {
    const existingRoom = await roomRepository.findOneBy({ id: roomId });
    if (!existingRoom) {
      return res.status(404).json("Room does not exist");
    }
    const existingUser = await userRepository.findOneBy(userId);
    if (!existingUser) {
      return res.status(404).json("User does not exist");
    }
    const isParticipantInOtherRoom = await roomParticipantRepository.findOneBy({ participantId: userId });
    if (isParticipantInOtherRoom) {
      return res.status(400).json("User is already a participant in a room");
    }
    await roomParticipantRepository.insert({ roomId: roomId, participantId: userId });
    res.status(200).json({ roomId: roomId, participantId: userId });
  } catch (err) {
    res.status(500).json("Error joining room");
  }
}
