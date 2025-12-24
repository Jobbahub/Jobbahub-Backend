import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/recommend', aiRateLimiter, getRecommendation);

export default router;