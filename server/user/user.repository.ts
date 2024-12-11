import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError, ValidationError } from "@/infrastructure/errors/customErrors";

import { IUserRepository, SaveResetCodeProps, UpdateUserRequest, UpdatePasswordRepo, UpdateProfilePicRequest } from "@/user/core/interface/IUserRepository";
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
    
    async verifyUserRole(userId: string): Promise<boolean> {
      try {
          const user = await this.prisma.user.findUnique({
              where: { id: userId }
          });

          if (!user) {
              throw new ValidationError("User not found");
          }
  
          const isUserVerified = user?.role === "ADMIN" || user?.role === "ANALYST";
          return isUserVerified;
      }
      catch (error) {
          if (error instanceof PrismaClientKnownRequestError) {
              console.error(error.message);
              throw new DatabaseError("Database error at getSiteByUser method");
            }
           throw Error;
         }
      }
     
     async getAllUsers(): Promise<UserData[]> {
       try {
         const allUsers = await this.prisma.user.findMany();

         return allUsers.map(user => ({
           ...user,
           resetCode: user.resetCode ?? undefined,
           resetCodeExpiry: user.resetCodeExpiry ?? undefined
         }));
       }
       catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.error(error.message);
            throw new DatabaseError("Database error at getSiteByUser method");
          }
         throw Error;
       }
     }
     async findUserByEmail(email: string): Promise<UserData | null> {
         try {
            const user = await this.prisma.user.findUnique({
              where: { email },
            });
           
            if (!user) {
              throw new ValidationError("User was not found in the database");
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
            throw new ValidationError("User was not found in the database");
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
  
  async updateProfilePicture({ userId, imageUrl }: UpdateProfilePicRequest) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          profilePic: imageUrl
        }
        });
      return updatedUser.profilePic as string;
      }
      catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          console.error(error.message);
          throw new DatabaseError("Database error at updateProfilePicture method");
        }
        throw Error;  
    }
    }
}