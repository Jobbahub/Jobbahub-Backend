import {} from '../models/module.js';
import * as ModuleRepository from '../repositories/moduleRepository.js';
/**
 * Business logica om alle modules op te halen.
 * Kan extra verwerking of validatie bevatten.
 */
export const fetchAllModules = async () => {
    // We kunnen hier extra validatie of business logica toevoegen,
    // maar voor nu roepen we alleen de repository aan.
    const modules = await ModuleRepository.getAllModules();
    return modules;
};
//# sourceMappingURL=moduleService.js.map