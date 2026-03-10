import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../common/auth.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing access token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error in auth middleware");
    res.status(401).json("Unauthorized: Invalid or expired token");
  }
};
