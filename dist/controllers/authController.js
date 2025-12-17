import * as authService from '../services/authService.js';
export const register = async (req, res) => {
    try {
        const { naam, wachtwoord } = req.body;
        await authService.registerStudent(naam, wachtwoord);
        res.status(201).json({ message: "Student geregistreerd" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { naam, wachtwoord } = req.body;
        const student = await authService.loginStudent(naam, wachtwoord);
        res.json({ message: "Login succesvol", studentId: student._id });
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
};
//# sourceMappingURL=authController.js.map