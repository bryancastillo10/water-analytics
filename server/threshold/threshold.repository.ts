import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { CreateThresholdRequest, IThresholdRepository } from "@/threshold/core/interface/IThresholdRepository";
import { ThresholdData } from "@/threshold/core/entity/threshold";

export class ThresholdRepository implements IThresholdRepository {
    private prisma = new PrismaClient();

    async verifyUserRole(userId: string): Promise<boolean> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId }
            });

            const isUserVerified = user?.role === "ADMIN" || user?.role === "ANALYST";
            return isUserVerified
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
            const { parameter, minValue, maxValue, unit = "NA" } = threshold;
            const newThreshold = await this.prisma.threshold.create({
                data: {
                    parameter,
                    userId,
                    minValue,
                    maxValue,
                    unit
                }
            });
    
            return {
                id: newThreshold.id,
                userId: newThreshold.userId,
                parameter: newThreshold.parameter,
                minValue: newThreshold.minValue!,
                maxValue: newThreshold.maxValue!,
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
    async updateThreshold(thresholdId: string, threshold: Partial<ThresholdData>): Promise<ThresholdData | null> {
        throw new Error("Method not implemented.");
    }

    async deleteThreshold(thresholdId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}