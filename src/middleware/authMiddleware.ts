import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Toegang geweigerd. Geen token gevonden." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET as string, {
      issuer: 'jobbahub-api',
      audience: 'jobbahub-client'
    });
    (req as any).user = verified;
    next();
  } catch (err: any) {
    res.status(400).json({ error: "Ongeldige token." });
  }
};
