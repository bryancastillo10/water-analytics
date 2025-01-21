import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";

export interface IDashboardRepository {
    timeSeries({siteId,parameter}: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]>;
    getSiteCountByUser(userId: string): Promise<GetSiteCountByUserResponse[]>
    getTotalSitesByUser(userId:string): Promise<number>
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