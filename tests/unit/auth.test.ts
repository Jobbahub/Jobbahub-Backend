import { jest } from '@jest/globals';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginStudent, registerStudent } from '../../src/services/authService.js';
import Student from '../../src/models/Student.js';

describe('AuthService', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('loginStudent', () => {
        test('geeft een error als de student niet wordt gevonden', async () => {
            jest.spyOn(Student, 'findOne').mockResolvedValue(null);

            await expect(loginStudent('niet@bestaat.nl', 'wachtwoord')).rejects.toThrow('Gebruiker niet gevonden met dit e-mailadres');
        });

        test('geeft een error bij een foutief wachtwoord', async () => {
            jest.spyOn(Student, 'findOne').mockResolvedValue({
                email: 'test@test.com',
                wachtwoord: 'gehashed'
            } as any);

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(loginStudent('test@test.com', 'fout-wachtwoord')).rejects.toThrow('Wachtwoord onjuist');
        });

        test('geeft een student en token terug bij geldige login', async () => {
            const mockStudent = { _id: '123', email: 'test@test.com', wachtwoord: 'gehashed' };
            jest.spyOn(Student, 'findOne').mockResolvedValue(mockStudent as any);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
            jest.spyOn(jwt, 'sign').mockReturnValue('mocked-token' as any);

            process.env.JWT_SECRET = 'test-secret';
            const result = await loginStudent('test@test.com', 'goed-wachtwoord');

            expect(result.token).toBe('mocked-token');
            expect(result.student).toEqual(mockStudent);
        });
    });

    describe('registerStudent', () => {
        test('hasht het wachtwoord en slaat de student op', async () => {
            jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => Promise.resolve('salt' as any));
            jest.spyOn(bcrypt, 'hash').mockImplementation(() => Promise.resolve('gehashed_wachtwoord' as any));

            const saveMock = jest.fn().mockImplementation(function (this: any) {
                return Promise.resolve(this);
            });
            jest.spyOn(Student.prototype, 'save').mockImplementation(saveMock);

            await registerStudent('Jan', 'jan@test.nl', 'wachtwoord123');

            expect(bcrypt.hash).toHaveBeenCalledWith('wachtwoord123', 'salt');
            // We can't easily check if saveMock was called because we're spying on prototype
            // and the call happens on a new instance. But spyOn(Student.prototype, 'save') should catch it.
            expect(Student.prototype.save).toHaveBeenCalled();
        });
    });
});
