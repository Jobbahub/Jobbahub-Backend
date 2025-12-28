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
