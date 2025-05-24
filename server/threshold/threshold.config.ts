import { ThresholdRepository } from '@/threshold/threshold.repository';
import { ThresholdService } from '@/threshold/core/service/thresholdService';
import { ThresholdController } from '@/threshold/threshold.controller';

const thresholdRepository = new ThresholdRepository();

const thresholdService = new ThresholdService(thresholdRepository);

export const thresholdController = new ThresholdController(thresholdService);
