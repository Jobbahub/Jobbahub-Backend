import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Student from '../models/Student.js';
export const registerStudent = async (naam, wachtwoord) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(wachtwoord, salt);
    const nieuweStudent = new Student({
        naam,
        wachtwoord: hashedPassword,
        favorieten: []
    });
    return await nieuweStudent.save();
};
export const loginStudent = async (naam, wachtwoord) => {
    const student = await Student.findOne({ naam });
    if (!student)
        throw new Error('Student niet gevonden');
    const isMatch = await bcrypt.compare(wachtwoord, student.wachtwoord);
    if (!isMatch)
        throw new Error('Wachtwoord onjuist');
    // Genereer de JWT token
    const token = jwt.sign({ id: student._id, naam: student.naam }, process.env.JWT_SECRET, { expiresIn: '24h' } // Token is 24 uur geldig
    );
    return { student, token };
};
//# sourceMappingURL=authService.js.map