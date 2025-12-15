import { Schema, model, Document } from 'mongoose';

// 1. TypeScript Interface, gebaseerd op de MongoDB structuur
export interface IModule extends Document {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  content: string;
  studycredit: number;
  location: string;
  contact_id: number;
  level: string; // Bijv. 'NLQF5'
  learningOutcomes: string;
  module_tags: string[]; // Lijst van strings (array)
  interests_match_score: number;
  popularity_score: number;
  estimated_difficulty: number;
  available_spots: number;
  start_date: Date;
  
}

// 2. Mongoose Schema
const ModuleSchema: Schema = new Schema({
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
// De naam 'Module' wordt de collection 'Keuzemodules' in MongoDB
const Module = model<IModule>('Module', ModuleSchema, 'Keuzemodules'); 

export default Module;