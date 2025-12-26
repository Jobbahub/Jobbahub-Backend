import express from 'express';
import { validateLogin, validateSurvey } from '../middleware/validationMiddleware.js';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', validateLogin, authController.login);

// Voeg de /me route toe
router.get('/me', verifyToken, authController.getMe);
router.post('/questionnaire', verifyToken, validateSurvey, authController.saveQuestionnaire);
router.delete('/questionnaire', verifyToken, authController.resetQuestionnaire);

export default router;