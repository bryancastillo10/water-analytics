import { SignInData, SignUpData } from "@/auth/core/entity/auth";

export interface IAuthRepository {
    signIn(singInData: SignInData): Promise<void>;
    signUp(signUpData: SignUpData): Promise<IAuthResponse>;
    signOut(): Promise<void>;
}

export interface IAuthResponse{
    id: string;
    username: string;
    email: string;
    profilePic: string;
    role: string;
}