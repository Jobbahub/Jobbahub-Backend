import ModuleModel from '../models/Module.js';

export class ModuleRepository {
  async getAllModules() {
    // Gebruik het model om alle documenten te vinden
    return await ModuleModel.find({});
  }
}