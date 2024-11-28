import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { DatabaseError } from "@/infrastructure/errors/customErrors";
import { IThresholdRepository } from "./core/interface/IThresholdRepository";
import { ThresholdData } from "./core/entity/threshold";

export class ThresholdRepository implements IThresholdRepository {
    private prisma = new PrismaClient();
    createThreshold(threshold: ThresholdData): Promise<ThresholdData> {
        throw new Error("Method not implemented.");
    }
    verifyUser(userId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getThreshold(userId: string): Promise<ThresholdData[]> {
        throw new Error("Method not implemented.");
    }
    updateThreshold(thresholdId: string, threshold: Partial<ThresholdData>): Promise<ThresholdData | null> {
        throw new Error("Method not implemented.");
    }
    deleteThreshold(thresholdId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}