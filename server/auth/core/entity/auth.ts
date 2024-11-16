enum UserRole {
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}

export class SignInData {
    id!: string;
    email!: string;
    password!: string;
}

export class SignUpData{
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    confirmPassword!: string;
    profilePicURL!: string;
    role: UserRole = UserRole.GUEST;
}