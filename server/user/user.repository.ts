import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError } from "@/infrastructure/errors/customErrors";

import { IUserRepository, SaveResetCodeProps, UpdateUserRequest, UpdatePasswordRepo } from "@/user/core/interface/IUserRepository";
import { UserData } from "@/user/core/entity/user";

export class UserRepository implements IUserRepository {
    private prisma = new PrismaClient();

    async updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData> {
        try {
            const user = await this.prisma.user.update({
              where: { id: userId },
              data: toUpdateUser,
            });

            const updatedUser: UserData = {
              ...user,
              resetCode: user.resetCode ?? undefined,
              resetCodeExpiry: user.resetCodeExpiry ?? undefined,
            };
            return updatedUser;        
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at updateUserProfile method");
            }
            throw Error;
        }
    };

    async deleteUserProfile(userId: string): Promise<void> {
        try{
            await this.prisma.user.delete({
            where: { id: userId }
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at deleteUserProfile method");
            }
            throw Error;
        }
    };

     async findUserByEmail(email: string): Promise<UserData | null> {
         try {
            const user = await this.prisma.user.findUnique({
              where: { email },
            });

            if (!user) {
              return null;
            }

            const existingUser: UserData = {
              ...user,
              resetCode: user.resetCode ?? undefined,
              resetCodeExpiry: user.resetCodeExpiry ?? undefined,
            };
             
            return existingUser;
         }
         catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at findUserByEmail method");
            }
            throw Error;
        }
    };
    
    async findUserByUsername(username: string): Promise<UserData | null> {
      try {
          const user = await this.prisma.user.findUnique({
          where: { username },
          });
        
          if(!user){
            return null;
          }
          return user as UserData;
         }
      catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          console.error(error.message);
          throw new DatabaseError("Database error at findUserByUsername method");
        }
        throw Error;
      }
    }

    async saveResetCode({ email, code, expiry }: SaveResetCodeProps) {
        try {
            await this.prisma.user.update({
            where: { email },
            data: {
                resetCode: code,
                resetCodeExpiry: expiry,
            },
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at saveResetCode method");
            }
            throw Error;
        }
      }
    
    async updatePassword({ email, hashedPassword }: UpdatePasswordRepo):Promise<void> {
        try {
            await this.prisma.user.update({
              where: { email },
              data: {
                password: hashedPassword,
              },
            });
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at updatePassword method");
            }
            throw Error;  
        }
    }
}