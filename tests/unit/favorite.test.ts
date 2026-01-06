import { jest } from '@jest/globals';
import Student from '../../src/models/Student.js';
import { addFavorite } from '../../src/services/favoriteService.js';

describe('FavoriteService', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    describe('addFavorite', () => {
        test('voegt een module toe aan favorieten met $addToSet', async () => {
            const mockStudent = { _id: 'user123', favorieten: [] };
            // Gebruik spyOn in plaats van jest.mock voor ESM compatibiliteit
            jest.spyOn(Student, 'findByIdAndUpdate').mockResolvedValue(mockStudent as any);

            const result = await addFavorite('user123', 'mod99');

            expect(Student.findByIdAndUpdate).toHaveBeenCalledWith(
                'user123',
                { $addToSet: { favorieten: { module_id: 'mod99' } } },
                { new: true }
            );
            expect(result).toEqual(mockStudent);
        });

        test('geeft een error als de student niet bestaat', async () => {
            jest.spyOn(Student, 'findByIdAndUpdate').mockResolvedValue(null as any);

            await expect(addFavorite('onbekend', 'mod1')).rejects.toThrow('Student niet gevonden');
        });
    });
});
