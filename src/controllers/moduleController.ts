// src/controllers/ModuleController.ts
import { Request, Response } from 'express';
import { ModuleService } from '../services/moduleService.js';

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
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params; // Haalt het ID uit de URL
      const numId = id ? Number(id) : NaN;
      if (Number.isNaN(numId)) {
        res.status(400).json({ message: 'Ongeldig module ID' });
        return;
      }
      const module = await this.moduleService.getModuleById(numId);
      res.status(200).json(module);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: 'Module niet gevonden' });
    }
  }
  async getByBatchIds(req: Request, res: Response) {
  try {
    // 1. Haal de query-parameter op
    const idsQuery = req.query.ids as string | undefined;

    if (!idsQuery) {
      // Dit vangt de URL: /modules/batch
      return res.status(400).json({ message: 'Lijst van module ID\'s (ids) is vereist als query-parameter.' });
    }

    // DEBUGGING: Log de ruwe input om te zien wat er binnenkomt
    // console.log('Ruwe ID\'s string:', idsQuery); 
    
    // 2. Splitsen, opschonen en converteren
    const idsArray = idsQuery
      .split(',') // Splitten op de komma
      .map(id => id.trim()) // Spaties verwijderen rondom elke ID
      .filter(id => id !== ''); // Lege strings verwijderen (ontstaan bij '1,,5' of '1,5,')
      
    // 3. Valideren en converteren naar nummers
    const validIds: number[] = [];
    for (const id of idsArray) {
      const numId = Number(id);
      
      // Controleer of de conversie slaagt
      if (!Number.isNaN(numId) && numId > 0) { // Zorg ervoor dat het een geldig nummer is
        validIds.push(numId);
      } else {
        // DEBUGGING: Log de ongeldige ID
        // console.error('Ongeldige ID gevonden:', id); 
      }
    }
    
    // 4. Final check: Zijn er geldige ID's over?
    if (validIds.length === 0) {
      // Dit vangt URLs als: /modules/batch?ids=a,b,c of /modules/batch?ids=,
      return res.status(400).json({ message: 'Ongeldige module ID\'s. Zorg voor een komma-gescheiden lijst met geldige nummers.' });
    }

    // 5. Unieke ID's en Service aanroepen
    const uniqueValidIds = [...new Set(validIds)];
    const modules = await this.moduleService.getModulesByIds(uniqueValidIds);
    
    res.status(200).json(modules); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Er is een interne serverfout opgetreden bij het ophalen van de modules.' });
  }
}
}