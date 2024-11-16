import { PrismaClient } from "@prisma/client";
import { IAuthRepository, IAuthResponse } from "@/auth/core/interface/IAuthRepository";
import { SignInData, SignUpData } from "@/auth/core/entity/auth";

export class AuthRepository implements IAuthRepository{
    private prisma = new PrismaClient();

    async signIn(signInData: SignInData) {
        return ;
    }

    async signUp(signUpData: SignUpData): Promise<IAuthResponse> {
        const newUser = await this.prisma.user.create({
            data: {
                username: signUpData.username,
                email: signUpData.email,
                password: signUpData.password,
                profilePic: signUpData.profilePicURL || "",
                role: signUpData.role,
            }
        });

        return newUser;
    }

   async findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    async signOut() {
        return;
    }
}