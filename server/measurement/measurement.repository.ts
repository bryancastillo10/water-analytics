import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { DatabaseError } from '@/infrastructure/errors/customErrors';

import {
  CreateMeasurementRequest,
  IMeasurementRepository,
  UpdateMeasurementRequest,
} from '@/measurement/core/interface/IMeasurementRepository';
import { MeasurementData } from '@/measurement/core/entity/measurement';

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

      return newMeasurement as MeasurementData;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at createMeasurementBySite method');
      }
      throw Error;
    }
  }

  async getAllMeasurements(userId: string): Promise<MeasurementData[]> {
    try {
      const measurements = await this.prisma.measurement.findMany({
        where: {
          site: {
            userId: userId,
          },
        },
        orderBy: { date: 'desc' },
      });

      return measurements as MeasurementData[];
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at getMeasurementBySite method');
      }
      throw Error;
    }
  }

  async updateMeasurement({
    measurementId,
    measurement,
  }: UpdateMeasurementRequest): Promise<MeasurementData> {
    try {
      const { id, ...updateData } = measurement;

      const updatedMeasurement = await this.prisma.measurement.update({
        where: { id: measurementId },
        data: updateData,
      });
      return updatedMeasurement as MeasurementData;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at updateMeasurement method');
      }
      throw error;
    }
  }

  async deleteMeasurement(measurementId: string): Promise<void> {
    try {
      await this.prisma.measurement.delete({
        where: { id: measurementId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);
        throw new DatabaseError('Database error at deleteMeasurement method');
      }
      throw Error;
    }
  }
}
