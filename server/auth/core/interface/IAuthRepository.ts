import { SignInData, SignUpData } from "@/auth/core/entity/auth";

export interface IAuthRepository {
    signIn(singInData: SignInData): Promise<void>;
    signUp(signUpData: SignUpData): Promise<void>;
    signOut(): Promise<void>;
}