import { SignUpData, SignInData } from '@/auth/core/entity/auth';
import { AuthenticationError, ValidationError } from '@/infrastructure/errors/customErrors';
import { IAuthResponse } from '@/auth/core/interface/IAuthRepository';
import { AuthRepository } from '@/auth/auth.repository';

import { toHashPassword, validatePassword } from '@/utils/bcrypt';
import { verifyToken } from '@/utils/verifyToken';
import { seedUserData } from '@/seed/seed';

export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async signIn(signInData: SignInData) {
    const { email, password } = signInData;
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new AuthenticationError('Cannot find an account with that email. Try again.');
    }

    const isPasswordMatched = await validatePassword(password, user.password as string);

    if (!isPasswordMatched) {
      throw new AuthenticationError('Invalid password. Please try again.');
    }

    return user;
  }

  async signUp(signUpData: SignUpData): Promise<IAuthResponse> {
    const { username, email, password, confirmPassword } = signUpData;

    // Missing Fields Validation
    if (!username || !email || !password || !confirmPassword) {
      throw new ValidationError('All fields are required');
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z0-9 ]{5,}$/;
    if (!usernameRegex.test(username)) {
      throw new ValidationError('Username must be greater than 5 alphanumeric characters.');
    }

    // Email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError('Invalid email address');
    }

    // Password and confirmPassword Comparison
    if (password !== confirmPassword) {
      throw new ValidationError("Password doesn't match");
    }

    // Existing User Validation
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new ValidationError('Email already used, please try another');
    }

    // Password Hashing
    const hashedPassword = await toHashPassword(password);
    const newUser = await this.authRepository.createUser({
      ...signUpData,
      password: hashedPassword,
      profilePicURL: '',
      role: 'PUBLIC',
    });

    // Seed Data
    await seedUserData(newUser.id);

    return newUser;
  }

  async validateUserToken(token: string) {
    try {
      const decoded = verifyToken(token);
      const user = await this.authRepository.findByUserId(decoded.userId);
      if (user) {
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePic: user.profilePic,
          role: user.role,
        };
      }
      return null;
    } catch (error) {
      throw new AuthenticationError('Invalid or expired token');
    }
  }
}
