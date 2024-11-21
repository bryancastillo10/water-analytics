import { MeasurementData } from "@/measurement/core/entity/measurement";

export interface IMeasurementRepository{
    createMeasurement({siteId, data}: CreateMeasurementRequest): Promise<MeasurementData>;
};


export interface CreateMeasurementRequest{
    siteId: string;
    data: MeasurementData;
};