import { jest, describe, test, expect, beforeEach } from '@jest/globals';

// ============================================
// MOCKS - Must be defined BEFORE dynamic imports
// ============================================

const mockCompare = jest.fn<(data: string, encrypted: string) => Promise<boolean>>();
const mockGenSalt = jest.fn<(rounds?: number) => Promise<string>>();
const mockHash = jest.fn<(data: string, salt: string) => Promise<string>>();
const mockSign = jest.fn<(payload: object, secret: string, options?: object) => string>();
const mockFindOne = jest.fn<(filter: object) => Promise<any>>();
const mockSave = jest.fn<() => Promise<any>>();

jest.unstable_mockModule('bcrypt', () => ({
    default: {
        compare: mockCompare,
        genSalt: mockGenSalt,
        hash: mockHash,
    },
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: mockSign,
    },
}));

// Mock Student as a constructor function with static methods
const MockStudentConstructor = jest.fn().mockImplementation((data: any) => ({
    ...data,
    save: mockSave,
}));
(MockStudentConstructor as any).findOne = mockFindOne;

jest.unstable_mockModule('../../src/models/Student.js', () => ({
    default: MockStudentConstructor,
}));

// ============================================
// IMPORTS - Must come AFTER jest.unstable_mockModule
// ============================================

const { loginStudent, registerStudent } = await import('../../src/services/authService.js');

// ============================================
// TESTS
// ============================================

describe('AuthService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
    });

    describe('loginStudent', () => {
        
        test('geeft een error als de student niet wordt gevonden', async () => {
            mockFindOne.mockResolvedValue(null);

            await expect(loginStudent('niet@bestaat.nl', 'wachtwoord'))
                .rejects.toThrow('Gebruiker niet gevonden met dit e-mailadres');
        });

        test('geeft een error bij een foutief wachtwoord', async () => {
            const mockStudent = {
            mockFindOne.mockResolvedValue({
                email: 'test@test.com',
                wachtwoord: 'gehashed',
                failedLoginAttempts: 0,
                lockoutUntil: null,
                _id: '123'
            };

            jest.spyOn(Student, 'findOne').mockResolvedValue(mockStudent as any);
            jest.spyOn(Student, 'findByIdAndUpdate').mockResolvedValue(mockStudent as any);
                wachtwoord: 'gehashed'
            });
            mockCompare.mockResolvedValue(false);

            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

            await expect(loginStudent('test@test.com', 'fout-wachtwoord')).rejects.toThrow(/Wachtwoord onjuist/);
            await expect(loginStudent('test@test.com', 'fout-wachtwoord'))
                .rejects.toThrow('Wachtwoord onjuist');
        });

        test('geeft een student en token terug bij geldige login', async () => {
            const mockStudent = {
                _id: '123',
                email: 'test@test.com',
                wachtwoord: 'gehashed',
                failedLoginAttempts: 0,
                lockUntil: null,
                save: jest.fn().mockImplementation(function (this: any) { return Promise.resolve(this); })
            };
            jest.spyOn(Student, 'findOne').mockResolvedValue(mockStudent as any);
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));
            jest.spyOn(jwt, 'sign').mockReturnValue('mocked-token' as any);
            const mockStudent = { 
                _id: '123', 
                email: 'test@test.com', 
                wachtwoord: 'gehashed' 
            };
            
            mockFindOne.mockResolvedValue(mockStudent);
            mockCompare.mockResolvedValue(true);
            mockSign.mockReturnValue('mocked-token');

            const result = await loginStudent('test@test.com', 'goed-wachtwoord');

            expect(result.token).toBe('mocked-token');
            expect(result.student).toEqual(mockStudent);
        });
    });

    describe('registerStudent', () => {
        
        test('hasht het wachtwoord en slaat de student op', async () => {
            mockGenSalt.mockResolvedValue('salt');
            mockHash.mockResolvedValue('gehashed_wachtwoord');
            mockSave.mockResolvedValue({
                naam: 'Jan',
                email: 'jan@test.nl',
                wachtwoord: 'gehashed_wachtwoord'
            });

            await registerStudent('Jan', 'jan@test.nl', 'wachtwoord123');

            expect(mockGenSalt).toHaveBeenCalled();
            expect(mockHash).toHaveBeenCalledWith('wachtwoord123', 'salt');
            expect(mockSave).toHaveBeenCalled();
        });
    });
});