import { ThresholdRepository } from "@/threshold/threshold.repository";

export class ThresholdService {
    constructor(private readonly thresholdRepository: ThresholdRepository) {
        
    }

    async createThreshold() {
        throw new Error("Method not yet implemented");
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