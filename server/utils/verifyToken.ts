import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export const verifyToken = (token: string): DecodedToken => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in the environment variables');
  }

  return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
};
