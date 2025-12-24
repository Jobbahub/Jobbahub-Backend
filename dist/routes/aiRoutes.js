import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';
const router = Router();
import { aiRateLimiter } from '../middleware/rateLimiter.js';
router.post('/recommend', aiRateLimiter, getRecommendation);
export default router;
//# sourceMappingURL=aiRoutes.js.map