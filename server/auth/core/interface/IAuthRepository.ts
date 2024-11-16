import { SignUpData } from "@/auth/core/entity/auth";

export interface IAuthRepository {
    createUser(signUpData: SignUpData): Promise<IAuthResponse>;
    findByEmail(email:string): Promise<IAuthResponse|null>;
}

export interface IAuthResponse{
    id: string;
    username: string;
    password?: string | null;
    email: string;
    profilePic: string;
    role: string;
}