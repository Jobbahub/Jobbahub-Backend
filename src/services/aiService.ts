import axios from 'axios';

const AI_MODEL_URL = process.env.AI_MODEL_URL || 'error_no_url_provided';
export const getAIRecommendation = async (data: any) => {
    try {
        const response = await axios.post(AI_MODEL_URL, data);
        return response.data;
    } catch (error) {
        throw new Error('Fout bij het ophalen van de aanbeveling');
    }
};