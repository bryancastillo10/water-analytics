import { PrismaClient } from "@prisma/client";
import { MeasurementData } from "./core/entity/measurement";
import { CreateMeasurementRequest, IMeasurementRepository } from "@/measurement/core/interface/IMeasurementRepository";

export class MeasurementRepository implements IMeasurementRepository {
  private prisma = new PrismaClient();

  async createMeasurementBySite({
    siteId,
    measurement,
  }: CreateMeasurementRequest): Promise<MeasurementData> {
      const newMeasurement = await this.prisma.measurement.create({
        data: {
          siteId,
          ...measurement
        },
      });
      return newMeasurement as MeasurementData;
  };
  
  async getMeasurementBySite(siteId: string): Promise<MeasurementData[]> {
    const measurements = await this.prisma.measurement.findMany({
      where: { siteId },
      orderBy: { date: "desc" },
    });

    return measurements as MeasurementData[];
  }
}