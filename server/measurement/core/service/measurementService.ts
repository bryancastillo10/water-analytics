import {
  CreateMeasurementRequest,
  UpdateMeasurementRequest,
} from '@/measurement/core/interface/IMeasurementRepository';
import { MeasurementRepository } from '@/measurement/measurement.repository';

import { ValidationError, NotFoundError } from '@/infrastructure/errors/customErrors';

export class MeasurementService {
  constructor(private readonly measurementRepository: MeasurementRepository) {}

  async createMeasurementBySite({ siteId, measurement }: CreateMeasurementRequest) {
    if (!siteId || !measurement) {
      throw new ValidationError('Site ID and the measurement data are required');
    }

    const newMeasurement = await this.measurementRepository.createMeasurementBySite({
      siteId,
      measurement,
    });

    return newMeasurement;
  }

  async getAllMeasurements(userId: string) {
    const allSiteMeasurements = await this.measurementRepository.getAllMeasurements(userId);
    if (!allSiteMeasurements) {
      throw new NotFoundError('Failed to get all the measurements of the site ID');
    }

    return allSiteMeasurements;
  }

  async updateMeasurement({ measurementId, measurement }: UpdateMeasurementRequest) {
    if (!measurementId || !measurement) {
      throw new ValidationError('Measurement ID and its data, the measurement data, is required');
    }

    const updatedMeasurement = await this.measurementRepository.updateMeasurement({
      measurementId,
      measurement,
    });

    return updatedMeasurement;
  }

  async deleteMeasurement(measurementId: string) {
    if (!measurementId) {
      throw new ValidationError('Measurement ID is required');
    }

    await this.measurementRepository.deleteMeasurement(measurementId);

    return;
  }
}
