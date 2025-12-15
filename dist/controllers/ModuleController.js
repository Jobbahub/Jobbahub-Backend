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
    async getById(req, res) {
        try {
            const { id } = req.params; // Haalt het ID uit de URL
            const numId = id ? Number(id) : NaN;
            if (Number.isNaN(numId)) {
                res.status(400).json({ message: 'Ongeldig module ID' });
                return;
            }
            const module = await this.moduleService.getModuleById(numId);
            res.status(200).json(module);
        }
        catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Module niet gevonden' });
        }
    }
}
//# sourceMappingURL=moduleController.js.map