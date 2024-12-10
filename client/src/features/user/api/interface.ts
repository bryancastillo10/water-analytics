// Update and Delete User Profile Feature
export interface UserProfile {
    username: string;
    email: string;
}

export interface UpdateUserRequest extends UserProfile{
    id: string;
}

export interface UpdateUserResponse extends UserProfile{
    message: string;
}

export interface DeleteUserRequest{
    id: string;   
    username: string;
}

// Password Reset Feature
export interface ResetPwRequest{
    email: string;
}

export interface ResetPwResponse{
    message: string;
}

export interface VerifyCodeRequest extends ResetPwRequest{
    code: string;
}

export interface VerifyCodeResponse{
    isVerified: boolean;
}

export interface UpdatePasswordRequest extends ResetPwRequest{
    newPassword: string;
    confirmNewPassword: string;
}
