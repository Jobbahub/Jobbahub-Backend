import rateLimit from 'express-rate-limit';
import { Request } from 'express';

export const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuten
    max: 20, // Limiet van 20 requests per window
    message: {
        error: "Te veel verzoeken naar de AI-service. Probeer het later opnieuw."
    },
    standardHeaders: true, // Retourneer rate limit info in de `RateLimit-*` headers
    legacyHeaders: false, // Schakel de `X-RateLimit-*` headers uit
    keyGenerator: (req: Request) => {
        // Gebruik gebruiker ID indien beschikbaar, anders IP
        // we casten naar any omdat user dynamisch wordt toegevoegd door auth middleware
        return (req as any).user?.id || req.ip;
    }
});
