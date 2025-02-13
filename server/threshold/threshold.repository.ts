import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError, ValidationError } from "@/infrastructure/errors/customErrors";
import { IThresholdRepository, UpdateThresholdRequest } from "@/threshold/core/interface/IThresholdRepository";
import { ThresholdData } from "@/threshold/core/entity/threshold";


export class ThresholdRepository implements IThresholdRepository {
    private prisma = new PrismaClient();

    async findThresholdByUser(thresholdId: string): Promise<string>{
        try {
            const threshold = await this.prisma.threshold.findUnique({
                where: { id: thresholdId },
                select: {userId: true}
            })
            if (!threshold) {
                throw new ValidationError("Threshold not found");
            }
    
            return threshold.userId;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at findThresholdByUser method");
              }
             throw Error;
        }
    };

    async verifyUserRole(userId: string): Promise<boolean> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                throw new ValidationError("User not found");
            }
    
            const isUserVerified = user?.role === "ADMIN" || user?.role === "ANALYST";
            return isUserVerified;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at verifyUserRole method");
              }
             throw Error;
           }
        }


    async getThreshold(userId: string): Promise<ThresholdData[]> {
        try {
            const userThreshold = await this.prisma.threshold.findMany({
                where: { userId }
            });

            return userThreshold as ThresholdData[];
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message); 
                throw new DatabaseError("Database error at createThreshold method");
              }
             throw Error;
        }
    }
    async updateThreshold(updates: UpdateThresholdRequest[]): Promise<ThresholdData[]> {
        try {
            const updatedThreshold = await this.prisma.$transaction(async (prisma) => {
                const updateRes = await Promise.all(
                    updates.map((update) =>
                        prisma.threshold.update({
                            where: { id: update.thresholdId },
                            data: { value: update.value }
                        })
                    )
                );
                return updateRes as ThresholdData[];
            });
            
            return updatedThreshold;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createThreshold method");
            }
            throw Error;
        }
    }
    
}