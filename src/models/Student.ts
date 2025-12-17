// src/models/Student.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document { // Vergeet 'export' hier niet!
  naam: string;
  wachtwoord: string;
  favorieten: any[]; 
}

const StudentSchema: Schema = new Schema({
  naam: { type: String, required: true, unique: true },
  wachtwoord: { type: String, required: true },
  favorieten: [{ 
    module_id: { type: String, required: true }, 
    toegevoegd_op: { type: Date, default: Date.now } 
  }]
});

const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student; // Zorg dat dit er staat!