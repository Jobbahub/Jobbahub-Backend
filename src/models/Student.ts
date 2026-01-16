// src/models/Student.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  naam: string;
  email: string;
  wachtwoord: string;
  favorieten: any[];
  vragenlijst_resultaten?: {
    antwoorden: any;           // De ruwe data van de vragenlijst
    aanbevelingen?: {
      name: string;
      match_percentage: number;
      waarom: string;
      studycredit: number;
      category_scores?: any; // Map or Object
    }[];
    cluster_suggesties?: {
      name: string;
      popularity_score: number;
      waarom: string;
    }[];
  };
}

const StudentSchema: Schema = new Schema({
  naam: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  wachtwoord: { type: String, required: true },
  favorieten: [{
    module_id: { type: String, required: true },
    toegevoegd_op: { type: Date, default: Date.now }
  }],
  vragenlijst_resultaten: {
    antwoorden: { type: Schema.Types.Mixed },
    aanbevelingen: [{
      name: String,
      match_percentage: Number,
      waarom: String,
      studycredit: Number,
      category_scores: { type: Schema.Types.Mixed } // Use Mixed to accept plain object or Map
    }],
    cluster_suggesties: [{
      name: String,
      popularity_score: Number,
      waarom: String
    }]
  }
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;