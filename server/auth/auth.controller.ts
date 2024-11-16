import { Request, Response } from "express";
import { AuthService } from "@/auth/core/service/authService";

import { generateTokenAndSetCookie } from "@/auth/utils/generateToken";

export class AuthController{
    constructor(private readonly authService: AuthService) {
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    async signIn(req: Request, res: Response) {
        try {
            const signInData = req.body;
            const loggedUser = await this.authService.signIn(signInData);

            generateTokenAndSetCookie(loggedUser.id, res);
            res.status(200).json({ "message": "You have successfully signed in", user: loggedUser });
        }
        catch (error:any) {
             res.status(400).json({ error: error.message });
        }   
    }

    
   async signUp(req: Request, res: Response) {
    try {
      const signUpData = req.body;
      const newUser = await this.authService.signUp(signUpData);
       
        generateTokenAndSetCookie(newUser.id, res);

      res.status(201).json({
        message: "New user has been created successfully",
        user: newUser 
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

    async signOut(req: Request, res: Response) {
        res.clearCookie("jwt")
        res.status(200).json({ "message": "You have successfully logged out" });
    }
}