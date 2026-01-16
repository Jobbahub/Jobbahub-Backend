import express from 'express';
import { validateLogin, validateSurvey, validateRegister, validateChangeCredentials } from '../middleware/validationMiddleware.js';
import * as authController from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', authRateLimiter, validateRegister, authController.register);
router.post('/login', authRateLimiter, validateLogin, authController.login);

router.get('/me', verifyToken, authController.getMe);
router.post('/questionnaire', verifyToken, validateSurvey, authController.saveQuestionnaire);
router.delete('/questionnaire', verifyToken, authController.resetQuestionnaire);

router.patch('/change-credentials', verifyToken, authRateLimiter, validateChangeCredentials, authController.changeCredentials);

export default router;
