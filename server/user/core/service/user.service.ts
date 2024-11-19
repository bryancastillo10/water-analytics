import { ResetPasswordRequest, UpdateUserRequest} from "@/user/core/interface/IUserRepository";
import { UserRepository } from "@/user/user.repository";

import { generateAndSendVerificationCode } from "@/user/core/utils/nodemailer";

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

        return {
            message: "Verification code has been validated. Proceed to reset your password"
        } 
    }
}