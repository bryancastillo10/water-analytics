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

type NutrientStatResult<T, U> = {
    nutrient: T;
    avgValue: U;
    thresholdValue: U;
    status: T;
}

// Site Statistics Representation Radar Chart
export interface ISiteStatResponse {

}

export interface ISiteStatRequest {
    siteId: string;
    statType: string;
}