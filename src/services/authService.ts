import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student, { IStudent } from '../models/Student.js';

// Update register functie om email mee te nemen
export const registerStudent = async (naam: string, email: string, wachtwoord: string): Promise<IStudent> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(wachtwoord, salt);

  const nieuweStudent = new Student({
    naam,
    email, // Sla het emailadres op
    wachtwoord: hashedPassword,
    favorieten: []
  });

  return await nieuweStudent.save();
};

// Update login functie om te zoeken op email
export const loginStudent = async (email: string, wachtwoordInvoer: string) => {
  // 1. Zoek op EMAIL in plaats van NAAM
  const student = await Student.findOne({ email });

  if (!student) {
    throw new Error('Gebruiker niet gevonden met dit e-mailadres');
  }

  // 2. Check wachtwoord
  const isMatch = await bcrypt.compare(wachtwoordInvoer, student.wachtwoord);
  if (!isMatch) {
    throw new Error('Wachtwoord onjuist');
  }

  // 3. Genereer token
  const token = jwt.sign(
    { id: student._id, email: student.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '24h' }
  );

  return { student, token };
};

export const saveQuestionnaireResults = async (studentId: string, data: any) => {
  return await Student.findByIdAndUpdate(studentId, {
    $set: { vragenlijst_resultaten: data }
  }, { new: true });
};

export const deleteQuestionnaireResults = async (studentId: string) => {
  return await Student.findByIdAndUpdate(studentId, {
    $unset: { vragenlijst_resultaten: 1 }
  }, { new: true });
};

export const getStudentById = async (studentId: string) => {
  return await Student.findById(studentId).select('-wachtwoord');
};