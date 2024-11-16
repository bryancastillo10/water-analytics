import { PrismaClient } from "@prisma/client";
import { IAuthRepository, IAuthResponse } from "@/auth/core/interface/IAuthRepository";
import { SignUpData } from "@/auth/core/entity/auth";

export class AuthRepository implements IAuthRepository {
    private prisma = new PrismaClient();

    async createUser(signUpData: SignUpData): Promise<IAuthResponse> {
        const newUser = await this.prisma.user.create({
            data: {
                username: signUpData.username,
                email: signUpData.email,
                password: signUpData.password,
                profilePic: signUpData.profilePicURL || "",
                role: signUpData.role,
            },
        });

        return {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            profilePic: newUser.profilePic,
            role: newUser.role,
        };
    }

    async findByEmail(email: string): Promise<IAuthResponse|null> {
        const user = await this.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                username: true,
                email: true,
                profilePic: true,
                role: true,
            },
        });

        if (!user) {
            return null;
        }

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
        };
    }
}
