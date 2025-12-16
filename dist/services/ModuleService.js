// src/services/ModuleService.ts
import { ModuleRepository } from '../repositories/moduleRepository.js';
export class ModuleService {
    moduleRepository = new ModuleRepository();
    async getAllModules() {
        // Hier zou je eventueel sortering kunnen toevoegen, bijv. op naam
        return await this.moduleRepository.getAllModules();
    }
    async getModuleById(id) {
        const module = await this.moduleRepository.getModuleById(id);
        if (!module) {
            throw new Error('Module niet gevonden');
        }
        return module;
    }
    async getModulesByIds(ids) {
        // Optionele validatie: filter niet-numerieke of dubbele ID's
        const uniqueNumIds = [...new Set(ids.map(Number).filter(id => !Number.isNaN(id)))];
        if (uniqueNumIds.length === 0) {
            // Je kunt hier een lege array teruggeven of een foutmelding, afhankelijk van je wensen
            return [];
        }
        const modules = await this.moduleRepository.getModulesByIds(uniqueNumIds);
        // Optioneel: gooi een fout als *geen* modules worden gevonden
        if (modules.length === 0) {
            throw new Error('Geen modules gevonden voor de opgegeven ID\'s');
        }
        return modules;
    }
}
//# sourceMappingURL=moduleService.js.map