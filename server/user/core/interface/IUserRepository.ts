import { UserData } from "@/user/core/entity/user";

export interface IUserRepository {
    updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData>;
    findUserByEmail(email: string): Promise<UserData | null>;
    deleteUserProfile(userId: string): Promise<void>;
    saveResetCode({email,code,expiry}:SaveResetCodeProps): Promise<void>;
    
}

export interface UpdateUserRequest{
    userId: string;
    toUpdateUser: UserData;
}

export interface ResetPasswordRequest{
    email: string;
    code: string;
}


export interface SaveResetCodeProps extends ResetPasswordRequest{
    expiry: Date;
}

export interface UpdateUserPasswordProps extends Omit<ResetPasswordRequest, "email">{
    newPassword: string;
    confirmNewPassword: string;
}