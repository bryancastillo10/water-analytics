import { ThresholdData } from '@/threshold/core/entity/threshold';

export interface IThresholdRepository {
  getThreshold(userId: string): Promise<ThresholdData[]>;
  updateThreshold(updateData: UpdateThresholdRequest[]): Promise<ThresholdData[]>;
}

export type ThresholdDataInput = Omit<ThresholdData, 'id' | 'userId'>;

export interface UpdateThresholdRequest {
  thresholdId: string;
  value?: number | null;
  maxValue?: number | null;
  minValue?: number | null;
  parameter?: string;
}
[];
