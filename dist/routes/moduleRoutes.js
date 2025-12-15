import { Router } from 'express';
import { getAllModules } from '../controllers/moduleController.js';
const router = Router();
// Route om alle modules op te halen
router.get('/', getAllModules);
export default router;
//# sourceMappingURL=moduleRoutes.js.map