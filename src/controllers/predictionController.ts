import { Request, Response } from 'express';
import * as aiService from '../services/aiService.js';

export const getRecommendation = async (req: Request, res: Response) => {
    try {
        const result = await aiService.getAIRecommendation(req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};