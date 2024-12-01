import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError, ValidationError } from "@/infrastructure/errors/customErrors";
import { CreateThresholdRequest, IThresholdRepository, UpdateThresholdRequest } from "@/threshold/core/interface/IThresholdRepository";
import { ThresholdData } from "@/threshold/core/entity/threshold";


export class ThresholdRepository implements IThresholdRepository {
    private prisma = new PrismaClient();

    async findUserByThreshold(thresholdId: string): Promise<string>{
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
                throw new DatabaseError("Database error at getSiteByUser method");
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
                throw new DatabaseError("Database error at getSiteByUser method");
              }
             throw Error;
           }
        }

    async createThreshold({userId, threshold}: CreateThresholdRequest): Promise<ThresholdData> {
        try {
            const { parameter, value, unit = "NA" } = threshold;
            const newThreshold = await this.prisma.threshold.create({
                data: {
                    parameter,
                    userId,
                    value,
                    unit
                }
            });
    
            return {
                id: newThreshold.id,
                userId: newThreshold.userId,
                parameter: newThreshold.parameter,
                value: newThreshold.value || 0,
                unit: newThreshold.unit
            };
            }
            catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message); 
                throw new DatabaseError("Database error at createThreshold method");
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
    async updateThreshold({ thresholdId, value }: UpdateThresholdRequest): Promise<ThresholdData | null> {
        try {
            const updatedThreshold = await this.prisma.threshold.update({
                where: { id: thresholdId },
                data: {value: value}
            })

            return updatedThreshold as ThresholdData;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at createThreshold method");
            }
            throw Error;
        }
    }
    async deleteThreshold(thresholdId: string): Promise<void> {
        try {
            await this.prisma.threshold.delete({
                where: { id: thresholdId }
            });
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