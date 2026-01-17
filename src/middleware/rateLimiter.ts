import rateLimit from 'express-rate-limit';
import { Request } from 'express';

export const aiRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minuten
    max: 20, // Limiet van 20 requests per window
    message: {
        message: "RATE_LIMIT_EXCEEDED"
    },
    standardHeaders: true, // Retourneer rate limit info in de `RateLimit-*` headers
    legacyHeaders: false, // Schakel de `X-RateLimit-*` headers uit
    validate: false, // Disable all validations to prevent ERR_ERL_KEY_GEN_IPV6
    keyGenerator: (req: Request) => {
        // Gebruik gebruiker ID indien beschikbaar
        if ((req as any).user?.id) return (req as any).user.id;
        // Fallback naar IP, maar vervang IPv6 dubbele punten om validatie errors te voorkomen
        return (req.ip || "unknown_ip").replace(/:/g, '_');
    }
});
// Rate limiter specifiek voor login (IP based)
export const loginRateLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minuten window
    max: 3, // Max 3 login pogingen per IP per 3 minuten
    message: {
        message: "Te veel inlogpogingen vanaf dit IP adres. Probeer het later opnieuw."
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: false,
});
