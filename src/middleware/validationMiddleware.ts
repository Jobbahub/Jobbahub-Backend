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
// 1. Schema voor de Vragenlijst antwoorden (nested object)
const answersSchema = Joi.object({
    keuze_taal: Joi.string().allow(null),
    keuze_locatie: Joi.string().allow(null),
    keuze_punten: Joi.number().allow(null),
    open_antwoord: Joi.string().allow('').allow(null),
    knoppen_input: Joi.object().pattern(
        Joi.string().regex(/^q_/),
        Joi.object({
            score: Joi.number().min(-1).max(5).required()
        })
    ).required()
}).unknown(true);

// Schema voor de volledige payload (inclusief aanbevelingen etc.)
const surveySchema = Joi.object({
    antwoorden: answersSchema.required(),
    // We valideren aanbevelingen en clusters niet strikt, maar we staan ze wel toe
    aanbevelingen: Joi.array().items(Joi.object()).optional(),
    cluster_suggesties: Joi.array().items(Joi.object()).optional()
}).unknown(true);

// 2. Schema voor de Register
const registerSchema = Joi.object({
    naam: Joi.string().required().messages({
        'any.required': 'Gebruikersnaam is verplicht'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Voer een geldig e-mailadres in',
        'any.required': 'E-mail is verplicht'
    }),
    wachtwoord: Joi.string().min(6).required().messages({
        'string.min': 'Wachtwoord moet minimaal 6 tekens bevatten',
        'any.required': 'Wachtwoord is verplicht'
    })
}).unknown(true);

// 3. Schema voor de Login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Voer een geldig e-mailadres in',
        'any.required': 'E-mail is verplicht'
    }),
    wachtwoord: Joi.string().min(6).required().messages({
        'string.min': 'Wachtwoord moet minimaal 6 tekens bevatten',
        'any.required': 'Wachtwoord is verplicht'
    })
}).unknown(true);

// 4. Schema voor het veranderen van credentials
const changeCredentialsSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Huidig wachtwoord is verplicht'
    }),
    newEmail: Joi.string().email().optional().messages({
        'string.email': 'Voer een geldig e-mailadres in'
    }),
    newPassword: Joi.string().min(6).optional().messages({
        'string.min': 'Nieuw wachtwoord moet minimaal 6 tekens bevatten'
    }),
    newNaam: Joi.string().optional()
}).unknown(true);

// Middleware functies om te exporteren
export const validateSurvey = (req: Request, res: Response, next: NextFunction) => validate(surveySchema, req, res, next);
export const validateRegister = (req: Request, res: Response, next: NextFunction) => validate(registerSchema, req, res, next);
export const validateLogin = (req: Request, res: Response, next: NextFunction) => validate(loginSchema, req, res, next);
export const validateChangeCredentials = (req: Request, res: Response, next: NextFunction) => validate(changeCredentialsSchema, req, res, next);