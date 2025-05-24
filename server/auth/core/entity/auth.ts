import { UserRole } from '@prisma/client';

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
  role: UserRole = UserRole.PUBLIC;
}
