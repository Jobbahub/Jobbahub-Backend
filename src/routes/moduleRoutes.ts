// src/routes/ModuleRoutes.ts
import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController.js';
import { validateObjectId, validateBatchIds } from '../middleware/validationMiddleware.js';

const router = Router();
const moduleController = new ModuleController();

router.get('/', (req, res) => moduleController.getAll(req, res));
router.get('/batch', validateBatchIds, (req, res) => moduleController.getByBatchIds(req, res));
router.get('/:id', validateObjectId('id'), (req, res) => moduleController.getById(req, res));

export default router;
