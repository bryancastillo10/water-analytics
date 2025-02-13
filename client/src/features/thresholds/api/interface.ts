export interface IThresholdData{
    id: string;
    parameter: string;
    unit: string;
    value: string;
    minValue?: string;
    maxValue?: string;
}

export interface UpdateThresholdRequest {
    thresholdId: string;
    value: number;
}[]

export interface UpdateThresholdResponse{
    message: string;
    updated: IThresholdData[];
}