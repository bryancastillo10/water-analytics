export interface IMeasurementData {
    id: string;
    siteId?: string;
    siteName?: string;
    location?: string;
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


// Update
export interface UpdateMeasurementResponse{
    message: string;
    measurement: IMeasurementData;
}

export interface UpdateMeasurementRequest {
    id: string;
    data: {
        siteId?: string;
        siteName?: string;
        location?: string;
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
}

// Delete
export interface DeleteMeasurementResponse {
    message: string;
}