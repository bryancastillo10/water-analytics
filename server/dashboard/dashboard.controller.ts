import { Request, Response, NextFunction } from "express";
import { DashboardService } from "@/dashboard/core/service/dashboardService";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
        this.timeSeries = this.timeSeries.bind(this);
    }

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
}