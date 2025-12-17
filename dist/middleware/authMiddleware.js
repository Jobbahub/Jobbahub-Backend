import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Pakt de token na 'Bearer'
    if (!token) {
        return res.status(401).json({ error: "Toegang geweigerd. Geen token gevonden." });
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Sla de student info op in het request object
        next(); // Ga door naar de controller
    }
    catch (err) {
        res.status(400).json({ error: "Ongeldige token." });
    }
};
//# sourceMappingURL=authMiddleware.js.map