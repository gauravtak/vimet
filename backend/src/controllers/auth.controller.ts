import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
    try {
        console.log("register")
        res.status(200).json({ message: "register" });
    } catch (error) {
        console.log(error)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        console.log("login")
        res.status(200).json({ message: "login" });
    } catch (error) {
        console.log(error)
    }
}