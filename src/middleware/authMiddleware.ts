import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Pakt de token na 'Bearer'

  if (!token) {
    console.log('DEBUG: No token found. Authorization header:', req.header('Authorization'));
    return res.status(401).json({ error: "Toegang geweigerd. Geen token gevonden." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = verified; // Sla de student info op in het request object
    next(); // Ga door naar de controller
  } catch (err: any) {
    console.log('DEBUG: Token verification error:', err.message);
    res.status(400).json({ error: "Ongeldige token." });
  }
};