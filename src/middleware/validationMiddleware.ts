import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import mongoose from 'mongoose';

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

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const answersSchema = Joi.object({
    keuze_taal: Joi.string().allow(null),
    keuze_locatie: Joi.string().allow(null),
    keuze_punten: Joi.number().allow(null),

    knoppen_input: Joi.object().pattern(
        Joi.string().regex(/^q_/),
        Joi.object({
            score: Joi.number().min(-1).max(1).required()
        })
    ).required()
}).unknown(true);

const surveySchema = Joi.object({
    antwoorden: answersSchema.required(),
    aanbevelingen: Joi.array().items(Joi.object()).optional(),
    cluster_suggesties: Joi.array().items(Joi.object()).optional()
}).unknown(true);

const registerSchema = Joi.object({
    naam: Joi.string().min(2).max(50).required().messages({
        'string.min': 'Gebruikersnaam moet minimaal 2 tekens bevatten',
        'string.max': 'Gebruikersnaam mag maximaal 50 tekens bevatten',
        'any.required': 'Gebruikersnaam is verplicht'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Voer een geldig e-mailadres in',
        'any.required': 'E-mail is verplicht'
    }),
    wachtwoord: Joi.string()
        .min(8)
        .pattern(strongPasswordRegex)
        .required()
        .messages({
            'string.min': 'Wachtwoord moet minimaal 8 tekens bevatten',
            'string.pattern.base': 'Wachtwoord moet minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken (@$!%*?&) bevatten',
            'any.required': 'Wachtwoord is verplicht'
        })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'Voer een geldig e-mailadres in',
        'any.required': 'E-mail is verplicht'
    }),
    wachtwoord: Joi.string().min(8).required().messages({
        'string.min': 'Wachtwoord moet minimaal 8 tekens bevatten',
        'any.required': 'Wachtwoord is verplicht'
    })
});

const changeCredentialsSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'any.required': 'Huidig wachtwoord is verplicht'
    }),
    newEmail: Joi.string().email().optional().messages({
        'string.email': 'Voer een geldig e-mailadres in'
    }),
    newPassword: Joi.string()
        .min(8)
        .pattern(strongPasswordRegex)
        .optional()
        .messages({
            'string.min': 'Nieuw wachtwoord moet minimaal 8 tekens bevatten',
            'string.pattern.base': 'Wachtwoord moet minimaal 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken bevatten'
        }),
    newNaam: Joi.string().min(2).max(50).optional()
});

export const validateObjectId = (paramName: string = 'id') => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[paramName];
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 'error',
                message: 'Ongeldig ID formaat',
                details: [`${paramName} moet een geldig ID zijn`]
            });
        }
        next();
    };
};

const batchIdsSchema = Joi.object({
    ids: Joi.string().required().custom((value, helpers) => {
        const ids = value.split(',');
        for (const id of ids) {
            if (!mongoose.Types.ObjectId.isValid(id.trim())) {
                return helpers.error('any.invalid');
            }
        }
        return value;
    }).messages({
        'any.required': 'IDs parameter is verplicht',
        'any.invalid': 'Een of meer IDs zijn ongeldig'
    })
});

export const validateBatchIds = (req: Request, res: Response, next: NextFunction) => {
    const { error } = batchIdsSchema.validate({ ids: req.query.ids });
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validatiefout',
            details: error.details.map(d => d.message)
        });
    }
    next();
};

const addFavoriteSchema = Joi.object({
    moduleId: Joi.string().required().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }).messages({
        'any.required': 'moduleId is verplicht',
        'any.invalid': 'moduleId moet een geldig ID zijn'
    })
});

export const validateAddFavorite = (req: Request, res: Response, next: NextFunction) => {
    const { error } = addFavoriteSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Validatiefout',
            details: error.details.map(d => d.message)
        });
    }
    next();
};

const aiRecommendSchema = Joi.object({
    antwoorden: Joi.object().required(),
    preferences: Joi.object().optional()
});

export const validateAIRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = aiRecommendSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Ongeldige AI request',
            details: error.details.map(d => d.message)
        });
    }
    next();
};

export const validateSurvey = (req: Request, res: Response, next: NextFunction) => validate(surveySchema, req, res, next);
export const validateRegister = (req: Request, res: Response, next: NextFunction) => validate(registerSchema, req, res, next);
export const validateLogin = (req: Request, res: Response, next: NextFunction) => validate(loginSchema, req, res, next);
export const validateChangeCredentials = (req: Request, res: Response, next: NextFunction) => validate(changeCredentialsSchema, req, res, next);
