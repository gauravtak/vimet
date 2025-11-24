import { Request, Response } from "express";

export const register = async (_: Request, res: Response) => {
  try {
    res.send("reigster");
    console.log("register user");
  } catch (err) {
    console.error("Error reigstering user");
  }
};

export const login = async (_: Request, res: Response) => {
  try {
    res.send("login");
    console.log("login user");
  } catch (err) {
    console.error("Error login user");
  }
};
