// Update and Delete User Profile Feature
export interface UserProfile {
    username: string;
    email: string;
    role?: string;
}

export interface UpdateUserRequest extends Partial<UserProfile>{
    id: string;
}

export interface UpdateUserResponse extends UserProfile{
    message: string;
}

export interface DeleteUserRequest{
    id: string;   
    username: string;
}
export interface UpdateProfilePicResponse {
    message: string;
    profilePic: string;
}

export interface UpdateProfilePicRequest {
    userId: string;
    file: File;
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

export interface IUsersData {
    id: string;
    username: string;
    email: string;
    profilePic: string;
    role: string;
}