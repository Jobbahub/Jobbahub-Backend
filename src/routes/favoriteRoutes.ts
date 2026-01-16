import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { validateObjectId, validateAddFavorite } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, favoritesController.getFavorites);
router.post('/', verifyToken, validateAddFavorite, favoritesController.addFavorite);
router.delete('/:moduleId', verifyToken, validateObjectId('moduleId'), favoritesController.removeFavorite);

export default router;
