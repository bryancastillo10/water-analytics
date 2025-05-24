import express from 'express';
import { protectRoute } from '@/auth/auth.config';
import { thresholdController } from '@/threshold/threshold.config';

const router = express.Router();

router.get('/get', protectRoute, thresholdController.getThreshold);
router.put('/update', protectRoute, thresholdController.updateThreshold);

export default router;
