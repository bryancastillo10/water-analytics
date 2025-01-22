import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { DashboardService } from "@/dashboard/core/service/dashboardService";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
        this.timeSeries = this.timeSeries.bind(this);
        this.sitePercentage = this.sitePercentage.bind(this);
        this.nutrientPercentages = this.nutrientPercentages.bind(this);
        this.getDataPerSite = this.getDataPerSite.bind(this);
    };

    async timeSeries(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;
            const { parameter } = req.body;

            const timeSeriesData = await this.dashboardService.timeSeries({ siteId, parameter });

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

    async nutrientPercentages(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;

            const nutrientAvg = await this.dashboardService.nutrientPercentages(siteId);

            res.status(200).json(nutrientAvg);
        }
        catch (error) {
            next(error);
        }
    };

    async getDataPerSite(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;

            const siteData = await this.dashboardService.getDataPerSite(siteId);

            res.status(200).json(siteData);
        }  
        catch (error) {
            next(error);
        }
    };
}