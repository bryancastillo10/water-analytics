import { ThresholdRepository } from "@/threshold/threshold.repository";

import {CreateThresholdRequest, UpdateThresholdRequest} from "@/threshold/core/interface/IThresholdRepository";
import { NotFoundError, ValidationError } from "@/infrastructure/errors/customErrors";

export class ThresholdService {
    constructor(private readonly thresholdRepository: ThresholdRepository) {
        
    }

    async createThreshold({ userId, threshold }: CreateThresholdRequest) {
        const { parameter, minValue, maxValue} = threshold;

        if (!parameter || minValue === undefined || maxValue === undefined ) {
            throw new ValidationError("Threshold data was not found. Parameter, Min Value, Max Value, and Unit are required");
        }

        if (!userId) {
            throw new ValidationError("No user id was found");
        }

        const isUserVerified = await this.thresholdRepository.verifyUserRole(userId);
        if (!isUserVerified) {
            throw new ValidationError("The user is not auhorized to create a threshold. Admin privileges only");
        }

        const thresholdWithUnit = {
            ...threshold,
            unit: threshold.unit ?? "NA"
          };

        const newThreshold = await this.thresholdRepository.createThreshold({userId, threshold: thresholdWithUnit});

        return newThreshold;

    }

    async getThreshold(userId: string) {
        if (!userId) {
            throw new ValidationError("No user id was found");
        }

        const allUserThreshold = await this.thresholdRepository.getThreshold(userId);
        if (!allUserThreshold) {
            throw new NotFoundError("Failed to fetch the user threshold");
        }

        return allUserThreshold;
        
    }

    async updateThreshold({thresholdId,values}:UpdateThresholdRequest) {
        if (!thresholdId) {
            throw new ValidationError("Threshold id was not found");
        }
        const validKeys = ["minValue", "maxValue"];
        const isValid = Object.keys(values).every((key) => validKeys.includes(key));
        if (!isValid) {
            throw new ValidationError("The request must include minValue and maxValue only");
        }
        
        const updatedThreshold = this.thresholdRepository.updateThreshold({ thresholdId, values });

        return updatedThreshold;
    }

    async deleteThreshold(thresholdId:string) {
        if (!thresholdId) {
            throw new ValidationError("Threshold id was not found");
        }

        const userId = await this.thresholdRepository.findUserByThreshold(thresholdId);
        const isUserVerified = await this.thresholdRepository.verifyUserRole(userId);
        if (!isUserVerified) {
            throw new ValidationError("The user is not auhorized to create a threshold. Admin privileges only");
        }

        await this.thresholdRepository.deleteThreshold(thresholdId);
    }
}