import { IDashboardRepository, GetTimeSeriesDataRequest  } from "@/dashboard/core/interface/IDashboardRepository";
import { TimeSeriesData } from "./core/entity/timeSeries";

export class DashboardRepository implements IDashboardRepository {
    timeSeries({ siteId, parameter }: GetTimeSeriesDataRequest): Promise<TimeSeriesData> {
        throw new Error("Method not implemented.");
    }
   
}