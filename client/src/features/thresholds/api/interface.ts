export interface IThresholdData {
  id: string;
  parameter: string;
  unit: string;
  value: string;
  minValue?: string;
  maxValue?: string;
}

export type UpdateThresholdRequest =
  | {
      thresholdId: string;
      parameter: 'pH';
      minValue: number;
      maxValue: number;
      value?: undefined;
    }
  | {
      thresholdId: string;
      parameter: Exclude<string, 'pH'>;
      value: number;
      minValue?: undefined;
      maxValue?: undefined;
    };

export interface UpdateThresholdResponse {
  message: string;
  updated: IThresholdData[];
}
