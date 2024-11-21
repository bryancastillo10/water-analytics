import { MeasurementRepository } from "@/measurement/measurement.repository";

import { CreateMeasurementRequest } from "../interface/IMeasurementRepository";

export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {
  }

    async createMeasurementBySite({siteId, data}:CreateMeasurementRequest) {
    throw new Error("Method not yet implemented");
  }

  async getMeasurementBySite() {
    throw new Error("Method not yet implemented");
  }

  async updateMeasurement() {
    throw new Error("Method not yet implemented");
  }

  async deleteMeasurement() {
    throw new Error("Method not yet implemented");
  }
}
