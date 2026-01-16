import { jest, describe, test, expect, beforeEach } from '@jest/globals';

// ============================================
// MOCKS
// ============================================

const mockCompare = jest.fn<(data: string, encrypted: string) => Promise<boolean>>();
const mockGenSalt = jest.fn<(rounds?: number) => Promise<string>>();
const mockHash = jest.fn<(data: string, salt: string) => Promise<string>>();
const mockSign = jest.fn<(payload: object, secret: string, options?: object) => string>();

// Mongoose Model Mocks
const mockFindOne = jest.fn<(filter: object) => Promise<any>>();
const mockFindByIdAndUpdate = jest.fn<(id: string, update: any, options?: any) => Promise<any>>();
const mockSave = jest.fn<() => Promise<any>>();

// Mock module 'bcrypt'
jest.unstable_mockModule('bcrypt', () => ({
    default: {
        compare: mockCompare,
        genSalt: mockGenSalt,
        hash: mockHash,
    },
}));

// Mock module 'jsonwebtoken'
jest.unstable_mockModule('jsonwebtoken', () => ({
    default: {
        sign: mockSign,
    },
}));

// Mock Student Model
const MockStudentConstructor = jest.fn().mockImplementation((data: any) => ({
    ...data,
    save: mockSave,
}));
(MockStudentConstructor as any).findOne = mockFindOne;
(MockStudentConstructor as any).findByIdAndUpdate = mockFindByIdAndUpdate;

jest.unstable_mockModule('../../src/models/Student.js', () => ({
    default: MockStudentConstructor,
}));

// ============================================
// IMPORTS
// ============================================
// Dynamic import to pick up the mocks
const { loginStudent, registerStudent } = await import('../../src/services/authService.js');

// ============================================
// TESTS
// ============================================

describe('AuthService', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
        process.env.JWT_EXPIRES_IN = '1h';
    });

    describe('loginStudent', () => {
        test('geeft een error als de student niet wordt gevonden', async () => {
            mockFindOne.mockResolvedValue(null);

            await expect(loginStudent('niet@bestaat.nl', 'wachtwoord'))
                .rejects.toThrow('Gebruiker niet gevonden met dit e-mailadres');
        });

        test('geeft een error bij een foutief wachtwoord en verhoogt attempts', async () => {
            // Mock student met bestaande attempts
            const mockStudent = {
                _id: '123',
                email: 'test@test.com',
                wachtwoord: 'gehashed',
                loginAttempts: 0,
                lockUntil: 0
            };

            mockFindOne.mockResolvedValue(mockStudent);
            mockCompare.mockResolvedValue(false); // Wachtwoord fout

            // Verwacht dat hij update aanroept (attempts +1)
            mockFindByIdAndUpdate.mockResolvedValue({ ...mockStudent, loginAttempts: 1 });

            await expect(loginStudent('test@test.com', 'fout-wachtwoord'))
                .rejects.toThrow('Wachtwoord onjuist');

            expect(mockFindByIdAndUpdate).toHaveBeenCalled();
        });

        test('blokkeert account als het gelockt is', async () => {
            // Mock student die al gelockt is in de toekomst
            const mockStudent = {
                _id: '123',
                email: 'locked@test.com',
                wachtwoord: 'gehashed',
                loginAttempts: 5,
                lockUntil: Date.now() + 100000 // In de toekomst
            };

            mockFindOne.mockResolvedValue(mockStudent);

            await expect(loginStudent('locked@test.com', 'wachtwoord'))
                .rejects.toThrow(/tijdelijk geblokkeerd/);
        });

        test('geeft een student en token terug bij geldige login en reset attempts', async () => {
            const mockStudent = {
                _id: '123',
                email: 'test@test.com',
                wachtwoord: 'gehashed',
                loginAttempts: 1, // Had 1 fout
                lockUntil: 0
            };

            mockFindOne.mockResolvedValue(mockStudent);
            mockCompare.mockResolvedValue(true); // Wachtwoord goed
            mockSign.mockReturnValue('mocked-token');
            mockFindByIdAndUpdate.mockResolvedValue({ ...mockStudent, loginAttempts: 0 });

            const result = await loginStudent('test@test.com', 'goed-wachtwoord');

            expect(result.token).toBe('mocked-token');
            expect(result.student).toEqual(mockStudent);
            // Moet gereset zijn
            expect(mockFindByIdAndUpdate).toHaveBeenCalledWith('123', { $set: { loginAttempts: 0, lockUntil: 0 } });
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