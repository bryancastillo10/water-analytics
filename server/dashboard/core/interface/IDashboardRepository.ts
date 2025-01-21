import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";

export interface IDashboardRepository {
    timeSeries({siteId,parameter}: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]>;
    getSiteCountByUser(userId: string): Promise<GetSiteCountByUserResponse[]>
    getTotalSitesByUser(userId: string): Promise<number>
    nutrientPercentageBySite(siteId:string): Promise<NutrientAvgBySiteResponse>
}


export interface GetTimeSeriesDataRequest {
    siteId: string;
    parameter: string;
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