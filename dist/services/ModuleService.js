// src/services/ModuleService.ts
import { ModuleRepository } from '../repositories/moduleRepository.js';
export class ModuleService {
    moduleRepository = new ModuleRepository();
    async getAllModules() {
        // Hier zou je eventueel sortering kunnen toevoegen, bijv. op naam
        return await this.moduleRepository.getAllModules();
    }
}
//# sourceMappingURL=moduleService.js.map