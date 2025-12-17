import { Request, Response } from 'express';
import * as favoriteService from '../services/favoriteService.js';

// Interface uitbreiding
interface AuthRequest extends Request {
  user?: { id: string };
}

export const getFavorites = async (req: Request, res: Response) => {
  try {
    const studentId = (req as AuthRequest).user?.id;
    
    // Check: als er geen ID is, stop direct
    if (!studentId) {
        return res.status(401).json({ error: 'Niet geautoriseerd' });
    }

    // Nu weet TS zeker dat studentId een string is
    const favorites = await favoriteService.getFavorites(studentId);
    res.json(favorites);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const studentId = (req as AuthRequest).user?.id;
    const { module_id } = req.body;

    // Strenge checks voor BEIDE variabelen
    if (!studentId) {
        return res.status(401).json({ error: 'Niet geautoriseerd' });
    }
    if (!module_id) {
        return res.status(400).json({ error: 'Module ID verplicht' });
    }

    const updatedStudent = await favoriteService.addFavorite(studentId, module_id);
    res.json(updatedStudent.favorieten);
  } catch (error: any) {
    console.error("Add favorite error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const studentId = (req as AuthRequest).user?.id;
    const { moduleId } = req.params;

    // HIER zat waarschijnlijk je foutmelding:
    if (!studentId) {
        return res.status(401).json({ error: 'Niet geautoriseerd' });
    }
    
    if (!moduleId) {
        return res.status(400).json({ error: 'Module ID ontbreekt' });
    }

    // Omdat we hierboven 'return' doen als het leeg is, 
    // weet TypeScript hieronder zeker dat studentId een string is.
    const updatedStudent = await favoriteService.removeFavorite(studentId, moduleId);
    res.json(updatedStudent.favorieten);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};