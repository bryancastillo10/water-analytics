import { UpdateUserRequest } from "@/user/core/interface/IUser";
import { UserRepository } from "@/user/user.repository";

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
        try {
            await this.deleteUser(userId);
        }
        catch (error: any) {
            throw new Error("Deleting the user account has failed");
        }
        return;
    }
}