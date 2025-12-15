// src/routes/ModuleRoutes.ts
import { Router } from 'express';
import { ModuleController } from '../controllers/moduleController.js';

const router = Router();
const moduleController = new ModuleController();

// Pad: GET /api/modules
router.get('/', (req, res) => moduleController.getAll(req, res));

export default router;