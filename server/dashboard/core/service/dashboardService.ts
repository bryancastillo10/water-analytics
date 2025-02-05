import { DashboardRepository } from "@/dashboard/dashboard.repository";
import { GetTimeSeriesDataRequest } from "@/dashboard/core/interface/IDashboardRepository";
import { NotFoundError, ValidationError } from "@/infrastructure/errors/customErrors";
import { parameterRecord, parameterCardDisplayNames } from "@/dashboard/utils/parameterRecord";

import type { IParameterGroups } from "@/dashboard/core/interface/IDashboardRepository";

export class DashboardService {
    constructor(private readonly dashboardRepository: DashboardRepository) { }

    async parameterFilters(userId: string) {
        if (!userId) {
            throw new NotFoundError("User ID");
        }

        const parameterList = await this.dashboardRepository.getParameterFilters(userId);

        return parameterList;
    };

    async dateFilters(userId: string, siteId:string) {
        if (!userId) {
            throw new NotFoundError("User ID");
        }

        const dateFilters = await this.dashboardRepository.getDateFilters(siteId);

        return dateFilters;
    };
    
    async timeSeries({ siteId, parameter, startDate, endDate }: GetTimeSeriesDataRequest) { 
        if (!parameter) {
            throw new NotFoundError("Parameter");
        }
        
        const validParameters = [
            "pH", "suspendedSolids", "totalCOD", "fecalColiform",
            "temperature", "dissolvedOxygen", "ammonia", "nitrates", "phosphates"
        ];

        if (!validParameters.includes(parameter)) {
            throw new ValidationError("Invalid parameter was requested");
        }
        const timeSeriesData = await this.dashboardRepository.timeSeries({ siteId, parameter, startDate, endDate });

        return timeSeriesData;
    };

    async sitePercentage(userId: string) {
        if (!userId) {
            throw new NotFoundError("User ID");
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


    async getParameterStatistics(siteId: string, paramGroup: string){
        if (!siteId) {
            throw new NotFoundError("Site ID is required");
        }

        const parameterGroups: IParameterGroups = {
            basic: ["pH", "temperature", "dissolvedOxygen"],
            organic: ["totalCOD", "suspendedSolids", "fecalColiform"],
            nutrients: ["ammonia", "nitrates", "phosphates"]
        };

        const parameters = parameterGroups[paramGroup as keyof IParameterGroups];
        if (!parameters) {
            throw new ValidationError(`Invalid parameter group: ${paramGroup}`);
        }

        const parameterData = await this.dashboardRepository.getParameterProfile(siteId, parameters);

        const avgAndStatusData = await Promise.all(
            parameters.map(async (parameter) => {
                const parameterName = parameterRecord[parameter] || parameter;
                const thresholdData = await this.dashboardRepository.getThresholdValue(parameterName);

                if (!thresholdData) {
                    throw new ValidationError(`Threshold data for ${parameter} not found`);
                }

                const thresholdValue = thresholdData.value ?? 0;
                const avgValue = parameterData.average[parameter] ?? 0;


                const status = avgValue > thresholdValue ? "Above Threshold" : "Pass";

                return {
                    parameter,
                    avgValue,
                    thresholdValue,
                    status
                };
            })
        );

        return avgAndStatusData;
    }



    async getStatPerSite(siteId:string, statType:string) { 
        if (!siteId) {
            throw new NotFoundError("Site ID");
        }
        
        const siteData = await this.dashboardRepository.getStatPerSite(siteId, statType);

        if (!siteData) {
            throw new ValidationError("Error calculating the descriptive statistics of the site");
        }

        return siteData;
    };

    async getParameterStatus(siteId :string) {
        const parameters = ["pH", "suspendedSolids", "totalCOD", "fecalColiform"];
        
        const kpiData = await Promise.all(
            parameters.map(async (parameter) => {
                const paramAvg = await this.dashboardRepository.getParameterAvg({ siteId, parameter });
                
                if (!paramAvg || paramAvg[parameter] === null) {
                    return { parameter, status: "No Data Available" };
                }

                const parameterName = parameterRecord[parameter] || parameter;
                const unit = parameterCardDisplayNames[parameter]?.unit || "";

                const thresholdData = await this.dashboardRepository.getThresholdValue(parameterName);
                
                if (!thresholdData) {
                    throw new NotFoundError("Threshold for the parameter");
                }

                let status: string;
                const averageValue = paramAvg[parameter];
                const thresholdValue = thresholdData.value || 0;
                const displayName = parameterCardDisplayNames[parameter]?.displayName || parameter;
                
                if (parameter === "pH") {
                    switch (true) {
                        case averageValue < 6.6:
                            status = "Acidic";
                            break;
                        case averageValue > 7.5:
                            status =  "Alkaline";
                        default:
                            status = "Neutral";
                            break;
                    };
                } else {
                    status = averageValue > thresholdValue ? "Above Threshold" : "Pass";
                }

                return {
                    siteName: paramAvg.siteName,
                    parameter: displayName,
                    averageValue,
                    thresholdValue,
                    unit,
                    status
                }
            })
        )
        return kpiData;

    }
};