import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "@/infrastructure/middleware/type";
import { DashboardService } from "@/dashboard/core/service/dashboardService";

export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {
        this.timeSeries = this.timeSeries.bind(this);
    }

    async timeSeries(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const userId = req.user?.id
            const siteId = req.params.siteId;
            const parameter = req.body;

            res.status(200).json(parameter);
        }
        catch (error: any) {
            next(error);
        }
    };
}