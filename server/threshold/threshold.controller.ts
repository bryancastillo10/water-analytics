import { Request, Response, NextFunction } from 'express';
import { CustomRequest } from '@/infrastructure/middleware/type';
import { ThresholdService } from '@/threshold/core/service/thresholdService';

export class ThresholdController {
  constructor(private readonly thresholdService: ThresholdService) {
    this.getThreshold = this.getThreshold.bind(this);
    this.updateThreshold = this.updateThreshold.bind(this);
  }

  async getThreshold(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const userId = req?.user?.id!;
      if (!userId) {
        throw new Error('User ID is undefined. Ensure auth middleware is applied');
      }

      const allUserThreshold = await this.thresholdService.getThreshold(String(userId));

      res.status(200).json(allUserThreshold);
    } catch (error) {
      next(error);
    }
  }

  async updateThreshold(req: Request, res: Response, next: NextFunction) {
    try {
      const thresholdUpdates = req.body;

      const updatedValues = await this.thresholdService.updateThreshold(thresholdUpdates);

      res.status(200).json({ message: 'Threshold value has been updated', updated: updatedValues });
    } catch (error) {
      next(error);
    }
  }
}
