import { MeasurementRepository } from "@/measurement/measurement.repository";

import { CreateMeasurementRequest } from "@/measurement/core/interface/IMeasurementRepository";
import { MeasurementData } from "../entity/measurement";

export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  async createMeasurementBySite({
    siteId,
    measurement,
  }: CreateMeasurementRequest) {
    if (!siteId || !measurement) {
      throw new Error("Site ID and the measurement data are required");
    }

    // Type-safe numeric conversion function
    const safeNumberConversion = (value: any): number | null => {
      if (value === undefined || value === null) return null;
      const converted = Number(value);
      return !isNaN(converted) ? converted : null;
    };


    const processedMeasurement = {
      date: measurement.date ? new Date(measurement.date) : new Date(),
      pH: safeNumberConversion(measurement.pH),
      temperature: safeNumberConversion(measurement.temperature),
      dissolvedOxygen: safeNumberConversion(measurement.dissolvedOxygen),
      totalCOD: safeNumberConversion(measurement.totalCOD),
      suspendedSolids: safeNumberConversion(measurement.suspendedSolids),
      fecalColiform: safeNumberConversion(measurement.fecalColiform),
      ammonia: safeNumberConversion(measurement.ammonia),
      nitrates: safeNumberConversion(measurement.nitrates),
      phosphates: safeNumberConversion(measurement.phosphates),
    };


    const newMeasurement =
      await this.measurementRepository.createMeasurementBySite({
        siteId,
        measurement: processedMeasurement as MeasurementData,
      });

    return newMeasurement;
  }

  async updateMeasurement() {
    throw new Error("Method not yet implemented");
  }

  async deleteMeasurement() {
    throw new Error("Method not yet implemented");
  }
}
