import { Request, Response, NextFunction } from "express";
import { ThresholdService } from "@/threshold/core/service/thresholdService";


export class ThresholdController {
    constructor(private readonly thresholdService: ThresholdService) {
        this.createThreshold = this.createThreshold.bind(this);
        this.getThreshold = this.getThreshold.bind(this);
        this.updateThreshold = this.updateThreshold.bind(this);
        this.deleteThreshold = this.deleteThreshold.bind(this);
    }

    async createThreshold(req: Request, res: Response, next: NextFunction) {
        try {
            const {userId} = req.params;
            const threshold = req.body;
            
            const newThreshold = await this.thresholdService.createThreshold({userId, threshold});

            res.status(201).json({ "message": "A new parameter threshold was created", threshold: newThreshold });
        } catch (error) {
            next(error);
        }
    }

    async getThreshold(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

            const allUserThreshold = await this.thresholdService.getThreshold(userId);

            res.status(200).json(allUserThreshold);
        } catch (error) {
            next(error);
        }
    }

    async updateThreshold(req: Request, res: Response, next: NextFunction) {
        try {
            const thresholdId = req.params.id;
            const values = req.body;
       
            const updatedValues = await this.thresholdService.updateThreshold({thresholdId,values});

            res.status(200).json({"message":"Threshold value has been updated", "updated":updatedValues})
        }
        catch (error) {
            next(error);
        }
    }

    async deleteThreshold(req: Request, res: Response, next: NextFunction) {
        try {
            const thresholdId = req.params.id;

            await this.thresholdService.deleteThreshold(thresholdId);

            res.status(200).json({ "message": "Threshold value has been deleted" });

        } catch (error) {
            next(error);
        }
    }

}