import { ThresholdData } from "@/threshold/core/entity/threshold";

export interface IThresholdRepository{
    findThresholdByUser(thresholdId: string): Promise<string>;
    verifyUserRole(userId: string): Promise<boolean>;
    getThreshold(userId: string): Promise<ThresholdData[]>;
    updateThreshold(updates:UpdateThresholdRequest[]): Promise<ThresholdData[]>;
};

export type ThresholdDataInput = Omit<ThresholdData, "id" | "userId">;

export interface UpdateThresholdRequest {
        thresholdId: string;
        value?: number;
        maxValue?: number;
        minValue?: number;
}[]