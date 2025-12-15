import { Schema, model, Document } from 'mongoose';
// 2. Mongoose Schema
const ModuleSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    content: { type: String },
    studycredit: { type: Number },
    location: { type: String },
    contact_id: { type: Number },
    level: { type: String },
    learningOutcomes: { type: String },
    module_tags: { type: [String] },
    interests_match_score: { type: Number },
    popularity_score: { type: Number },
    estimated_difficulty: { type: Number },
    available_spots: { type: Number },
    start_date: { type: Date },
});
// 3. Mongoose Model
// De naam 'Module' wordt de collection 'modules' in MongoDB
const Module = model('Module', ModuleSchema);
export default Module;
//# sourceMappingURL=module.js.map