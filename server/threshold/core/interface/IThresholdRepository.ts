import { ThresholdData } from "@/threshold/core/entity/threshold";

export interface IThresholdRepository{
    createThreshold(threshold: ThresholdData): Promise<ThresholdData>;
    verifyUser(userId: string): Promise<boolean>;
    getThreshold(userId: string): Promise<ThresholdData[]>;
    updateThreshold(thresholdId: string, threshold: Partial<ThresholdData>): Promise<ThresholdData | null>;
    deleteThreshold(thresholdId: string): Promise<void>;
};



