import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
    IDashboardRepository,
    GetTimeSeriesDataRequest,
    GetSiteCountByUserResponse,
    NutrientAvgBySiteResponse,
    ISiteDataResponse,
    IParameterAvg,
    IParameters,
} from "@/dashboard/core/interface/IDashboardRepository";
import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";
import { DatabaseError, NotFoundError } from "@/infrastructure/errors/customErrors";

import { parameterRecord } from "@/dashboard/utils/parameterRecord";
import { extractAggData, getAggField, validateCalcData, validateStatType } from "@/dashboard/utils/statTypes";

export class DashboardRepository implements IDashboardRepository {
    private prisma = new PrismaClient();

    async getParameterFilters(userId:string): Promise<string[]> {
        try {
            const parameters = await this.prisma.threshold.findMany({
                where: {userId},
                select: {
                    parameter: true
                }
            });

            const paramtersList = parameters.map((param) => 
                parameterRecord[param.parameter] || param.parameter
            );

            return paramtersList;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getParameterFilters method");
            } 
            throw Error;
        }
    }

    async getDateFilters( siteId:string): Promise<string[]> {
        try {
            const dates = await this.prisma.measurement.findMany({
                where: { siteId },
                select: {
                    date: true
                }
            });

            const formatDates = dates.map(d => d.date.toISOString());

            return formatDates;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getDateFilters method");
            } 
            throw Error;
        }
    }

    async timeSeries({ siteId, parameter, startDate, endDate }: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]> {
        try {
            const whereCondition: any = { siteId };

            if (startDate && endDate) {
                whereCondition.date = {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                };
            }
            whereCondition[parameter] = { not: null };
            
            const rawTimeSeries = await this.prisma.measurement.findMany({
                where:  whereCondition,
                select: {
                    date: true,
                    [parameter]: true
                },
                orderBy: { date: 'asc' }
            });

            const formattedData = rawTimeSeries
            .filter(measurement => measurement[parameter] !== null)
            .map(measurement => new TimeSeriesData(measurement.date, measurement[parameter]));

            return formattedData;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the timeSeries method");
            } 
            throw Error;
        }
    }  

    async getSiteCountByUser(userId: string): Promise<GetSiteCountByUserResponse[]> {
        try {
            const groupedSite = await this.prisma.site.groupBy({
                by: ['sourceType'],
                where: { userId },
                _count: {
                    id: true
                }
            });

            return groupedSite;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getSiteByCountUser method");
            } 
            throw Error;
        }
    }
    
    async getTotalSitesByUser(userId: string): Promise<number> {
        try {
            const totalCount = await this.prisma.site.count({
                where: { userId }
            });

            return totalCount;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getTotalSitesByUser method");
            } 
            throw Error;
        }
    }

    async nutrientStatsBySite(siteId: string): Promise<NutrientAvgBySiteResponse> {
        try {
            const site = await this.prisma.site.findUnique({
                where: { id: siteId },
                select: { siteName: true }
            });

            if (!site) {
                throw new NotFoundError("Site Name was not found");
            }

            const nutrientAvg = await this.prisma.measurement.aggregate({
                where: { siteId },
                _avg: {
                    ammonia: true,
                    nitrates: true,
                    phosphates: true
                }
            });

            if (!nutrientAvg._avg.ammonia && !nutrientAvg._avg.nitrates && !nutrientAvg._avg.phosphates) {
                throw new Error("No data found for the given site ID");
            }

            const nutrientData = {
                siteName: site.siteName,
                average: {
                    ammonia: nutrientAvg._avg.ammonia ?? 0,
                    nitrates: nutrientAvg._avg.nitrates ?? 0,
                    phosphates: nutrientAvg._avg.phosphates ?? 0
                }
            }

            return nutrientData;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the nutrientPercentageBySite method");
            } 
            throw Error;
        }
    }

  async getStatPerSite(siteId: string, statType: string): Promise<ISiteDataResponse> {
    try {
        const site = await this.prisma.site.findUnique({
            where: { id: siteId },
            select: { siteName: true }
        });

        if (!site) {
            throw new NotFoundError("Site Name not found");
        }
        
        const selectedStatType = validateStatType(statType);
        const aggField = getAggField(selectedStatType);
     
        const calcData = await this.prisma.measurement.aggregate({
            where: { siteId },
            ...aggField
        });
        
        const queryData = extractAggData(calcData, aggField);
        
        const finalizedData = validateCalcData(queryData);

        return {
            siteName: site.siteName,
            result: {
                [selectedStatType]: finalizedData
            }
        };
        
        
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            console.error(error.message);
            throw new DatabaseError("Database error at the getStatPerSite method");
        }
        throw error;
    }
}


    async getParameterAvg({ siteId, parameter }: GetTimeSeriesDataRequest): Promise<IParameterAvg> {
        try {
            const siteData = await this.prisma.measurement.aggregate({
                where: { siteId },
                _avg: {
                    [parameter]: true
                }
            });

            const { _avg } = siteData;

            return _avg;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getDataPerSite method");
            } 
            throw Error;
        }
    }

    async getThresholdValue(parameter: string) {
        try {
            const thresholdValue = await this.prisma.threshold.findFirst({
                where: { parameter },
                select: {
                    value: true
                }
            });

            return thresholdValue;
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                console.error(error.message);
                throw new DatabaseError("Database error at the getDataPerSite method");
            } 
            throw Error;
        }
    }
}