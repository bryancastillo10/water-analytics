export interface IThresholdData{
    id: string;
    parameter: string;
    unit: string;
    value: string;
}

type ParameterTypes = {
    pH: number;
    totalCOD: number;
    suspendedSolids: number;
}


export interface UpdateThresholdRequest {
    thresholdId: string;
    value: ParameterTypes
}