import express from 'express';
import * as favoritesController from '../controllers/favoritesController.js'; // Let op .js extensie als je die gebruikt
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/favorites -> Haal favorieten op van ingelogde gebruiker
router.get('/', verifyToken, favoritesController.getFavorites);

// POST /api/favorites -> Voeg favoriet toe (ID zit in body)
router.post('/', verifyToken, favoritesController.addFavorite);

// DELETE /api/favorites/:moduleId -> Verwijder favoriet
router.delete('/:moduleId', verifyToken, favoritesController.removeFavorite);

export default router;