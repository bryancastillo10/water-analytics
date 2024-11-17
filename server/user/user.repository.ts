import { PrismaClient } from "@prisma/client";
import { IUserRepository, UpdateUserRequest } from "./core/interface/IUser";
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

    async deleteUser(userId: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id: userId }
        });
    };
  
   
}