export class MeasurementData {
  id?: string;
  siteId?: string;
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