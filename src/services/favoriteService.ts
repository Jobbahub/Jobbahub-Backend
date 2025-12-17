import Student from '../models/Student.js';

export const getFavorites = async (studentId: string) => {
  const student = await Student.findById(studentId);
  if (!student) throw new Error('Student niet gevonden');
  return student.favorieten;
};

export const addFavorite = async (studentId: string, moduleId: string) => {
  // $addToSet voegt alleen toe als het er nog niet in staat (geen dubbele)
  const student = await Student.findByIdAndUpdate(
    studentId,
    { $addToSet: { favorieten: { module_id: moduleId } } },
    { new: true } // Geeft de geüpdatete student terug
  );

  if (!student) throw new Error('Student niet gevonden');
  return student;
};

export const removeFavorite = async (studentId: string, moduleId: string) => {
  // $pull verwijdert het item uit de array dat matcht
  const student = await Student.findByIdAndUpdate(
    studentId,
    { $pull: { favorieten: { module_id: moduleId } } },
    { new: true }
  );

  if (!student) throw new Error('Student niet gevonden');
  return student;
};