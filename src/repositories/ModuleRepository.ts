import Module, { type IModule } from '../models/module.js';

/**
 * Haalt alle modules op uit de MongoDB database.
 * @returns Promise<IModule[]> Een lijst van alle modules.
 */
export const getAllModules = async (): Promise<IModule[]> => {
  try {
    const modules: IModule[] = await Module.find({}).exec();
    return modules;
  } catch (error) {
    console.error("Fout bij ophalen van keuzemodules:", error);
    throw error;
  }
};