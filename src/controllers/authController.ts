import { Request, Response } from 'express';
import * as authService from '../services/authService.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { naam, email, wachtwoord } = req.body; // email toegevoegd
    
    if (!email) return res.status(400).json({ error: "Email is verplicht" });

    await authService.registerStudent(naam, email, wachtwoord);
    res.status(201).json({ message: "Student geregistreerd" });
  } catch (error: any) {
    res.status(400).json({ error: "Registratie mislukt. Email bestaat al?" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { naam, wachtwoord } = req.body;
    const { student, token } = await authService.loginStudent(naam, wachtwoord);
    
    res.json({ 
      message: "Login succesvol", 
      token: token, // De frontend slaat dit op
      studentId: student._id 
    });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};