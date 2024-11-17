import { UserData } from "@/user/core/entity/user";

export interface IUserRepository {
    updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData>;
    resetPasword({email, toUpdatePassword}:ResetPasswordRequest): Promise<UserData>;
    deleteUserProfile(userId: string): Promise<void>;
}

export interface UpdateUserRequest{
    userId: string;
    toUpdateUser: UserData;
}

export interface ResetPasswordRequest{
    email: string;
    toUpdatePassword: string;
}