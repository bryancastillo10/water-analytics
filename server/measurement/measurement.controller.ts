import { Request, Response, NextFunction } from "express";
import { MeasurementService } from "@/measurement/core/service/measurementService";

export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {
      this.createMeasurementBySite = this.createMeasurementBySite.bind(this);
      this.getMeasurementBySite = this.getMeasurementBySite.bind(this);
      this.updateMeasurement = this.updateMeasurement.bind(this);
      this.deleteMeasurement = this.deleteMeasurement.bind(this);
  }

  async createMeasurementBySite(req: Request, res: Response, next: NextFunction) {
      try {
          const siteId = req.params.siteId;
          const measurement = req.body;
          const newMeasurement = await this.measurementService.createMeasurementBySite({siteId, measurement});
      res
        .status(201)
        .json({ message: "Water quality data has been added", data: newMeasurement });
    } catch (error) {
      next(error);
    }
  }

    async getMeasurementBySite(req: Request, res: Response, next: NextFunction) {
        try {
            const siteId = req.params.siteId;
            const allSiteMeasurements = await this.measurementService.getMeasurementBySite(siteId);
            res.status(200).json({ allSiteMeasurements });
        } catch (error) {
            next(error);
        }
    }
    
    async updateMeasurement(req: Request, res: Response, next: NextFunction) {
        try {
            const measurementId = req.params.measurementId;
            const measurement = req.body;
            const updatedMeasurement = await this.measurementService.updateMeasurement({ measurementId, measurement });
            res.status(200).json({ message: "A measurement has been updated", measurement: updatedMeasurement });
        } catch (error) {
            next(error);
        }
    }

    async deleteMeasurement(req: Request, res: Response, next: NextFunction) {
        try {
            const measurementId = req.params.measurementId;
            await this.measurementService.deleteMeasurement(measurementId);
 
            res.status(200).json({ message: "Measurement has been deleted successfully" });
        } catch (error) {
            next(error);
        }
    }
}
