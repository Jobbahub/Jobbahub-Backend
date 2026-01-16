import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { validateAIRequest } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/recommend', verifyToken, aiRateLimiter, validateAIRequest, getRecommendation);

export default router;
