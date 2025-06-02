import { UserData } from '@/user/core/entity/user';

export interface IUserRepository {
  updateUserProfile({ userId, toUpdateUser }: UpdateUserRequest): Promise<UserData>;
  findUserByEmail(email: string): Promise<UserData | null>;
  findUserByUsername(username: string): Promise<string | null>;
  deleteUserProfile(userId: string): Promise<void>;
  saveResetCode({ email, code, expiry }: SaveResetCodeProps): Promise<void>;
  updatePassword({ email, hashedPassword }: UpdatePasswordRepo): Promise<void>;
  updateProfilePicture({ userId, imageUrl }: UpdateProfilePicRequest): Promise<string>;
  getAllUsers(): Promise<UserData[]>;
  verifyUserRole(userId: string): Promise<boolean>;
}

export type FileInput = { path: string };

export interface UpdateUserRequest {
  userId: string;
  toUpdateUser: UserData;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
}

export interface SaveResetCodeProps extends ResetPasswordRequest {
  expiry: Date;
}

export interface UpdatePasswordRepo {
  email: string;
  hashedPassword: string;
}

export interface UpdateUserPasswordProps extends Omit<ResetPasswordRequest, 'code'> {
  newPassword: string;
  confirmNewPassword: string;
}

export interface DeleteUserRequest {
  userId: string;
  username: string;
}

export interface UpdateProfilePicRequest {
  userId: string;
  imageUrl: string;
}
