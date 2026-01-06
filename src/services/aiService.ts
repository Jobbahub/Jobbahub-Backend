import axios from 'axios';

const AI_MODEL_URL = process.env.AI_MODEL_URL;

export const getAIRecommendation = async (data: any) => {
    if (!AI_MODEL_URL || AI_MODEL_URL === 'error_no_url_provided') {
        throw new Error('AI Model is uitgeschakeld of niet geconfigureerd.');
    }

    try {
        console.log(`DEBUG: Calling AI Model at ${AI_MODEL_URL}...`);
        const response = await axios.post(AI_MODEL_URL, data, {
            timeout: 8000 // 8 seconden timeout
        });
        return response.data;
    } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
            throw new Error('AI Model reageert te traag (timeout).');
        }
        if (error.code === 'ECONNREFUSED' || error.response?.status === 404) {
            throw new Error(`Kan geen verbinding maken met het AI model op ${AI_MODEL_URL}.`);
        }
        throw new Error('Fout bij het ophalen van de aanbeveling: ' + (error.message || 'Onbekende fout'));
    }
};