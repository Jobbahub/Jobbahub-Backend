import ModuleModel from '../models/module.js';
export class ModuleRepository {
    async getAllModules() {
        // Gebruik het model om alle documenten te vinden
        return await ModuleModel.find({});
    }
}
//# sourceMappingURL=moduleRepository.js.map