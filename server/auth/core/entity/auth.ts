enum UserRole {
  ADMIN = "ADMIN",
  GUEST = "GUEST"
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
  role: UserRole = UserRole.GUEST;
}