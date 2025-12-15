import mongoose from 'mongoose';
const ModuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortdescription: String,
    description: String,
    studycredit: Number,
    location: String,
    level: String,
    Rood: Number,
    Groen: Number,
    Blauw: Number,
    Geel: Number,
    module_tags: String,
    start_date: Date,
});
const ModuleModel = mongoose.model('Module', ModuleSchema, 'Keuzemodules');
export default ModuleModel;
//# sourceMappingURL=module.js.map