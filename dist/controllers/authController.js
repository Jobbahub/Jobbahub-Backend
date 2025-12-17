import * as authService from '../services/authService.js';
export const register = async (req, res) => {
    try {
        // Zorg dat je hier ook email accepteert zoals in je eerdere code
        const { naam, email, wachtwoord } = req.body;
        if (!email)
            return res.status(400).json({ error: "Email is verplicht" });
        await authService.registerStudent(naam, email, wachtwoord);
        res.status(201).json({ message: "Student geregistreerd" });
    }
    catch (error) {
        res.status(400).json({ error: error.message || "Registratie mislukt" });
    }
};
export const login = async (req, res) => {
    try {
        // FIX: De frontend stuurt 'email' en 'password', dus dat lezen we hier uit
        const { email, password } = req.body;
        // We geven dit door aan de service (die passen we in Stap 2 aan)
        const { student, token } = await authService.loginStudent(email, password);
        res.json({
            message: "Login succesvol",
            token: token,
            user: {
                id: student._id,
                name: student.naam,
                email: student.email
            }
        });
    }
    catch (error) {
        console.error("Login fout:", error);
        res.status(401).json({ error: error.message || "Inloggen mislukt" });
    }
};
//# sourceMappingURL=authController.js.map