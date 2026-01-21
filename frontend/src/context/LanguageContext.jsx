import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

// Translations
const translations = {
    en: {
        // Header
        appTitle: 'Visa Benefits AI Agent',
        appSubtitle: 'Discover your card benefits with AI-powered insights',

        // Card Input
        enterCard: 'Enter Your Card Number',
        cardPlaceholder: '4000 0000 0000 0000',
        validateBtn: 'Explore Benefits',
        validating: 'Validating...',
        testCards: 'Test Cards',

        // Benefits
        yourBenefits: 'Your Benefits',
        totalBenefits: 'Total Benefits',
        viewDetails: 'View Details',
        summarize: 'Summarize T&C',

        // Categories
        all: 'All',
        travel: 'Travel',
        dining: 'Dining',
        shopping: 'Shopping',
        entertainment: 'Entertainment',
        insurance: 'Insurance',
        lifestyle: 'Lifestyle',
        cashback: 'Cashback',

        // Offers
        nearbyOffers: 'Nearby Offers',
        distance: 'km away',
        validUntil: 'Valid until',

        // Recommendations
        recommendations: 'AI Recommendations',
        personalized: 'Personalized for you',

        // Modal
        termsAndConditions: 'Terms & Conditions',
        simplifiedSummary: 'Simplified Summary',
        close: 'Close',

        // Errors
        invalidCard: 'Please enter a valid Visa card number',
        serverError: 'Unable to connect to server',

        // Footer
        disclaimer: 'This is a demo application. No real card data is stored or processed.',
        poweredBy: 'Powered by Visa Developer APIs & Llama AI',
    },
    ta: {
        // Header
        appTitle: 'விசா பயன்கள் AI முகவர்',
        appSubtitle: 'AI நுண்ணறிவுகளுடன் உங்கள் அட்டை பயன்களைக் கண்டறியுங்கள்',

        // Card Input
        enterCard: 'உங்கள் அட்டை எண்ணை உள்ளிடவும்',
        cardPlaceholder: '4000 0000 0000 0000',
        validateBtn: 'பயன்களை ஆராயுங்கள்',
        validating: 'சரிபார்க்கிறது...',
        testCards: 'சோதனை அட்டைகள்',

        // Benefits
        yourBenefits: 'உங்கள் பயன்கள்',
        totalBenefits: 'மொத்த பயன்கள்',
        viewDetails: 'விவரங்களைக் காண்க',
        summarize: 'T&C சுருக்கம்',

        // Categories
        all: 'அனைத்தும்',
        travel: 'பயணம்',
        dining: 'உணவு',
        shopping: 'ஷாப்பிங்',
        entertainment: 'பொழுதுபோக்கு',
        insurance: 'காப்பீடு',
        lifestyle: 'வாழ்க்கை முறை',
        cashback: 'பணத்திரும்ப',

        // Offers
        nearbyOffers: 'அருகிலுள்ள சலுகைகள்',
        distance: 'கி.மீ தொலைவில்',
        validUntil: 'வரை செல்லுபடியாகும்',

        // Recommendations
        recommendations: 'AI பரிந்துரைகள்',
        personalized: 'உங்களுக்கென தனிப்பயனாக்கப்பட்டது',

        // Modal
        termsAndConditions: 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
        simplifiedSummary: 'எளிமைப்படுத்தப்பட்ட சுருக்கம்',
        close: 'மூடு',

        // Errors
        invalidCard: 'சரியான விசா அட்டை எண்ணை உள்ளிடவும்',
        serverError: 'சர்வருடன் இணைக்க முடியவில்லை',

        // Footer
        disclaimer: 'இது ஒரு டெமோ பயன்பாடு. உண்மையான அட்டை தரவு சேமிக்கப்படவோ செயலாக்கப்படவோ இல்லை.',
        poweredBy: 'விசா டெவலப்பர் APIs & Llama AI மூலம் இயக்கப்படுகிறது',
    },
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const t = (key) => {
        return translations[language][key] || key;
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'ta' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
