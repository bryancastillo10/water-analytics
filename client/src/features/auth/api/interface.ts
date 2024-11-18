export interface AuthSignIn {
    email: string;
    password: string;
}

export interface AuthSignUp {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    profilePicURL: string;
    role: string | null;
}