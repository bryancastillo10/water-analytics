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
    };

    async sitePercentage(userId: string) {
        if (!userId) {
            throw new NotFoundError("User ID was not found");
        }
        const totalSites = await this.dashboardRepository.getTotalSitesByUser(userId);

        if (totalSites === 0) {
            return { message: "No sites was found", percentage: [] };
        };

        const siteCounts = await this.dashboardRepository.getSiteCountByUser(userId);

        const percentages = siteCounts.map((site) => ({
            sourceType: site.sourceType,
            percentage: ((site._count.id) / totalSites * 100).toFixed(2)
        }));

        return { totalSites, percentages}
    };

    async nutrientPercentages(siteId: string) {
        if (!siteId) {
            throw new NotFoundError("Site ID was not found");
        }

        const nutrientAvg = await this.dashboardRepository.nutrientPercentageBySite(siteId);

        return nutrientAvg;
    };

    async getDataPerSite(siteId:string) { 
        if (!siteId) {
            throw new NotFoundError("Site ID was not found");
        }

        const siteData = await this.dashboardRepository.getDataPerSite(siteId);

        if (!siteData) {
            throw new ValidationError("Error calculating the parameter averages of the site");
        }

        return siteData;
    };

    async getParameterStatus({siteId, parameter}: GetTimeSeriesDataRequest) {
        if (!parameter) {
            throw new NotFoundError("Parameter is not found");
        }

        const paramAvg = await this.dashboardRepository.getParameterAvg({ siteId, parameter });

        const parameterRecord: Record<string, string> = {
            suspendedSolids: "Total Suspended Solids",
            totalCOD: "Total COD",
            fecalColiform: "Fecal Coliform"
        };

        const parameterName = parameterRecord[parameter] || parameter;

        const thresholdValue = await this.dashboardRepository.getThresholdValue(parameterName);

        


        return thresholdValue;

    }
};