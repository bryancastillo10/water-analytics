import { DashboardRepository } from "@/dashboard/dashboard.repository";
import { GetTimeSeriesDataRequest } from "@/dashboard/core/interface/IDashboardRepository";
import { NotFoundError, ValidationError } from "@/infrastructure/errors/customErrors";

export class DashboardService {
    constructor(private readonly dashboardRepository: DashboardRepository) { }

    async timeSeries({ siteId, parameter}: GetTimeSeriesDataRequest) { 
        if (!parameter) {
            throw new NotFoundError("Parameter is not found");
        }
        
        const validParameters = [
            "pH", "suspendedSolids", "totalCOD", "fecalColiform",
            "temperature", "dissolvedOxygen", "ammonia", "nitrates", "phosphates"
        ];

        if (!validParameters.includes(parameter)) {
            throw new ValidationError("Invalid parameter was requested");
        }
        const timeSeriesData = await this.dashboardRepository.timeSeries({ siteId, parameter });

        return timeSeriesData;
    }
};