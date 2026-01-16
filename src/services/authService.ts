import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import Student, { IStudent } from '../models/Student.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 minuten

export const registerStudent = async (naam: string, email: string, wachtwoord: string): Promise<IStudent> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(wachtwoord, salt);

  const nieuweStudent = new Student({
    naam,
    email,
    wachtwoord: hashedPassword,
    favorieten: [],
    failedLoginAttempts: 0,
    lockoutUntil: null
  });

  return await nieuweStudent.save();
};

export const loginStudent = async (email: string, wachtwoordInvoer: string) => {
  const student = await Student.findOne({ email: { $eq: email } });

  if (!student) {
    throw new Error('Gebruiker niet gevonden met dit e-mailadres');
  }

  // Check lockout status
  if (student.lockoutUntil && student.lockoutUntil > new Date()) {
    const remainingMinutes = Math.ceil((student.lockoutUntil.getTime() - Date.now()) / 60000);
    throw new Error(`Account tijdelijk vergrendeld. Probeer het over ${remainingMinutes} minuten opnieuw.`);
  }

  const isMatch = await bcrypt.compare(wachtwoordInvoer, student.wachtwoord);
  
  if (!isMatch) {
    const failedAttempts = (student.failedLoginAttempts || 0) + 1;
    const updateData: any = { failedLoginAttempts: failedAttempts };
    
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
      updateData.lockoutUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
      await Student.findByIdAndUpdate(student._id, updateData);
      throw new Error(`Te veel mislukte pogingen. Account vergrendeld voor 30 minuten.`);
    }
    
    await Student.findByIdAndUpdate(student._id, updateData);
    throw new Error(`Wachtwoord onjuist. Nog ${MAX_FAILED_ATTEMPTS - failedAttempts} pogingen over.`);
  }

  // Reset failed attempts on successful login
  if (student.failedLoginAttempts > 0 || student.lockoutUntil) {
    await Student.findByIdAndUpdate(student._id, {
      failedLoginAttempts: 0,
      lockoutUntil: null
    });
  }

  // Generate token met uitgebreide claims
  const token = jwt.sign(
    { 
      id: student._id, 
      email: student.email,
      jti: crypto.randomUUID(),
      iss: 'jobbahub-api',
      aud: 'jobbahub-client'
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
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

export const changeCredentials = async (
  studentId: string,
  currentPassword: string,
  updates: {
    newEmail?: string;
    newPassword?: string;
    newNaam?: string;
  }
): Promise<IStudent> => {
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error('Gebruiker niet gevonden');
  }

  const isPasswordCorrect = await bcrypt.compare(currentPassword, student.wachtwoord);
  if (!isPasswordCorrect) {
    throw new Error('Huidig wachtwoord is onjuist');
  }

  const updateData: any = {};

  if (updates.newEmail) {
    const emailExists = await Student.findOne({
      email: updates.newEmail.toLowerCase(),
      _id: { $ne: studentId }
    });

    if (emailExists) {
      throw new Error('Dit e-mailadres is al in gebruik');
    }

    updateData.email = updates.newEmail.toLowerCase();
  }

  if (updates.newPassword) {
    if (updates.newPassword.length < 8) {
      throw new Error('Nieuw wachtwoord moet minimaal 8 tekens lang zijn');
    }

    const salt = await bcrypt.genSalt(10);
    updateData.wachtwoord = await bcrypt.hash(updates.newPassword, salt);
  }

  if (updates.newNaam) {
    const naamExists = await Student.findOne({
      naam: updates.newNaam,
      _id: { $ne: studentId }
    });

    if (naamExists) {
      throw new Error('Deze gebruikersnaam is al in gebruik');
    }

    updateData.naam = updates.newNaam;
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    studentId,
    updateData,
    { new: true }
  ).select('-wachtwoord');

  if (!updatedStudent) {
    throw new Error('Fout bij het bijwerken van gebruikersgegevens');
  }

  return updatedStudent;
};
