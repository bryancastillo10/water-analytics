import { ThresholdRepository } from "@/threshold/threshold.repository";

import {CreateThresholdRequest} from "@/threshold/core/interface/IThresholdRepository";
import { ValidationError } from "@/infrastructure/errors/customErrors";

export class ThresholdService {
    constructor(private readonly thresholdRepository: ThresholdRepository) {
        
    }

    async createThreshold({ userId, threshold }: CreateThresholdRequest) {
        const { parameter, minValue, maxValue, unit } = threshold;

        if (!parameter || minValue === undefined || maxValue === undefined || !unit) {
            throw new ValidationError("Threshold data was not found. Parameter, Min Value, Max Value, and Unit are required");
        }
        if (!userId) {
            throw new ValidationError("No user id was found");
        }

        const isUserVerified = await this.thresholdRepository.verifyUserRole(userId);
        if (!isUserVerified) {
            throw new ValidationError("The user is not auhorized to create a threshold. Admin privileges only");
        }

        const newThreshold = await this.thresholdRepository.createThreshold({userId, threshold});

        return newThreshold;

    }

    async getThreshold() {
        throw new Error("Method not yet implemented");
    }

    async updateThreshold() {
        throw new Error("Method not yet implemented");
    }

    async deleteThreshold() {
        throw new Error("Method not yet implemented");
    }
}