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
    async getModulesByIds(ids) {
        if (!ids || ids.length === 0)
            return [];
        // Zoek modules waarbij het 'id' veld voorkomt in de gegeven array van ID's
        return await ModuleModel.find({ id: { $in: ids } });
    }
}
//# sourceMappingURL=moduleRepository.js.map