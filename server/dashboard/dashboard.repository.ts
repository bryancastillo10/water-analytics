import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import {
    IDashboardRepository,
    GetTimeSeriesDataRequest,
    GetSiteCountByUserResponse,
    NutrientAvgBySiteResponse
} from "@/dashboard/core/interface/IDashboardRepository";
import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";
import { DatabaseError, NotFoundError } from "@/infrastructure/errors/customErrors";

export class DashboardRepository implements IDashboardRepository {
    private prisma = new PrismaClient();
    async timeSeries({ siteId, parameter }: GetTimeSeriesDataRequest): Promise<TimeSeriesData[]> {
        try {
            const rawTimeSeries = await this.prisma.measurement.findMany({
                where: { siteId },
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
                throw new DatabaseError("Database error at the timeSeries method");
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
                throw new DatabaseError("Database error at the timeSeries method");
            } 
            throw Error;
        }
    }

    async nutrientPercentageBySite(siteId: string): Promise<NutrientAvgBySiteResponse> {
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
                throw new DatabaseError("Database error at the timeSeries method");
            } 
            throw Error;
        }
    }
}