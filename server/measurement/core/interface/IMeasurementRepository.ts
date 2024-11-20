import { MeasurementData } from "@/measurement/core/entity/measurement";

export interface IMeasurementRepository{
    createMeasurement({userId, data}: CreateMeasurementRequest): Promise<MeasurementData>;
};


export interface CreateMeasurementRequest{
    userId: string;
    data: MeasurementData;
};