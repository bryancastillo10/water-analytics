import { PrismaClient } from "@prisma/client";
import { MeasurementData } from "./core/entity/measurement";
import { CreateMeasurementRequest, IMeasurementRepository, UpdateMeasurementRequest } from "@/measurement/core/interface/IMeasurementRepository";

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
  };

  async updateMeasurement({ measurementId, measurement }: UpdateMeasurementRequest): Promise<MeasurementData> {
    const updatedMeasurement = await this.prisma.measurement.update({
      where: { id: measurementId },
      data: {
        ...measurement
      }
    });
    return updatedMeasurement as MeasurementData;
  };

  async deleteMeasurement(measurementId: string): Promise<void> {
    try {
       await this.prisma.measurement.delete({
      where: { id: measurementId }
    });
    } catch (error: any) {
      if (error.code == 'P2025') {
        throw new Error("Measurement is not found in the database");
      }
      throw new Error("Failed to delete the selected measurement");
    }
  }
}