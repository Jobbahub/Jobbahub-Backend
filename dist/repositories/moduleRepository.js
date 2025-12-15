import Module, {} from '../models/module.js';
/**
 * Haalt alle modules op uit de MongoDB database.
 * @returns Promise<IModule[]> Een lijst van alle modules.
 */
export const getAllModules = async () => {
    try {
        const modules = await Module.find({}).exec();
        return modules;
    }
    catch (error) {
        console.error("Fout bij ophalen van keuzemodules:", error);
        throw error;
    }
};
//# sourceMappingURL=moduleRepository.js.map