import { type IModule } from '../models/module.js';
import * as ModuleRepository from '../repositories/moduleRepository.js';

/**
 * Business logica om alle modules op te halen.
 * Kan extra verwerking of validatie bevatten.
 */
export const fetchAllModules = async (): Promise<IModule[]> => {
  // We kunnen hier extra validatie of business logica toevoegen,
  // maar voor nu roepen we alleen de repository aan.
  const modules = await ModuleRepository.getAllModules();
  return modules;
};