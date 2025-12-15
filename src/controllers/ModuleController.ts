import type { Request, Response } from 'express';
import * as ModuleService from '../services/moduleService.js';

/**
 * HTTP GET handler voor het ophalen van alle modules.
 * Endpoint: GET /api/modules
 */
export const getAllModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const modules = await ModuleService.fetchAllModules();
    
    // Stuur een 200 OK response met de lijst van modules
    res.status(200).json(modules);
  } catch (error) {
    // Stuur een 500 Internal Server Error bij een fout
    // De specifieke foutmelding komt uit de Service/Repository
    console.error('Fout in getAllModules controller:', error);
    res.status(500).json({ message: 'Er is een fout opgetreden bij het ophalen van de modules.' });
  }
};