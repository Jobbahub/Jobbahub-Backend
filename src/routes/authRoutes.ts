import express from 'express';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/questionnaire', verifyToken, authController.saveQuestionnaire);
router.delete('/questionnaire', verifyToken, authController.resetQuestionnaire);

export default router;