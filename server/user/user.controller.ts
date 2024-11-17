import { Request, Response } from "express";
import { UserService } from "@/user/core/service/user.service";

export class UserController {
    constructor(private readonly userService: UserService) {
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    async updateUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const toUpdateUser = req.body;
            const updatedUser = await this.userService.updateUser({userId, toUpdateUser});

            res.status(200).json({ message: "Your profile has been updated successfully", user: updatedUser });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id; 
            await this.userService.deleteUser(userId);

            res.status(200).json({ message: "You have deleted your account successfully"});
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}