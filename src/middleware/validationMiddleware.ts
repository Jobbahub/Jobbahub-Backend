// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Helper om Joi validatie uit te voeren
const validate = (schema: Joi.ObjectSchema, req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validatiefout',
            details: error.details.map(d => d.message)
        });
    }
    next();
};

// 1. Schema voor de Vragenlijst
const surveySchema = Joi.object({
    keuze_taal: Joi.string().allow(null),
    keuze_locatie: Joi.string().allow(null),
    keuze_punten: Joi.number().allow(null),
    open_antwoord: Joi.string().allow(''),
    knoppen_input: Joi.object().pattern(
        Joi.string().regex(/^q_/), // Moet beginnen met q_
        Joi.object({
            score: Joi.number().min(0).max(5).required(),
            weight: Joi.number().min(0).required()
        })
    ).required()
});

// 2. Schema voor de Login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Voer een geldig e-mailadres in',
        'any.required': 'E-mail is verplicht'
    }),
    wachtwoord: Joi.string().min(6).required().messages({
        'string.min': 'Wachtwoord moet minimaal 6 tekens bevatten',
        'any.required': 'Wachtwoord is verplicht'
    })
});

// Middleware functies om te exporteren
export const validateSurvey = (req: Request, res: Response, next: NextFunction) => validate(surveySchema, req, res, next);
export const validateLogin = (req: Request, res: Response, next: NextFunction) => validate(loginSchema, req, res, next);