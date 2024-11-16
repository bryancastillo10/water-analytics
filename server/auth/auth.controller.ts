import { Request, Response } from "express";
import { AuthService } from "@/auth/core/service/authService";

export class AuthController{
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }    
    
    async signIn(req: Request, res: Response) {
        const signInData = req.body;

        // const validateSignIn = await this.authService.signIn(signInData);

        res.status(200).json({ "message": "You have successfully signed in" });
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