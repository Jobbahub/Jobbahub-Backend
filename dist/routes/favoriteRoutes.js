import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
// Route om toe te voegen: PATCH /api/favorites/:studentId
router.patch('/:studentId', verifyToken, favoritesController.addFavorite);
// Route om te verwijderen: DELETE /api/favorites/:studentId
router.delete('/:studentId', verifyToken, favoritesController.removeFavorite);
router.get('/:studentId', verifyToken, favoritesController.getFavorites);
export default router;
//# sourceMappingURL=favoriteRoutes.js.map