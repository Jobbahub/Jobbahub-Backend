import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
// Update register functie om email mee te nemen
export const registerStudent = async (naam, email, wachtwoord) => {
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
export const loginStudent = async (email, wachtwoordInvoer) => {
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
    const token = jwt.sign({ id: student._id, email: student.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return { student, token };
};
//# sourceMappingURL=authService.js.map