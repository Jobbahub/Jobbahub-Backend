// src/repositories/ModuleRepository.ts
import mongoose from 'mongoose';
export class ModuleRepository {
    async getAllModules() {
        const db = mongoose.connection.db;
        if (!db)
            throw new Error('MongoDB connection not initialized');
        return await db.collection('Keuzemodules').find({}).toArray();
    }
}
//# sourceMappingURL=ModuleRepository.js.map