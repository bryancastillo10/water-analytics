import { MeasurementData } from "@/measurement/core/entity/measurement";

export interface IMeasurementRepository{
    createMeasurementBySite({ siteId, measurement }: CreateMeasurementRequest): Promise<MeasurementData>;
    getMeasurementBySite(siteId: string): Promise<MeasurementData[]>;
    updateMeasurement({ measurementId, measurement }: UpdateMeasurementRequest): Promise<MeasurementData>;
    deleteMeasurement(measurementId: string): Promise<void>;
};


interface MeasurementDataReq {
    measurement: MeasurementData;
}

export interface CreateMeasurementRequest extends MeasurementDataReq{
    siteId: string;
};

export interface UpdateMeasurementRequest extends MeasurementDataReq{
    measurementId: string;
};