export class MeasurementData {
    id!: string;
    date!: Date;

    pH?: number;
    suspendedSolids?: number;
    totalCOD?: number;
    fecalColiform?: number;

    temperature?: number;
    dissolvedOxygen?: number;

    ammonia?: number;
    nitrates?: number;
    phosphates?: number;

    siteId!: string;
}