import {
  DeleteUserRequest,
  FileInput,
  ResetPasswordRequest,
  UpdateUserPasswordProps,
  UpdateUserRequest,
} from '@/user/core/interface/IUserRepository';
import { UserRepository } from '@/user/user.repository';

import {
  NotFoundError,
  ValidationError,
  AuthenticationError,
} from '@/infrastructure/errors/customErrors';
import { generateAndSendVerificationCode } from '@/utils/nodemailer';
import { toHashPassword } from '@/utils/bcrypt';
import { uploadImage, getPublicId, deleteImage } from '@/utils/cloudinary';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateUser({ userId, toUpdateUser }: UpdateUserRequest) {
    if (!userId) {
      throw new NotFoundError('User id is not found');
    }
    
    return await this.userRepository.updateUserProfile({ userId, toUpdateUser });
  }
    
  async getAllUser(userId: string) {
    if (!userId) {
      throw new NotFoundError('User id is not found');
    }

    const isUserVerified = await this.userRepository.verifyUserRole(userId);
    if (!isUserVerified) {
      throw new ValidationError(
        'The user is not auhorized to create a threshold. Admin privileges only',
      );
    }

    const allUsers = await this.userRepository.getAllUsers();

    return allUsers;
  }

  async deleteUser({ userId, username }: DeleteUserRequest) {
    if (!userId) {
      throw new NotFoundError('User id is not found');
    }

    // This query chgecks if the username exists in the database
    // At the same time retrieves the profile picture URL
    const userProfilePic = await this.userRepository.findUserByUsername(username);
    if (!userProfilePic) {
      throw new ValidationError('Username does not match any existing username');
    }

    const url = userProfilePic;
    const publicId = getPublicId(url);
    await deleteImage(`profile-picture/${publicId}`);

    await this.userRepository.deleteUserProfile(userId);

    return;
  }

  async requestResetPassword(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User with this email does not exist');
    }

    const { code, expiry } = await generateAndSendVerificationCode(email);

    await this.userRepository.saveResetCode({ email, code, expiry });

    return {
      message: 'Verification code sent to your email',
    };
  }

  async verifyCode({ email, code }: ResetPasswordRequest) {
    if (!email || !code) {
      throw new ValidationError('Email and verification code are required for this request');
    }

    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User associated with that email does not exist');
    }

    if (user.resetCode !== code) {
      throw new ValidationError('Invalid verification code');
    }

    const thisTime = new Date();
    if (!user.resetCode || thisTime > new Date(user?.resetCodeExpiry!)) {
      throw new AuthenticationError('Verification code had expired, try to request again');
    }

    return true;
  }

  async updatePassword({ email, newPassword, confirmNewPassword }: UpdateUserPasswordProps) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User associated with that email does not exist');
    }

    if (newPassword !== confirmNewPassword) {
      throw new ValidationError("Passwords doesn't match. Try to type it again");
    }

    const hashedPassword = await toHashPassword(newPassword);
    if (!hashedPassword) {
      throw new AuthenticationError('Hashing of new password failed');
    }

    await this.userRepository.updatePassword({ email, hashedPassword });

    return {
      message: 'Password has been updated successfully',
    };
  }

  async updateProfilePicture(userId: string, file: FileInput) {
    if (!file) {
      throw new NotFoundError('Image file not found');
    }

    const imageUrl = await uploadImage({
      filePath: file.path,
      folder: 'profile-picture',
      deleteLocalFile: true,
    });

    const updatedProfile = this.userRepository.updateProfilePicture({ userId, imageUrl });

    return updatedProfile;
  }
}
