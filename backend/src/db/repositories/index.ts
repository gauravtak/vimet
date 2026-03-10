import { User } from "../entities/user.entity.js";
import { Room } from "../entities/room.entity.js";
import { RoomParticipant } from "../entities/roomParticipant.entity.js";
import { AppDataSource } from "../data-source.js";

export const userRepository = AppDataSource.getRepository(User);
export const roomRepository = AppDataSource.getRepository(Room);
export const roomParticipantRepository =
  AppDataSource.getRepository(RoomParticipant);
