export interface IMeasurementData {
    id: string;
    siteName: string;
    location: string;
    date: string;
    pH: number | null;
    suspendedSolids: number | null;
    totalCOD: number | null;
    fecalColiform: number | null;
    temperature: number | null;
    dissolvedOxygen: number | null;
    ammonia: number | null;
    nitrates: number | null;
    phosphates: number | null;
}
  

// Create
export interface MutateMeasurementRequest{
    id: string;
    data: IMeasurementData;
}

export interface CreateMeasurementResponse{
    message: string;
    data: IMeasurementData;
}

// Get
export interface GetMeasurementRequest{
    id: string;
}

export interface GetMeasurementResponse{
    allSiteMeasurements: IMeasurementData[];
}

// Update
export interface UpdateMeasurementResponse{
    message: string;
    measurement: IMeasurementData;
}

// Delete
export interface DeleteMeasurementResponse {
    message: string;
}