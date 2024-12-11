import { Request, Response, NextFunction } from "express";
import { UserService } from "@/user/core/service/userService";

export class UserController {
    constructor(private readonly userService: UserService) {
        this.updateUser = this.updateUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.requestResetPassword = this.requestResetPassword.bind(this);
        this.verifyCodeForReset = this.verifyCodeForReset.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.updateProfilePicture = this.updateProfilePicture.bind(this);
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const toUpdateUser = req.body;
            const updatedUser = await this.userService.updateUser({userId, toUpdateUser});

            res.status(200).json({ message: "Your profile has been updated successfully", user: updatedUser });
        } catch (error) {
            next(error);
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.query.id;
            const allUsers = await this.userService.getAllUser(String(userId));

            res.status(200).json({users: allUsers})

        } catch (error) {
            next(error)
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            const username  = req.query.username;
            await this.userService.deleteUser({userId, username: String(username) });

            res.status(200).json({ message: "You have deleted your account successfully"});
        } catch (error) {
            next(error);
        }
    }

    async requestResetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const {email} = req.body;
            const message = await this.userService.requestResetPassword(email);

            res.status(200).json({ message: message });
            
        }catch (error) {
            next(error);
        }
    }

    async verifyCodeForReset(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, code } = req.body;

            const isVerified = await this.userService.verifyCode({ email, code });

            res.status(200).json({ isVerified});
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, newPassword, confirmNewPassword } = req.body;

            const message = await this.userService.updatePassword({ email, newPassword, confirmNewPassword });

            res.status(200).json({ message: message });
        } catch (error) {
            next(error);
        }
    }


    async updateProfilePicture(req: Request, res: Response, next: NextFunction) {
        try {
            const { file } = req;
            const userId = req.params.id;

            if (!file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }

            const profPicUrl = await this.userService.updateProfilePicture(userId, file);

            res.status(200).json({ "message": "Profile picture has been updated", profilePic: profPicUrl });
        } catch (error) {
            next(error);
        }
    }
}