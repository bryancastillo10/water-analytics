import { ThresholdData } from "@/threshold/core/entity/threshold";

export interface IThresholdRepository{
    createThreshold(threshold: CreateThresholdRequest): Promise<ThresholdData>;
    verifyUserRole(userId: string): Promise<boolean>;
    getThreshold(userId: string): Promise<ThresholdData[]>;
    updateThreshold(thresholdId: string, threshold: Partial<ThresholdData>): Promise<ThresholdData | null>;
    deleteThreshold(thresholdId: string): Promise<void>;
};

export type ThresholdDataInput = Omit<ThresholdData, "id" | "userId">;

export interface CreateThresholdRequest{
        userId: string;
        threshold: ThresholdDataInput;
}
