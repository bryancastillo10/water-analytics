import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId: string, req: Request, res: Response) => {
    const userAgent = req.headers["user-agent"] || "";
    const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent);

    const token = jwt.sign(
        {userId}, 
        process.env.JWT_SECRET as string,
        {expiresIn: "5h"})
        res.cookie("jwt", token, 
        {
            maxAge: 5 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite: isSafari ? undefined : "strict",
            secure: isSafari ? false : process.env.NODE_ENV !== "development"
        });
}