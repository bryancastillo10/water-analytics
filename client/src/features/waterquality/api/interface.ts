interface MeasurementData {
    date?: Date;
    pH?: number;
    temperature?: number;
    dissolvedOxygen?: number;
    totalCOD?: number;
    suspendedSolids?: number;
    fecalColiform?: number;
    ammonia?: number;
    nitrates?: number;
    phosphates?: number;
}

// Create
export interface MutateMeasurementRequest{
    id: string;
    data: MeasurementData;
}

export interface CreateMeasurementResponse{
    message: string;
    data: MeasurementData;
}

// Get
export interface GetMeasurementRequest{
    id: string;
}

export interface GetMeasurementResponse{
    allSiteMeasurements: MeasurementData[];
}

// Update
export interface UpdateMeasurementResponse{
    message: string;
    measurement: MeasurementData;
}

// Delete
export interface DeleteMeasurementResponse {
    message: string;
}