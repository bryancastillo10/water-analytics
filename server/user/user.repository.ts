import { PrismaClient } from "@prisma/client";
import { IUserRepository, SaveResetCodeProps, UpdateUserRequest } from "./core/interface/IUserRepository";
import { UserData } from "@/user/core/entity/user";

export class UserRepository implements IUserRepository {
    private prisma = new PrismaClient();

    async updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData> {
        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                username: toUpdateUser.username,
                email: toUpdateUser.email
            },
        });

        return updatedUser;        
    };

    async deleteUserProfile(userId: string): Promise<void> {
        try{
            await this.prisma.user.delete({
            where: { id: userId }
            });
        }
        catch (error) {
            throw new Error("Deleting the user account has failed");
        }
    };

    async findUserbyEmail(email: string): Promise<UserData | null> {
        throw new Error("Method not yet implemented");
    }

      async saveResetCode({email,code,expiry}:SaveResetCodeProps){
        await this.prisma.user.update({
            where: { email },
            data: {
                resetCode: code,
                resetCodeExpiry: expiry,
            },
        });
    }

}