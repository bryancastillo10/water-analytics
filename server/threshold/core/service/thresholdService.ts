import { ThresholdRepository } from '@/threshold/threshold.repository';

import { UpdateThresholdRequest } from '@/threshold/core/interface/IThresholdRepository';
import { NotFoundError, ValidationError } from '@/infrastructure/errors/customErrors';

export class ThresholdService {
  constructor(private readonly thresholdRepository: ThresholdRepository) {}

  async getThreshold(userId: string) {
    if (!userId) {
      throw new ValidationError('No user id was found');
    }

    const allUserThreshold = await this.thresholdRepository.getThreshold(userId);
    if (!allUserThreshold) {
      throw new NotFoundError('Failed to fetch the user threshold');
    }

    return allUserThreshold;
  }

  async updateThreshold(updateData: UpdateThresholdRequest) {
    if (!updateData || !Array.isArray(updateData) || updateData.length === 0) {
      throw new ValidationError('Invalid update threshold request');
    }

    const validUpdates = updateData.map(update => {
      if (!update.thresholdId) {
        throw new ValidationError('Threshold id was not found');
      }

      if (update.parameter === 'pH') {
        if (update.minValue === undefined || update.maxValue === undefined) {
          throw new ValidationError('Both minValue and maxValue are required for pH');
        }
      } else {
        if (update.value === null || update.value === undefined) {
          throw new ValidationError('Null or undefined value is not allowed');
        }
      }

      return update;
    });

    const updatedThreshold = await this.thresholdRepository.updateThreshold(validUpdates);
    return updatedThreshold;
  }
}
