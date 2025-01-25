import type { WaterSourceType } from "@/features/sites/api/interface";
export interface ITimeSeries {
    date: Date;
    value: number | null;
}

export interface ITimeSeriesRequest {
    id: string;
    parameter: string;
}

export interface ISitePercentage {
    totalSites: number;
    percentages: PercentageInfo;
}

type PercentageInfo = {
    sourceType: WaterSourceType;
    percentage: string;
}