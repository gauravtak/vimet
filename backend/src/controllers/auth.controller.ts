import { Request, Response } from "express";
import { userRepository } from "../db/repositories/index.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import * as _ from "lodash";

export const register = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const passwordHash = await argon2.hash(password);
        const user = userRepository.create({ username, email, password: passwordHash });
        await userRepository.save(user);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error in registering user", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await userRepository.findOne({ where: { email } });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await argon2.verify(existingUser.password, password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: _.omit(existingUser, ["password"]), accessToken: token });
    } catch (error) {
        console.error("Error in login", error)
        res.status(500).json({ message: "Internal server error" });
    }
}