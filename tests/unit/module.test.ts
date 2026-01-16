import { jest } from '@jest/globals';
import { ModuleService } from '../../src/services/moduleService.js';

describe('ModuleService', () => {
    let moduleService: ModuleService;
    let mockRepository: any;

    beforeEach(() => {
        // Handmatige mock van de repository
        mockRepository = {
            getAllModules: jest.fn(),
            getModuleById: jest.fn(),
            getModulesByIds: jest.fn(),
        };

        moduleService = new ModuleService();
        // Injecteer de mock in de private property
        (moduleService as any).moduleRepository = mockRepository;
    });

    test('getAllModules haalt alle modules op uit de repository', async () => {
        const mockModules = [{ id: 1, name: 'Test Module' }];
        mockRepository.getAllModules.mockResolvedValue(mockModules);

        const result = await moduleService.getAllModules();

        expect(result).toEqual(mockModules);
        expect(mockRepository.getAllModules).toHaveBeenCalledTimes(1);
    });

    test('getModuleById geeft een error als de module niet bestaat', async () => {
        mockRepository.getModuleById.mockResolvedValue(null);

        await expect(moduleService.getModuleById(999)).rejects.toThrow('Module niet gevonden');
    });
});
