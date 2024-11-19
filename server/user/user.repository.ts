import { PrismaClient } from "@prisma/client";
import { IUserRepository, SaveResetCodeProps, UpdateUserRequest } from "./core/interface/IUserRepository";
import { UserData } from "@/user/core/entity/user";

export class UserRepository implements IUserRepository {
    private prisma = new PrismaClient();

    async updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData> {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: toUpdateUser,
        });

        const updatedUser: UserData = {
            ...user,
            resetCode: user.resetCode ?? undefined,
            resetCodeExpiry: user.resetCodeExpiry ?? undefined
        };

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

     async findUserByEmail(email: string): Promise<UserData | null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
         
         if (!user) {
             return null;
         } 
         
         const existingUser: UserData = {
             ...user,
             resetCode: user.resetCode ?? undefined,
             resetCodeExpiry: user.resetCodeExpiry ?? undefined
         };

        return existingUser;
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