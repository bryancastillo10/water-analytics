import { ThresholdData } from "@/threshold/core/entity/threshold";

export interface IThresholdRepository{
    createThreshold(threshold: CreateThresholdRequest): Promise<ThresholdData>;
    findUserByThreshold(thresholdId: string): Promise<string>;
    verifyUserRole(userId: string): Promise<boolean>;
    getThreshold(userId: string): Promise<ThresholdData[]>;
    updateThreshold(updates:UpdateThresholdRequest[]): Promise<ThresholdData[]>;
    deleteThreshold(thresholdId: string): Promise<void>;
};

export type ThresholdDataInput = Omit<ThresholdData, "id" | "userId">;

export interface CreateThresholdRequest{
        userId: string;
        threshold: ThresholdDataInput;
}

export interface UpdateThresholdRequest {
        thresholdId: string;
        value: number;
}[]