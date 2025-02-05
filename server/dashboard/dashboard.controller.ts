import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { DashboardService } from "@/dashboard/core/service/dashboardService";
import { ValidationError } from "@/infrastructure/errors/customErrors";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
        // Dashboard Filters
        this.getParameterFilters = this.getParameterFilters.bind(this);
        this.getDateFilters = this.getDateFilters.bind(this);

        // Dashboard KPI Card 
        this.getParameterStatus = this.getParameterStatus.bind(this);
        
        // Line Chart 
        this.timeSeries = this.timeSeries.bind(this);
        
        // Pie Chart 
        this.sitePercentage = this.sitePercentage.bind(this);
        
        // Radar Chart
        this.getStatDataPerSite = this.getStatDataPerSite.bind(this);

        // Bar & Gauge Chart
        this.getParamStats = this.getParamStats.bind(this);
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

  
    async getParamStats(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;
            const parameter = req.query.paramgroup as string || "nutrients";
            
            const avgAndStatusData = await this.dashboardService.getParameterStatistics(siteId, parameter);

            res.status(200).json(avgAndStatusData);
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