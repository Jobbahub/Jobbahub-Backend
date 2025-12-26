import rateLimit from 'express-rate-limit';
import { Request } from 'express';

export const aiRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minuten
    max: 20, // Limiet van 20 requests per window
    message: {
        error: "Te veel verzoeken naar de AI-service. Probeer het later opnieuw."
    },
    standardHeaders: true, // Retourneer rate limit info in de `RateLimit-*` headers
    legacyHeaders: false, // Schakel de `X-RateLimit-*` headers uit
    validate: { trustProxy: false }, // suppress warning
    keyGenerator: (req: Request) => {
        // Gebruik gebruiker ID indien beschikbaar, anders IP, anders fallback
        return (req as any).user?.id || req.ip || "unknown";
    }
});
