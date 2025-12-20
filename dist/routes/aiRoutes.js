import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';
const router = Router();
router.post('/recommend', getRecommendation);
export default router;
//# sourceMappingURL=aiRoutes.js.map