export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ANALYST = 'ANALYST',
}

export interface User {
  id: string;
  username: string;
  email: string;
  profilePicURL: string;
  role: UserRole;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignInResponse {
  message: string;
  user: User;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpResponse {
  message: string;
  user: User;
}
