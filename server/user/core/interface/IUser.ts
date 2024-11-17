import { UserData } from "@/user/core/entity/user";

export interface IUserRepository {
    updateUserProfile({ userId, toUpdateUser}:UpdateUserRequest): Promise<UserData>;
    deleteUser(userId: string): Promise<void>;
}

export interface UpdateUserRequest{
    userId: string;
    toUpdateUser: UserData;
}