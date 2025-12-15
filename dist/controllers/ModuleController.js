import { ModuleService } from '../services/moduleService.js';
export class ModuleController {
    moduleService = new ModuleService();
    async getAll(req, res) {
        try {
            const modules = await this.moduleService.getAllModules();
            res.status(200).json(modules);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Fout bij ophalen van modules' });
        }
    }
}
//# sourceMappingURL=moduleController.js.map