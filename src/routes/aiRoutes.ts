import { Router } from 'express';
import { getRecommendation } from '../controllers/predictionController.js';

const router = Router();

// Dit wordt dan: POST /api/ai/recommend (afhankelijk van je server setup)
router.post('/recommend', getRecommendation);

export default router;