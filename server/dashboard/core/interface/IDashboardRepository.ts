import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";

export interface IDashboardRepository {
    // Filters
    getParameterFilters(userId: string): Promise<string[]>;
    getDateFilters(siteId: string): Promise<string[]>;
    
    // For Line Chart
    timeSeries({ siteId, parameter }: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]>;
    
    // For Pie Chart
    getSiteCountByUser(userId: string): Promise<GetSiteCountByUserResponse[]>;
    getTotalSitesByUser(userId: string): Promise<number>;
    
    // For Bar and Gauge Chart
    nutrientStatsBySite(siteId: string): Promise<NutrientAvgBySiteResponse>;
    getParameterProfile(siteId: string, parameters: string[]): Promise<IParameterProfile>;
    
    // For Radar Chart
    getStatPerSite(siteId: string, statType: string): Promise<ISiteDataResponse>;
    getParameterAvg({ siteId, parameter }: GetTimeSeriesDataRequest): Promise<IParameterAvg>;
}


export interface GetTimeSeriesDataRequest {
    siteId: string;
    parameter: string;
    startDate?: string;
    endDate?: string;
}

export interface GetSiteCountByUserResponse {
    sourceType: string;
    _count: {
        id: number
    }
}

export interface NutrientAvgBySiteResponse {
    siteName: string; 
    average: {
        ammonia: number;
        nitrates: number;
        phosphates: number;
    }
}

export interface ISiteDataResponse {
    siteName: string;
    result: {
        [statType: string]: IParameters;
    }
}

export interface IParameters {
    pH: number;
    temperature: number;
    dissolvedOxygen: number;
    totalCOD: number;
    suspendedSolids: number;
    fecalColiform: number;
    ammonia: number;
    nitrates: number;
    phosphates: number;
}

export interface IParameterAvg {
    [parameter: string]: number;
}

export interface IParameterProfile {
    siteName: string;
    average: Record<string, number>;
}

export interface IAggregationFields {
    [aggregation: string]: "_avg" | "_max" | "_min" | "_count";
}

export type NutrientKey = "ammonia" | "nitrates" | "phosphates"  

export interface IParameterGroups  {
    basic: ["pH", "temperature", "dissolvedOxygen"],
    organic: ["totalCOD", "suspendedSolids", "fecalColiform"],
    nutrients: ["ammonia", "nitrates", "phosphates"]
}