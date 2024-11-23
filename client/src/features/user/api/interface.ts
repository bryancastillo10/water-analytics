// Update and Delete User Profile Feature
export interface UserProfile {
    username: string;
    email: string;
}

export interface UpdateUserRequest extends UserProfile{
    id: string;
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
