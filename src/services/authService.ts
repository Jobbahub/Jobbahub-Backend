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
  const student = await Student.findOne({ email: { $eq: email } });

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

// NEW: Change credentials (email, password, naam)
export const changeCredentials = async (
  studentId: string,
  currentPassword: string,
  updates: {
    newEmail?: string;
    newPassword?: string;
    newNaam?: string;
  }
): Promise<IStudent> => {
  // 1. Find the student
  const student = await Student.findById(studentId);
  if (!student) {
    throw new Error('Gebruiker niet gevonden');
  }

  // 2. Verify current password
  const isPasswordCorrect = await bcrypt.compare(currentPassword, student.wachtwoord);
  if (!isPasswordCorrect) {
    throw new Error('Huidig wachtwoord is onjuist');
  }

  // 3. Prepare update object
  const updateData: any = {};

  // Update email if provided
  if (updates.newEmail) {
    // Check if new email is already in use
    const emailExists = await Student.findOne({
      email: updates.newEmail.toLowerCase(),
      _id: { $ne: studentId } // Exclude current student
    });

    if (emailExists) {
      throw new Error('Dit e-mailadres is al in gebruik');
    }

    updateData.email = updates.newEmail.toLowerCase();
  }

  // Update password if provided
  if (updates.newPassword) {
    // Validate password strength (min 6 characters)
    if (updates.newPassword.length < 6) {
      throw new Error('Nieuw wachtwoord moet minimaal 6 tekens lang zijn');
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    updateData.wachtwoord = await bcrypt.hash(updates.newPassword, salt);
  }

  // Update naam if provided
  if (updates.newNaam) {
    // Check if new naam is already in use
    const naamExists = await Student.findOne({
      naam: updates.newNaam,
      _id: { $ne: studentId } // Exclude current student
    });

    if (naamExists) {
      throw new Error('Deze gebruikersnaam is al in gebruik');
    }

    updateData.naam = updates.newNaam;
  }

  // 4. Update the student
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