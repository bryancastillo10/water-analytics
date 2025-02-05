import type { WaterSourceType } from "@/features/sites/api/interface";
export interface ITimeSeries {
    date: Date;
    value: number | null;
}

// Time Series Line Chart
export interface ITimeSeriesRequest {
    id: string;
    parameter: string;
    startDate?: string;
    endDate?: string;
}

// UPI Card
export interface IDashboardCardResponse {
    parameter: string;
    averageValue: number;
    thresholdValue: number;
    unit: string;
    status: string;
}

// Site Percentage Pie Chart
export interface ISitePercentage {
    totalSites: number;
    percentages: PercentageInfo[];
}


type PercentageInfo = {
    sourceType: WaterSourceType;
    percentage: string;
}

// Nutrient Statistics Bar Chart & Gauge Chart
export interface INutrientStatsResponse {
    siteName: string;
    nutrientStatus: NutrientStatResult<string, number>[]
};

export type NutrientStatResult<T, U> = {
    nutrient: T;
    avgValue: U;
    thresholdValue: U;
    status: T;
}

export interface IParamStatisticsResponse {
    parameter: string;
    thresholdValue: number;
    status: string;
}

export interface IParamStatisticsRequest {
    siteId: string;
    paramgroup: "basic" | "organic" | "nutrients"
}


// Site Statistics Representation Radar Chart
type StatType = "average" | "maximum" | "minimum";
type ParamsType = "pH" | "temperature" | "dissolvedOxygen" |
    "totalCOD" | "suspendedSolids" | "fecalColiform" | 
    "ammonia" | "nitrates" | "phosphates"

export interface ISiteStatResponse<T> {
    siteName: string;
    result: Record<StatType, Record<ParamsType, T>>;
}

export interface ISiteStatRequest {
    siteId: string;
    statType: string;
}