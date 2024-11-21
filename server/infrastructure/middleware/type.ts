import { Request } from "express";
export interface SafeUser {
    id: string;
    username: string;
    password?: string;
    email: string;
    profilePic: string;
    role: string;
  }

export interface CustomRequest extends Request {
    user?: SafeUser;
}