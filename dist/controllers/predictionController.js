import * as aiService from '../services/aiService.js';
export const getRecommendation = async (req, res) => {
    try {
        const result = await aiService.getAIRecommendation(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=predictionController.js.map