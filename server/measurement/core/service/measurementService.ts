import { MeasurementRepository } from "@/measurement/measurement.repository";
import { CreateMeasurementRequest, UpdateMeasurementRequest } from "@/measurement/core/interface/IMeasurementRepository";
import { MeasurementData } from "@/measurement/core/entity/measurement";

export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  async createMeasurementBySite({
    siteId,
    measurement,
  }: CreateMeasurementRequest) {
    if (!siteId || !measurement) {
      throw new Error("Site ID and the measurement data are required");
    }

    const newMeasurement =
      await this.measurementRepository.createMeasurementBySite({
        siteId,
        measurement: measurement as MeasurementData,
      });

    return newMeasurement;
  }

  async getMeasurementBySite(siteId:string) {
    if (!siteId) {
      throw new Error("Site is required");
    }

    const allSiteMeasurements = await this.measurementRepository.getMeasurementBySite(siteId);
    if (!allSiteMeasurements) {
      throw new Error("Failed to get all the measurements of the site ID");
    }

    return allSiteMeasurements;
  }

  async updateMeasurement({measurementId, measurement}:UpdateMeasurementRequest) {
    if (!measurementId || !measurement) {
      throw new Error("Measurement ID and its data, the measurement data, is required");
    }

    const updatedMeasurement = await this.measurementRepository.updateMeasurement({ measurementId, measurement });
    if (!updatedMeasurement) {
      throw new Error("Failed to update the selected measurement");
    }
    return updatedMeasurement;
  }

  async deleteMeasurement() {
    throw new Error("Method not yet implemented");
  }
}
