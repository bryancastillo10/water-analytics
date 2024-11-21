import { Request, Response } from "express";
import { MeasurementService } from "@/measurement/core/service/measurementService";

export class MeasurementController {
  constructor(private readonly measurementService: MeasurementService) {
      this.createMeasurementBySite = this.createMeasurementBySite.bind(this);
      this.getMeasurementBySite = this.getMeasurementBySite.bind(this);
      this.updateMeasurement = this.updateMeasurement.bind(this);
      this.deleteMeasurement = this.deleteMeasurement.bind(this);
  }

  async createMeasurementBySite(req: Request, res: Response) {
      try {
          const siteId = req.params.siteId;
          const measurement = req.body;
          const newMeasurement = await this.measurementService.createMeasurementBySite({siteId, measurement});
      res
        .status(201)
        .json({ message: "Water quality data has been added", data: newMeasurement });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

    async getMeasurementBySite(req: Request, res: Response) {
        try {
            const siteId = req.body;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async updateMeasurement(req: Request, res: Response) {
        try {
            const measurementId = req.params.id;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteMeasurement(req: Request, res: Response) {
        try {
            const measurementId = req.params.id;
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
