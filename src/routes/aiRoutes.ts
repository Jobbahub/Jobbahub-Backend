import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/recommend', verifyToken, aiRateLimiter, getRecommendation);

export default router;