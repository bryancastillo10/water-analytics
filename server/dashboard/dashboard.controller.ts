import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { DashboardService } from "@/dashboard/core/service/dashboardService";
import { ValidationError } from "@/infrastructure/errors/customErrors";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
        this.getParameterFilters = this.getParameterFilters.bind(this);
        this.getDateFilters = this.getDateFilters.bind(this); 
        this.timeSeries = this.timeSeries.bind(this);
        this.sitePercentage = this.sitePercentage.bind(this);
        this.nutrientStats = this.nutrientStats.bind(this);
        this.getStatDataPerSite = this.getStatDataPerSite.bind(this);
        this.getParameterStatus = this.getParameterStatus.bind(this);
    };

    async getParameterFilters(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req?.user?.id!;

            const parameterList = await this.dashboardService.parameterFilters(userId);

            res.status(200).json(parameterList);
        }
        catch (error) {
            next(error);
        }
    };

    async getDateFilters(req: CustomRequest, res: Response, next:NextFunction) {
        try {
            const userId = req?.user?.id!;
            const siteId = req.params.siteId;
            
            const dateFilters = await this.dashboardService.dateFilters(userId, siteId);

            res.status(200).json(dateFilters);
        }
        catch (error) {
            next(error)
        }
    };

    async timeSeries(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;
            const { startDate, endDate, parameter } = req.query;

            if (!parameter) {
                throw new ValidationError("Parameter is required");
            }

            const timeSeriesData = await this.dashboardService.timeSeries({
                siteId,
                parameter: parameter as string,
                startDate: startDate as string || undefined,
                endDate: endDate as string || undefined
            });

            res.status(200).json(timeSeriesData);
        }
        catch (error: any) {
            next(error);
        }
    };

    async sitePercentage(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req?.user?.id!;

            const percentageData = await this.dashboardService.sitePercentage(userId);

            res.status(200).json(percentageData);
        }
        catch (error) {
            next(error);
        }
    };

    async nutrientStats(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;

            const nutrientStats = await this.dashboardService.nutrientStats(siteId);

            res.status(200).json(nutrientStats);
        }
        catch (error) {
            next(error);
        }
    };

    async getStatDataPerSite(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;
            
            const statType = req.query.statType as string || "average";

            const siteData = await this.dashboardService.getStatPerSite(siteId, statType);

            res.status(200).json(siteData);
        }  
        catch (error) {
            next(error);
        }
    };

    async getParameterStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;

            const siteData = await this.dashboardService.getParameterStatus(siteId);

            res.status(200).json(siteData);
        }
        catch (error) {
            next(error);
        }
    }
}