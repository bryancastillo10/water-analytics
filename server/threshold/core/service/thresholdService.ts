import { ThresholdRepository } from "@/threshold/threshold.repository";

import {CreateThresholdRequest, UpdateThresholdRequest} from "@/threshold/core/interface/IThresholdRepository";
import { NotFoundError, ValidationError } from "@/infrastructure/errors/customErrors";

export class ThresholdService {
    constructor(private readonly thresholdRepository: ThresholdRepository) {
        
    }

    async createThreshold({ userId, threshold }: CreateThresholdRequest) {
        const { parameter, value } = threshold;

        if (!parameter || value === undefined ) {
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
        
        if (value === null) {
            throw new ValidationError("null value cannot be processed");
        }
        

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

    async updateThreshold({thresholdId,value}:UpdateThresholdRequest) {
        if (!thresholdId) {
            throw new ValidationError("Threshold id was not found");
        }
        const validKey = ["value"];
        const isValid = Object.keys(value).every((key) => validKey.includes(key));
        if (!isValid) {
            throw new ValidationError("The request must include only the value");
        }

        if (value === null) {
            throw new ValidationError("null value cannot be processed");
        }
        
        const updatedThreshold = this.thresholdRepository.updateThreshold({ thresholdId, value });

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