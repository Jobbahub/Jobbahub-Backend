// src/controllers/ModuleController.ts
import { Request, Response } from 'express';
import { ModuleService } from '../services/ModuleService.js';

export class ModuleController {
  private moduleService = new ModuleService();

  async getAll(req: Request, res: Response) {
    try {
      const modules = await this.moduleService.getAllModules();
      res.status(200).json(modules);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Fout bij ophalen van modules' });
    }
  }
}