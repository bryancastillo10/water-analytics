import { Request, Response } from "express";
// import { MeasurementService } from "@/measurement/core/service/measurement.service";

export class UserController {
  // constructor(private readonly measurementService: MeasurementService) {
  //     this.createMeasurement = this.createMeasurement.bind(this);
  //     this.getAllMeasurement = this.getAllMeasurement.bind(this);
  //     this.updateMeasurement = this.updateMeasurement.bind(this);
  //     this.deleteMeasurement = this.deleteMeasurement.bind(this);
  // }

  async createMeasurement(req: Request, res: Response) {
    try {
      const measurement = req.body;
      res
        .status(201)
        .json({ message: "Water quality has been added", data: measurement });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

    async getAllMeasurement(req: Request, res: Response) {
        try {
            const userId = req.body;
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
