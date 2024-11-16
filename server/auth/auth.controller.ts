import { Request, Response } from "express";
import { AuthService } from "@/auth/core/service/authService";

export class AuthController{
    constructor(private readonly authService: AuthService) {
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    async signIn(req: Request, res: Response) {
        try {
            const signInData = req.body;
            await this.authService.signIn(signInData);
            res.status(200).json({ "message": "You have successfully signed in" });
        }
        catch (error:any) {
             res.status(400).json({ error: error.message });
        }   
    }

    async signUp(req: Request, res: Response) {
        try {
            const signUpData = req.body;
            await this.authService.signUp(signUpData);
            res.status(201).json({ message: "New user has been created successfully" });
        }
        catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    async signOut(req: Request, res: Response) {
        res.status(200).json({ "message": "You have successfully logged out" });
    }
}