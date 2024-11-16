import bcrypt from "bcryptjs";

import { SignUpData, SignInData } from "@/auth/core/entity/auth";
import { AuthRepository } from "@/auth/auth.repository";


export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {
        
    }
    
    async signIn(signInData: SignInData) {
        const { email, password } = signInData;

        return;
    }

    async signUp(signUpData: SignUpData) {
        const {  username, email, password, confirmPassword } = signUpData;
    
        // Missing Fields Validation
        if (!username || !email || !password || !confirmPassword) {
            throw new Error("All fields are required");
        }

        // Username validation
        const usernameRegex = /^[a-zA-Z0-9 ]{5,}$/;
        if (!usernameRegex.test(username)) {
            throw new Error("Username must be greater than 5 alphanumeric characters.")
        }

        // Email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email address")
        }

        // Password and confirmPassword Comparison
        if (password !== confirmPassword) {
            throw new Error("Password doesn't match")
        }

        // Existing User Validation
        const existingUser = await this.authRepository.findByEmail(email);
        if (existingUser) {
            throw new Error("Email already used, please try another");
        }

                // Password Hashing
        const hashedpPassword = await bcrypt.hash(password, 10);
        await this.authRepository.signUp({
            ...signUpData,
            password: hashedpPassword,
            profilePicURL: "",
        })

    }

    async signOut() {
        return;
    }
}

