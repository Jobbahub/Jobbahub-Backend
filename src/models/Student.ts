// src/models/Student.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  naam: string;
  email: string;
  wachtwoord: string;
  favorieten: any[];
  vragenlijst_resultaten?: {
    gekozen_filters: string[]; // Bijv: ["Technologie, Data & Engineering", "Business, Recht & Management"]
    antwoorden: any;           // De ruwe data van de vragenlijst
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
    gekozen_filters: [{ type: String }],
    antwoorden: { type: Schema.Types.Mixed } 
  }
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student;