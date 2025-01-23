export interface ITimeSeries {
    date: Date;
    value: number | null;
}

export interface ITimeSeriesRequest {
    id: string;
    parameter: string;
}