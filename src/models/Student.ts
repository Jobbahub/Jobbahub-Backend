// src/models/Student.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  naam: string;
  email: string;
  wachtwoord: string;
  favorieten: any[];
  vragenlijst_resultaten?: {
    antwoorden: any;
    aanbevelingen?: {
      name: string;
      match_percentage: number;
      waarom: string;
      studycredit: number;
      category_scores?: any;
    }[];
    cluster_suggesties?: {
      name: string;
      popularity_score: number;
      waarom: string;
    }[];
  };
  // Account lockout velden
  failedLoginAttempts: number;
  lockoutUntil: Date | null;
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
      category_scores: { type: Schema.Types.Mixed }
    }],
    cluster_suggesties: [{
      name: String,
      popularity_score: Number,
      waarom: String
    }]
  },
  // Account lockout
  failedLoginAttempts: { type: Number, default: 0 },
  lockoutUntil: { type: Date, default: null }
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
