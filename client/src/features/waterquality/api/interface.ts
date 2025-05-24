export interface IMeasurementData extends IMeasurementBase {
  id: string;
  siteId?: string;
  siteName?: string;
  location?: string;
}

export interface IMeasurementBase {
  date: string | null;
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
export interface CreateMeasurementRequest {
  id: string;
  data: IMeasurementBase;
}

export interface CreateMeasurementResponse {
  message: string;
  data: IMeasurementData;
}

// Update
export interface UpdateMeasurementResponse {
  message: string;
  measurement: IMeasurementData;
}

export interface UpdateMeasurementRequest {
  id: string;
  data: IMeasurementBase;
}

// Delete
export interface DeleteMeasurementResponse {
  message: string;
}
