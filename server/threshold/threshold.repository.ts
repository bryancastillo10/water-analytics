import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError, ValidationError } from "@/infrastructure/errors/customErrors";
import { IThresholdRepository, UpdateThresholdRequest } from "@/threshold/core/interface/IThresholdRepository";
import { ThresholdData } from "@/threshold/core/entity/threshold";


export class ThresholdRepository implements IThresholdRepository {
    private prisma = new PrismaClient();

    async getThreshold(userId: string): Promise<ThresholdData[]> {
        try {
            const userThreshold = await this.prisma.threshold.findMany({
                where: { userId }
            });

            return userThreshold;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message); 
                throw new DatabaseError("Database error at createThreshold method");
              }
             throw error;
        }
    }
    async updateThreshold(updateData: UpdateThresholdRequest[]): Promise<ThresholdData[]> {
    try {
        const updatedThreshold = await this.prisma.$transaction(async (prisma) => {
        const updateRes = await Promise.all(
            updateData.map((update) => {
            const dataQuery = update.parameter === "pH"
                ? { minValue: update.minValue, maxValue: update.maxValue }
                : { value: update.value };

            return prisma.threshold.update({
                where: { id: update.thresholdId },
                data: dataQuery, 
            });
            })
        );
        return updateRes;
        });
        
        return updatedThreshold;
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError("Database error at updateThreshold method");
        }
        throw error;
    }
    }

    
}