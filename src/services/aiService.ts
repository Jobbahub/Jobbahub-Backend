import axios from 'axios';

const AI_MODEL_URL = process.env.AI_MODEL_URL;

export const getAIRecommendation = async (data: any) => {
    if (!AI_MODEL_URL || AI_MODEL_URL === 'error_no_url_provided') {
        throw new Error('AI Model is uitgeschakeld of niet geconfigureerd.');
    }

    try {
        const response = await axios.post(AI_MODEL_URL, data);
        return response.data;
    } catch (error: any) {
        if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
            throw new Error('Kan geen verbinding maken met het AI model.');
        }
        throw new Error('Fout bij het ophalen van de aanbeveling: ' + (error.message || 'Onbekende fout'));
    }
};