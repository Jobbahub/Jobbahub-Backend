import ModuleModel from '../models/module.js';
export class ModuleRepository {
    async getAllModules() {
        // Gebruik het model om alle documenten te vinden
        return await ModuleModel.find({});
    }
    async getModuleById(id) {
        if (id === undefined || id === null)
            return null;
        // Zoek op het numerieke `id` veld zoals in de collectie
        return await ModuleModel.findOne({ id: id });
    }
}
//# sourceMappingURL=moduleRepository.js.map