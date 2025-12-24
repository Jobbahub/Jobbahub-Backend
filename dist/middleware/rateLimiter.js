import rateLimit from 'express-rate-limit';
export const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minuten
    max: 1, // Limiet van 10 requests per window
    message: {
        error: "Te veel verzoeken naar de AI-service. Probeer het later opnieuw."
    },
    standardHeaders: true, // Retourneer rate limit info in de `RateLimit-*` headers
    legacyHeaders: false, // Schakel de `X-RateLimit-*` headers uit
    keyGenerator: (req) => {
        // Gebruik gebruiker ID indien beschikbaar, anders IP
        // we casten naar any omdat user dynamisch wordt toegevoegd door auth middleware
        return req.user?.id || req.ip;
    }
});
//# sourceMappingURL=rateLimiter.js.map