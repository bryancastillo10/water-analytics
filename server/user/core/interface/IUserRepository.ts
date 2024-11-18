import { UserData } from "@/user/core/entity/user";

export interface IUserRepository {
    updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData>;
    findUserbyEmail(email: string): Promise<UserData | null>;
    deleteUserProfile(userId: string): Promise<void>;
    saveResetCode({email,code,expiry}:SaveResetCodeProps): Promise<void>;
}

export interface UpdateUserRequest{
    userId: string;
    toUpdateUser: UserData;
}

export interface SaveResetCodeProps{
    email: string;
    code: string;
    expiry: Date;
}