import { SignUpData } from '@/auth/core/entity/auth';

export interface IAuthRepository {
  createUser(signUpData: SignUpData): Promise<IAuthResponse>;
  findByEmail(email: string): Promise<IAuthResponse | null>;
  findByUserId(userId: string): Promise<IAuthResponse | null>;
}

export interface IAuthResponse {
  id: string;
  username: string;
  password: string;
  email: string;
  profilePic: string | null;
  role: string;
}
