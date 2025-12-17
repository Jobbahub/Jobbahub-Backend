import * as favoriteService from '../services/favoriteService.js';
export const addFavorite = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { module_id } = req.body;
        // Controleer of studentId bestaat
        if (!studentId) {
            return res.status(400).json({ error: "Student ID is verplicht in de URL" });
        }
        if (!module_id) {
            return res.status(400).json({ error: "module_id is verplicht in de body" });
        }
        // TypeScript weet nu dat studentId 100% een string is
        const student = await favoriteService.addModuleToFavorites(studentId, module_id);
        res.json({
            message: "Favoriet toegevoegd!",
            favorieten: student.favorieten
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const removeFavorite = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { module_id } = req.body;
        // VOEG DEZE CHECK TOE:
        if (!studentId) {
            return res.status(400).json({ error: "Student ID is verplicht in de URL" });
        }
        if (!module_id) {
            return res.status(400).json({ error: "module_id is verplicht in de body" });
        }
        const student = await favoriteService.removeModuleFromFavorites(studentId, module_id);
        res.json({
            message: "Favoriet verwijderd",
            favorieten: student.favorieten
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const getFavorites = async (req, res) => {
    try {
        const { studentId } = req.params;
        if (!studentId)
            return res.status(400).json({ error: "ID nodig" });
        const favorites = await favoriteService.getStudentWithFavorites(studentId);
        res.json(favorites);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
};
//# sourceMappingURL=favoritesController.js.map