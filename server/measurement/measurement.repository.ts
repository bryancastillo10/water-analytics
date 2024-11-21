import { PrismaClient } from "@prisma/client";
import { MeasurementData } from "./core/entity/measurement";
import { CreateMeasurementRequest, IMeasurementRepository } from "@/measurement/core/interface/IMeasurementRepository";

export class MeasurementRepository implements IMeasurementRepository {
  private prisma = new PrismaClient();

  async createMeasurementBySite({
    siteId,
    measurement,
  }: CreateMeasurementRequest): Promise<MeasurementData> {
    
    try {
      const newMeasurement = await this.prisma.measurement.create({
        data: {
          siteId,
          ...measurement,
        },
      });

      console.log("Repository - Created Measurement:", newMeasurement);

      return newMeasurement as MeasurementData;
    } catch (error) {
      console.error("Repository - Creation Error:", error);
      throw error;
    }
  }
  async getMeasurementBySite(siteId: string): Promise<MeasurementData[]> {
    const measurements = await this.prisma.measurement.findMany({
      where: { siteId },
      orderBy: { date: "desc" },
    });

    return measurements as MeasurementData[];
  }
}