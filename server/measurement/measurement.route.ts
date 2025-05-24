import express from 'express';
import { protectRoute } from '@/auth/auth.config';
import { measurementController } from '@/measurement/measurement.config';

const router = express.Router();

router.post('/site/:siteId', protectRoute, measurementController.createMeasurementBySite);
router.get('/', protectRoute, measurementController.getAllMeasurements);
router.put(
  '/update/measurement/:measurementId',
  protectRoute,
  measurementController.updateMeasurement,
);
router.delete(
  '/delete/measurement/:measurementId',
  protectRoute,
  measurementController.deleteMeasurement,
);

export default router;
