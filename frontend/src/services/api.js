// Use relative URL in production (nginx proxies to backend), absolute in development
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8000/api';

// Generic fetch wrapper with error handling
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.detail || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error [${endpoint}]:`, error);
        throw error;
    }
}

// Card APIs
export const cardAPI = {
    validate: (cardNumber) =>
        fetchAPI('/cards/validate', {
            method: 'POST',
            body: JSON.stringify({ card_number: cardNumber }),
        }),

    getTestCards: () => fetchAPI('/cards/test-cards'),
};

// Benefits APIs
export const benefitsAPI = {
    getByCardType: (cardType, category = null) => {
        const params = category ? `?category=${category}` : '';
        return fetchAPI(`/benefits/${cardType}${params}`);
    },

    getCategories: () => fetchAPI('/benefits/'),
};

// Offers APIs
export const offersAPI = {
    getNearby: (location = 'IIT Chennai', category = null, maxDistance = null) => {
        const params = new URLSearchParams();
        params.append('location', location);
        if (category) params.append('category', category);
        if (maxDistance) params.append('max_distance', maxDistance);
        return fetchAPI(`/offers/?${params.toString()}`);
    },

    getNearbyQuick: (maxDistance = 5) =>
        fetchAPI(`/offers/nearby?max_distance=${maxDistance}`),
};

// AI APIs
export const aiAPI = {
    summarize: (text, language = 'en') =>
        fetchAPI('/ai/summarize', {
            method: 'POST',
            body: JSON.stringify({ text, language }),
        }),

    translate: (text) =>
        fetchAPI('/ai/translate', {
            method: 'POST',
            body: JSON.stringify({ text }),
        }),

    recommend: (cardType, location = 'IIT Chennai', lifestyle = 'student', interests = []) =>
        fetchAPI('/ai/recommend', {
            method: 'POST',
            body: JSON.stringify({ card_type: cardType, location, lifestyle, interests }),
        }),

    getStatus: () => fetchAPI('/ai/status'),
};

// Health check
export const healthCheck = () => fetchAPI('/health');

export default {
    card: cardAPI,
    benefits: benefitsAPI,
    offers: offersAPI,
    ai: aiAPI,
    health: healthCheck,
};
