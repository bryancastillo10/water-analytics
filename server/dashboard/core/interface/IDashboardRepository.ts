import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";

export interface IDashboardRepository {
    getParameterFilters(userId: string): Promise<string[]>;
    getDateFilters(siteId:string): Promise<string[]>;
    timeSeries({siteId,parameter}: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]>;
    getSiteCountByUser(userId: string): Promise<GetSiteCountByUserResponse[]>;
    getTotalSitesByUser(userId: string): Promise<number>;
    nutrientStatsBySite(siteId: string): Promise<NutrientAvgBySiteResponse>;
    getDataPerSite(siteId: string): Promise<ISiteDataResponse>;
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
    averages: IParameters;
}

interface IParameters {
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

export type NutrientKey = "ammonia" | "nitrates" | "phosphates"  