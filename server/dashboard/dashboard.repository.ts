import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { IDashboardRepository, GetTimeSeriesDataRequest } from "@/dashboard/core/interface/IDashboardRepository";
import { TimeSeriesData } from "@/dashboard/core/entity/timeSeries";
import { DatabaseError } from "@/infrastructure/errors/customErrors";

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
}