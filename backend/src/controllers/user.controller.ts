import { AuthRequest } from "../common/auth.js";
import { Response } from "express";
import { userRepository } from "../db/repositories/index.js";
import _ from "lodash";

export const getAuthUser = async (req: AuthRequest, res: Response) => {
  const { id } = req.user;
  try {
    const user = await userRepository.findOneBy(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exists" });
    }
    const safeUser = _.omit(user, ["password"]);
    res.status(200).json(safeUser);
  } catch (error) {
    console.error("Error in fetching user", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
