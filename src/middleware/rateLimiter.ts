import rateLimit from 'express-rate-limit';
import { Request } from 'express';

export const aiRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minuut
    max: 20, // Zeer lage limiet voor test: 20 requests per minuut
    message: {
        message: "RATE_LIMIT_EXCEEDED"
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: false,
    keyGenerator: (req: Request) => {
        if ((req as any).user?.id) return (req as any).user.id;
        return (req.ip || "unknown_ip").replace(/:/g, '_');
    }
});

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5, // Verhoogd voor load test scenario
    message: {
        error: "Te veel login pogingen. Probeer het over 15 minuten opnieuw.",
        code: "AUTH_RATE_LIMIT_EXCEEDED"
    },
    standardHeaders: true,
    legacyHeaders: false,
    validate: false,
    skipSuccessfulRequests: true,
    keyGenerator: (req: Request) => {
        const email = typeof req.body?.email === 'string' ? req.body.email.toLowerCase() : 'invalid';
        const ip = (req.ip || "unknown_ip").replace(/:/g, '_');
        return `${ip}:${email}`;
    }
});

// export const apiRateLimiter = rateLimit({
//     windowMs: 1 * 60 * 1000,
//     max: 100,
//     message: {
//         error: "Te veel requests. Even wachten alsjeblieft.",
//         code: "API_RATE_LIMIT_EXCEEDED"
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// });
