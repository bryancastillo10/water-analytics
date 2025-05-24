import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseError } from '@/infrastructure/errors/customErrors';

import { IAuthRepository, IAuthResponse } from '@/auth/core/interface/IAuthRepository';
import { SignUpData } from '@/auth/core/entity/auth';

const defaultProfilePic =
  'https://res.cloudinary.com/dzruafjwq/image/upload/v1732108249/default_sv3tzy.png';

export class AuthRepository implements IAuthRepository {
  private prisma = new PrismaClient();

  async createUser(signUpData: SignUpData): Promise<IAuthResponse> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: signUpData.username,
          email: signUpData.email,
          password: signUpData.password,
          profilePic: signUpData.profilePicURL || defaultProfilePic,
          role: signUpData.role,
        },
      });

      return {
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        profilePic: newUser.profilePic!,
        role: newUser.role,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at createUser method');
      }
      throw Error;
    }
  }

  async findByEmail(email: string): Promise<IAuthResponse | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          username: true,
          password: true,
          email: true,
          profilePic: true,
          role: true,
        },
      });

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        profilePic: user.profilePic!,
        role: user.role,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at findByEmail method');
      }
      throw Error;
    }
  }

  async findByUserId(userId: string): Promise<IAuthResponse | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
          password: true,
          email: true,
          profilePic: true,
          role: true,
        },
      });

      return user ?? null;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error findByUserId method');
      }
      throw Error;
    }
  }
}
