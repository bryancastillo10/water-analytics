import { PrismaClient } from "@prisma/client";
import { CreateMeasurementRequest, IMeasurementRepository } from "@/measurement/core/interface/IMeasurementRepository";
import { MeasurementData } from "./core/entity/measurement";

export class MeasurementRepository implements IMeasurementRepository {
  
    private prisma = new PrismaClient();

  async createMeasurement({
    userId,
    data,
  }: CreateMeasurementRequest): Promise<MeasurementData> {
    throw new Error("Method not implemented.");
    };
}