import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/auth/core/service/authService";

import { generateTokenAndSetCookie } from "@/utils/generateToken";

export class AuthController{
    constructor(private readonly authService: AuthService) {
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.signOut = this.signOut.bind(this);
    }
    
    async signIn(req: Request, res: Response, next: NextFunction) {
        try {
            const signInData = req.body;
            const loggedUser = await this.authService.signIn(signInData);

            generateTokenAndSetCookie(loggedUser.id, req, res);
            res.status(200).json({ "message": "You have successfully signed in", user: loggedUser });
        }
        catch (error) {
          next(error);
        }   
    }

    
   async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signUpData = req.body;
      const newUser = await this.authService.signUp(signUpData);
       
        generateTokenAndSetCookie(newUser.id, req, res);

      res.status(201).json({
        message: "Congratulations, your account has been registered",
        user: newUser 
      });
    } catch (error) {
      next(error);
    }
  }

    async signOut(req: Request, res: Response, next: NextFunction) {
       try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "You have been logged out successfully" });
    } catch (error:any) {
      next(error);
    }
    }
}