import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";

export interface IDashboardRepository {
    timeSeries({siteId,parameter}: GetTimeSeriesDataRequest): Promise<TimeSeriesData>;
}


export interface GetTimeSeriesDataRequest {
    siteId: string;
    parameter: string;
}