import { UpdateUserRequest, ResetPasswordRequest } from "@/user/core/interface/IUser";
import { UserRepository } from "@/user/user.repository";

import { generateVerificationCode } from "@/user/core/utils/nodemailer";

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

    async updatePassword({email, toUpdatePassword}: ResetPasswordRequest) {
        if (!email) {
            throw new Error("User associated with that email is not found");
        }

        const code = generateVerificationCode();
        console.log(code);
        const newPassword = await this.userRepository.resetPasword({ email, toUpdatePassword });

        return newPassword;
    }

    async deleteUser(userId: string) {
            await this.userRepository.deleteUserProfile(userId);
        return;
    }
}