enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  ANALYST="USER"
}

export class SignInData {
  email!: string;
  password!: string;
}

export class SignUpData {
  username!: string;
  email!: string;
  password!: string;
  confirmPassword?: string;
  profilePicURL?: string;
  role: UserRole = UserRole.USER;
}