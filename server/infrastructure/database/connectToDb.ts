import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const connectToDb = async (): Promise<void> => {
  try {
    await prisma.$connect();
    const dbName = process.env.DB_NAME;
    console.log(`${dbName} is connected successfully`);
  } catch (error) {
    console.error('Failed to connect to the database \n', error);
    process.exit(1);
  }
};
