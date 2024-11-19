import { ResetPasswordRequest,  UpdateUserPasswordProps,  UpdateUserRequest} from "@/user/core/interface/IUserRepository";
import { UserRepository } from "@/user/user.repository";

import { generateAndSendVerificationCode } from "@/user/core/utils/nodemailer";
import { toHashPassword } from "@/auth/utils/bcrypt";

export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async updateUser({userId, toUpdateUser}: UpdateUserRequest) {
        if (!userId) {
            throw new Error("User id is not found");
        }

        const updatedUser = await this.userRepository.updateUserProfile({userId, toUpdateUser});

        return updatedUser;
    }

    async deleteUser(userId: string) {
            await this.userRepository.deleteUserProfile(userId);
        return;
    }

    async requestResetPassword(email:string) {
        if (!email) {
            throw new Error("Email is not found");
        }

        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User with this email does not exist");
        }

        const {code, expiry} = await generateAndSendVerificationCode(email);

        await this.userRepository.saveResetCode({email,code, expiry});

        return {
            message: "Verification code sent to your email"
        };
    }

    async verifyCode({email,code}:ResetPasswordRequest) {
        if (!email || !code) {
            throw new Error("Email and verification code are required for this request");
        };
        
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User associated with that email does not exist");
        };

        if (user.resetCode !== code) {
            throw new Error("Invalid verification code");
        }

        const thisTime = new Date();
        if (!user.resetCode || thisTime > new Date(user?.resetCodeExpiry!)) {
            throw new Error("Verification code had expired, try to request again");
        }

        return true;
    }

    async updatePassword({ email, newPassword, confirmNewPassword }:UpdateUserPasswordProps) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new Error("User associated with that email does not exist");
        };

        if (newPassword !== confirmNewPassword) {
            throw new Error("Passwords doesn't match. Try to type it again");
        }

        const hashedPassword = await toHashPassword(newPassword);
        if (!hashedPassword) {
            throw new Error("Hashing of new password failed");
        }
        
        await this.userRepository.updatePassword({email,hashedPassword});
        
        return {
            message: "Password has been updated successfully",
        }
    }
}