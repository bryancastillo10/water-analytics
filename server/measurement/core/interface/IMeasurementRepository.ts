import { MeasurementData } from "@/measurement/core/entity/measurement";

export interface IMeasurementRepository{
    createMeasurementBySite({ siteId, measurement }: CreateMeasurementRequest): Promise<MeasurementData>;
    getMeasurementBySite(siteId: string): Promise<MeasurementData[]>;
};


export interface CreateMeasurementRequest{
    siteId: string;
    measurement: MeasurementData;
};